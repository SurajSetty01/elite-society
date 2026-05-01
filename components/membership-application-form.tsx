"use client";

import { db, storage } from "@/app/lib/firebase";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import Link from "next/link";
import { useMemo, useRef, useState } from "react";

type FormValues = Record<string, string>;

type ApplicationQuestion = {
  id: string;
  section: string;
  prompt: string;
  hint?: string;
  required?: boolean;
  kind: "text" | "email" | "tel" | "textarea" | "choice" | "checkbox" | "image";
  placeholder?: string;
  options?: readonly string[];
  autoComplete?: string;
  checkboxLabel?: string;
};

const questions: ApplicationQuestion[] = [
  {
    id: "fullName",
    section: "Basic Information",
    prompt: "What name should the room know?",
    hint: "First and last name.",
    required: true,
    kind: "text",
    placeholder: "Your full name",
    autoComplete: "name",
  },
  {
    id: "email",
    section: "Basic Information",
    prompt: "Where can we reach you privately?",
    hint: "Use the email you check most often.",
    required: true,
    kind: "email",
    placeholder: "name@example.com",
    autoComplete: "email",
  },
  {
    id: "phone",
    section: "Basic Information",
    prompt: "Your phone number.",
    hint: "For discreet follow-up if your application progresses.",
    required: true,
    kind: "tel",
    placeholder: "+1 000 000 0000",
    autoComplete: "tel",
  },
  {
    id: "location",
    section: "Basic Information",
    prompt: "Which city and country do you move from?",
    required: true,
    kind: "text",
    placeholder: "Paris, France",
    autoComplete: "address-level2",
  },
  {
    id: "occupation",
    section: "Basic Information",
    prompt: "What is your primary field?",
    hint: "Founder, investor, artist, executive, creator, or something harder to label.",
    required: true,
    kind: "text",
    placeholder: "Your occupation or field",
    autoComplete: "organization-title",
  },
  {
    id: "instagram",
    section: "Social & Professional Presence",
    prompt: "Instagram, if it speaks for you.",
    hint: "Optional, but useful for understanding your public signal.",
    kind: "text",
    placeholder: "https://instagram.com/...",
  },
  {
    id: "linkedin",
    section: "Social & Professional Presence",
    prompt: "LinkedIn or professional profile.",
    hint: "Optional.",
    kind: "text",
    placeholder: "https://linkedin.com/in/...",
  },
  {
    id: "otherPlatforms",
    section: "Social & Professional Presence",
    prompt: "Any other platform worth seeing?",
    hint: "YouTube, X, Substack, press, or another social home.",
    kind: "text",
    placeholder: "Paste one or more links",
  },
  {
    id: "website",
    section: "Social & Professional Presence",
    prompt: "Personal website or portfolio.",
    hint: "Optional.",
    kind: "text",
    placeholder: "https://...",
  },
  {
    id: "description",
    section: "Profile & Background",
    prompt: "In a few lines, what do you do?",
    hint: "Give us the shape of your work, influence, and current momentum.",
    required: true,
    kind: "textarea",
    placeholder: "I build, lead, invest in, create...",
  },
  {
    id: "incomeRange",
    section: "Profile & Background",
    prompt: "Approximate annual income range.",
    hint: "Ranges only. Exact numbers are not needed.",
    required: true,
    kind: "choice",
    options: ["<$50k", "$50k-$150k", "$150k-$500k", "$500k+"],
  },
  {
    id: "lifestyle",
    section: "Profile & Background",
    prompt: "How would you describe your current lifestyle?",
    hint: "Short, honest, and specific is enough.",
    required: true,
    kind: "text",
    placeholder: "Quietly ambitious, highly social, travel-led...",
  },
  {
    id: "whyJoin",
    section: "Intent & Fit",
    prompt: "Why do you want to join Lite Society?",
    hint: "This is the part we read most closely.",
    required: true,
    kind: "textarea",
    placeholder: "I am looking for...",
  },
  {
    id: "circle",
    section: "Intent & Fit",
    prompt: "What kind of people do you usually keep close?",
    required: true,
    kind: "textarea",
    placeholder: "The people around me tend to be...",
  },
  {
    id: "value",
    section: "Intent & Fit",
    prompt: "What value would you bring to a private network like this?",
    required: true,
    kind: "textarea",
    placeholder: "Access, perspective, taste, capital, audience, hospitality...",
  },
  {
    id: "curatedAccess",
    section: "Intent & Fit",
    prompt: 'What does "curated access" mean to you?',
    hint: "Optional, but revealing.",
    kind: "textarea",
    placeholder: "To me, curated access means...",
  },
  {
    id: "referral",
    section: "Final",
    prompt: "How did you hear about us?",
    kind: "text",
    placeholder: "A friend, event, Instagram, private mention...",
  },
  {
    id: "imageUrl",
    section: "Final",
    prompt: "Add a profile image, if it helps us place you.",
    hint: "Optional. JPG, PNG, or WebP under 5MB.",
    kind: "image",
  },
  {
    id: "experiences",
    section: "Final",
    prompt: "Would you be open to private events, travel, and curated experiences?",
    required: true,
    kind: "choice",
    options: ["Yes", "No"],
  },
  {
    id: "agreement",
    section: "Final",
    prompt: "One final understanding.",
    required: true,
    kind: "checkbox",
    checkboxLabel: "I understand that membership is selective and not guaranteed.",
  },
];

const initialValues = questions.reduce<FormValues>((values, question) => {
  values[question.id] = "";
  return values;
}, {});

const sections = Array.from(new Set(questions.map((question) => question.section)));
const maxImageUploadSize = 5 * 1024 * 1024;

type MembershipApplicationFormProps = {
  brandSerifClassName: string;
};

export function MembershipApplicationForm({
  brandSerifClassName,
}: MembershipApplicationFormProps) {
  const [hasStarted, setHasStarted] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [values, setValues] = useState<FormValues>(() => initialValues);
  const [error, setError] = useState("");
  const [direction, setDirection] = useState<"forward" | "back">("forward");
  const [isComplete, setIsComplete] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isUploadingImage, setIsUploadingImage] = useState(false);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imageUploadNotice, setImageUploadNotice] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const isSubmittingRef = useRef(false);

  const currentQuestion = questions[currentIndex];
  const isLastQuestion = currentIndex === questions.length - 1;
  const sectionIndex = sections.indexOf(currentQuestion.section) + 1;

  const answeredRequiredCount = useMemo(
    () =>
      questions.filter((question) => {
        if (!question.required) {
          return false;
        }

        return values[question.id]?.trim().length > 0;
      }).length,
    [values],
  );

  const progress = isComplete
    ? 100
    : hasStarted
      ? Math.round(((currentIndex + 1) / questions.length) * 100)
      : 0;

  function updateValue(id: string, value: string) {
    setValues((currentValues) => ({
      ...currentValues,
      [id]: value,
    }));

    if (error) {
      setError("");
    }
  }

  function updateImageFile(file: File | null) {
    setImageUploadNotice("");

    if (!file) {
      setImageFile(null);
      return;
    }

    if (!file.type.startsWith("image/")) {
      setImageFile(null);
      setImageUploadNotice("Please select an image file.");
      return;
    }

    if (file.size > maxImageUploadSize) {
      setImageFile(null);
      setImageUploadNotice("Please choose an image under 5MB.");
      return;
    }

    setImageFile(file);
  }

  async function uploadApplicationImage() {
    if (!imageFile) {
      return "";
    }

    setIsUploadingImage(true);
    setImageUploadNotice("");

    try {
      const safeFileName = imageFile.name
        .toLowerCase()
        .replace(/[^a-z0-9.-]/g, "-");
      const imageId =
        typeof crypto !== "undefined" && "randomUUID" in crypto
          ? crypto.randomUUID()
          : `${Date.now()}-${Math.random().toString(36).slice(2)}`;
      const imageRef = ref(
        storage,
        `applications/${Date.now()}-${imageId}-${safeFileName}`,
      );
      const snapshot = await uploadBytes(imageRef, imageFile, {
        contentType: imageFile.type,
      });

      return getDownloadURL(snapshot.ref);
    } catch (uploadError) {
      console.error("Error uploading application image:", uploadError);
      setImageUploadNotice(
        "We couldn't attach your image, but your application will still be submitted.",
      );
      return "";
    } finally {
      setIsUploadingImage(false);
    }
  }

  function validateQuestion(question: ApplicationQuestion) {
    const value = values[question.id]?.trim() ?? "";

    if (question.required && !value) {
      if (question.kind === "checkbox") {
        return "Please confirm this understanding before submitting.";
      }

      return "This detail is required.";
    }

    if (question.id === "email" && value) {
      const isValidEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);

      if (!isValidEmail) {
        return "Use a valid email address.";
      }
    }

    if (question.id === "phone" && value) {
      const digits = value.replace(/\D/g, "");

      if (digits.length < 7) {
        return "Use a reachable phone number.";
      }
    }

    return "";
  }

  async function submitApplication() {
    if (isSubmittingRef.current) {
      return;
    }

    isSubmittingRef.current = true;
    setIsSubmitting(true);
    setError("");
    setSuccessMessage("");

    try {
      const imageUrl = await uploadApplicationImage();

      await addDoc(collection(db, "applications"), {
        ...values,
        ...(imageUrl ? { imageUrl } : {}),
        submittedAt: serverTimestamp(),
      });

      setSuccessMessage(
        "Your application has been received. If selected, a member of our team will reach out to you shortly with further details regarding membership and access.",
      );
      setIsComplete(true);
    } catch (submissionError) {
      console.error("Error submitting application:", submissionError);
      setError("We couldn't submit your application. Please try again.");
    } finally {
      isSubmittingRef.current = false;
      setIsSubmitting(false);
    }
  }

  async function goToNextQuestion() {
    if (isSubmittingRef.current) {
      return;
    }

    const validationMessage = validateQuestion(currentQuestion);

    if (validationMessage) {
      setError(validationMessage);
      return;
    }

    setDirection("forward");
    setError("");

    if (currentQuestion.kind === "image" && !imageFile) {
      setImageUploadNotice("");
    }

    if (isLastQuestion) {
      await submitApplication();
      return;
    }

    setCurrentIndex((index) => index + 1);
  }

  function goBack() {
    if (isSubmittingRef.current) {
      return;
    }

    setDirection("back");
    setError("");

    if (isComplete) {
      setIsComplete(false);
      setSuccessMessage("");
      return;
    }

    if (currentIndex === 0) {
      setHasStarted(false);
      return;
    }

    setCurrentIndex((index) => index - 1);
  }

  function restartApplication() {
    setValues(initialValues);
    setCurrentIndex(0);
    setDirection("forward");
    setError("");
    setImageFile(null);
    setIsComplete(false);
    setImageUploadNotice("");
    setSuccessMessage("");
    setHasStarted(false);
  }

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    void goToNextQuestion();
  }

  function handleInputKeyDown(event: React.KeyboardEvent<HTMLInputElement>) {
    if (event.key !== "Enter") {
      return;
    }

    event.preventDefault();
    void goToNextQuestion();
  }

  return (
    <div className="relative w-full">
      <div
        aria-hidden="true"
        className="absolute inset-x-0 top-0 h-px overflow-hidden bg-[#fffff0]/10"
      >
        <div
          className="h-full bg-[#d9c08c] transition-all duration-700 ease-out"
          style={{ width: `${progress}%` }}
        />
      </div>

      {!hasStarted ? (
        <section className="application-step mx-auto flex min-h-[100svh] max-w-3xl flex-col items-center justify-center py-16 text-center">
          <p className="text-[0.58rem] uppercase tracking-[0.42em] text-[#d9c08c]/70 sm:text-[0.66rem]">
            Private membership application
          </p>

          <h1
            className={`${brandSerifClassName} mt-6 text-4xl leading-[0.94] text-[#fffff0] sm:text-6xl lg:text-[4.9rem]`}
          >
            Enter quietly. Answer with signal.
          </h1>

          <p className="mt-7 max-w-2xl text-sm leading-7 text-[#fffff0]/56 sm:text-base sm:leading-8">
            A selective application for people with presence, intent, and a
            reason to belong in a room that stays intentionally small.
          </p>

          <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row">
            <button
              type="button"
              onClick={() => {
                setDirection("forward");
                setHasStarted(true);
              }}
              className="inline-flex items-center rounded-full border border-[#fffff0] bg-[#fffff0] px-7 py-3 text-[0.65rem] font-medium uppercase tracking-[0.32em] text-[#0c090a] transition-all duration-300 hover:bg-transparent hover:text-[#fffff0]"
            >
              Begin Application
            </button>

            <Link
              href="/"
              className="inline-flex items-center rounded-full border border-[#fffff0]/14 bg-[#fffff0]/[0.03] px-7 py-3 text-[0.65rem] font-medium uppercase tracking-[0.32em] text-[#fffff0]/64 transition-all duration-300 hover:border-[#fffff0] hover:text-[#fffff0]"
            >
              Return Home
            </Link>
          </div>
        </section>
      ) : isComplete ? (
        <section className="application-step mx-auto flex min-h-[100svh] max-w-3xl flex-col items-center justify-center py-16 text-center">
          <p className="text-[0.58rem] uppercase tracking-[0.42em] text-[#d9c08c]/70 sm:text-[0.66rem]">
            Application received
          </p>

          <h2
            className={`${brandSerifClassName} mt-6 text-4xl leading-[0.94] text-[#fffff0] sm:text-6xl lg:text-[4.7rem]`}
          >
            Your request is now under review.
          </h2>

          <p
            aria-live="polite"
            className="mt-7 max-w-2xl text-sm leading-7 text-[#fffff0]/56 sm:text-base sm:leading-8"
          >
            {successMessage}
          </p>

          <p className="mt-4 max-w-xl text-xs leading-6 text-[#fffff0]/38 sm:text-sm">
            Applications are reviewed manually, and acceptance is not
            guaranteed.
          </p>

          {imageUploadNotice ? (
            <p
              aria-live="polite"
              className="mt-4 max-w-xl text-xs leading-6 text-[#d9c08c]/72 sm:text-sm"
            >
              {imageUploadNotice}
            </p>
          ) : null}

          <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row">
            <button
              type="button"
              onClick={goBack}
              className="inline-flex items-center rounded-full border border-[#fffff0] bg-[#fffff0] px-7 py-3 text-[0.65rem] font-medium uppercase tracking-[0.32em] text-[#0c090a] transition-all duration-300 hover:bg-transparent hover:text-[#fffff0]"
            >
              Review Answers
            </button>

            <button
              type="button"
              onClick={restartApplication}
              className="inline-flex items-center rounded-full border border-[#fffff0]/14 bg-[#fffff0]/[0.03] px-7 py-3 text-[0.65rem] font-medium uppercase tracking-[0.32em] text-[#fffff0]/64 transition-all duration-300 hover:border-[#fffff0] hover:text-[#fffff0]"
            >
              Start Again
            </button>
          </div>
        </section>
      ) : (
        <form
          onSubmit={handleSubmit}
          className="mx-auto grid min-h-[100svh] w-full max-w-6xl items-center py-12 sm:py-16"
        >
          <div className="grid gap-10 lg:grid-cols-[12rem_minmax(0,1fr)] lg:gap-16">
            <aside className="hidden border-r border-[#fffff0]/10 pr-8 lg:block">
              <p className="text-[0.56rem] uppercase tracking-[0.34em] text-[#fffff0]/34">
                Section {sectionIndex} of {sections.length}
              </p>

              <div className="mt-8 space-y-4">
                {sections.map((section, index) => (
                  <div key={section} className="flex items-center gap-3">
                    <span
                      className={[
                        "h-px w-7 transition-colors duration-300",
                        section === currentQuestion.section
                          ? "bg-[#d9c08c]"
                          : "bg-[#fffff0]/12",
                      ].join(" ")}
                    />
                    <span
                      className={[
                        "text-[0.56rem] uppercase tracking-[0.28em] transition-colors duration-300",
                        section === currentQuestion.section
                          ? "text-[#fffff0]/76"
                          : "text-[#fffff0]/28",
                      ].join(" ")}
                    >
                      0{index + 1}
                    </span>
                  </div>
                ))}
              </div>

              <p className="mt-10 text-xs leading-6 text-[#fffff0]/36">
                {answeredRequiredCount} required signals captured.
              </p>
            </aside>

            <section className="w-full">
              <div
                key={currentQuestion.id}
                className={[
                  "max-w-4xl",
                  direction === "back"
                    ? "application-step-back"
                    : "application-step",
                ].join(" ")}
              >
                <div className="flex items-center gap-4">
                  <span className="grid h-6 w-6 place-items-center rounded-[0.45rem] bg-[#fffff0] text-[0.62rem] font-semibold text-[#0c090a]">
                    {currentIndex + 1}
                  </span>
                  <p className="text-[0.58rem] uppercase tracking-[0.36em] text-[#d9c08c]/64">
                    {currentQuestion.section}
                  </p>
                </div>

                <h2
                  className={`${brandSerifClassName} mt-6 max-w-4xl text-4xl leading-[1.02] text-[#fffff0] sm:text-5xl lg:text-[4.4rem]`}
                >
                  {currentQuestion.prompt}
                  {currentQuestion.required ? (
                    <span className="text-[#d9c08c]"> *</span>
                  ) : null}
                </h2>

                {currentQuestion.hint ? (
                  <p className="mt-5 max-w-2xl text-sm leading-7 text-[#fffff0]/46 sm:text-base">
                    {currentQuestion.hint}
                  </p>
                ) : null}

                <div className="mt-8">
                  <QuestionControl
                    question={currentQuestion}
                    value={values[currentQuestion.id] ?? ""}
                    onChange={(value) => updateValue(currentQuestion.id, value)}
                    onImageChange={updateImageFile}
                    onInputKeyDown={handleInputKeyDown}
                    selectedImageName={imageFile?.name ?? ""}
                  />
                </div>

                <p
                  aria-live="polite"
                  className="mt-5 min-h-6 text-sm text-[#d9c08c]"
                >
                  {error || imageUploadNotice}
                </p>

                <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:items-center">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="inline-flex w-fit items-center rounded-full border border-[#fffff0] bg-[#fffff0] px-7 py-3 text-[0.65rem] font-medium uppercase tracking-[0.32em] text-[#0c090a] transition-all duration-300 hover:bg-transparent hover:text-[#fffff0] disabled:cursor-wait disabled:opacity-60 disabled:hover:bg-[#fffff0] disabled:hover:text-[#0c090a]"
                  >
                    {isUploadingImage
                      ? "Uploading image..."
                      : isSubmitting
                        ? "Submitting..."
                        : isLastQuestion
                          ? "Complete"
                          : "Continue"}
                  </button>

                  <button
                    type="button"
                    onClick={goBack}
                    disabled={isSubmitting}
                    className="inline-flex w-fit items-center rounded-full border border-[#fffff0]/14 bg-[#fffff0]/[0.03] px-7 py-3 text-[0.65rem] font-medium uppercase tracking-[0.32em] text-[#fffff0]/64 transition-all duration-300 hover:border-[#fffff0] hover:text-[#fffff0] disabled:cursor-wait disabled:opacity-50"
                  >
                    Back
                  </button>

                  {!currentQuestion.required ? (
                    <button
                      type="button"
                      onClick={() => void goToNextQuestion()}
                      disabled={isSubmitting}
                      className="inline-flex w-fit items-center px-2 py-3 text-[0.62rem] font-medium uppercase tracking-[0.32em] text-[#fffff0]/38 transition-colors duration-300 hover:text-[#fffff0] disabled:cursor-wait disabled:opacity-50"
                    >
                      Skip
                    </button>
                  ) : null}
                </div>
              </div>
            </section>
          </div>
        </form>
      )}
    </div>
  );
}

type QuestionControlProps = {
  question: ApplicationQuestion;
  value: string;
  onChange: (value: string) => void;
  onImageChange: (file: File | null) => void;
  onInputKeyDown: (event: React.KeyboardEvent<HTMLInputElement>) => void;
  selectedImageName: string;
};

function QuestionControl({
  question,
  value,
  onChange,
  onImageChange,
  onInputKeyDown,
  selectedImageName,
}: QuestionControlProps) {
  if (question.kind === "textarea") {
    return (
      <textarea
        id={question.id}
        name={question.id}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder={question.placeholder}
        rows={5}
        className="min-h-[12rem] w-full resize-none border-b border-[#fffff0]/22 bg-transparent py-4 text-2xl leading-relaxed text-[#fffff0] outline-none transition-colors duration-300 placeholder:text-[#fffff0]/18 focus:border-[#d9c08c]/80 sm:text-3xl"
        autoFocus
      />
    );
  }

  if (question.kind === "choice") {
    return (
      <div className="grid gap-3 sm:grid-cols-2">
        {question.options?.map((option, index) => {
          const isSelected = value === option;

          return (
            <button
              key={option}
              type="button"
              aria-pressed={isSelected}
              onClick={() => onChange(option)}
              className={[
                "group flex min-h-16 items-center justify-between gap-4 rounded-[0.85rem] border px-4 py-4 text-left transition-all duration-300 sm:px-5",
                isSelected
                  ? "border-[#d9c08c] bg-[#d9c08c]/12 text-[#fffff0]"
                  : "border-[#fffff0]/12 bg-[#fffff0]/[0.03] text-[#fffff0]/62 hover:border-[#fffff0]/42 hover:text-[#fffff0]",
              ].join(" ")}
            >
              <span className="flex items-center gap-3">
                <span
                  className={[
                    "grid h-7 w-7 shrink-0 place-items-center rounded-full border text-[0.62rem] transition-colors duration-300",
                    isSelected
                      ? "border-[#d9c08c] bg-[#d9c08c] text-[#0c090a]"
                      : "border-[#fffff0]/18 text-[#fffff0]/42 group-hover:border-[#fffff0]/42 group-hover:text-[#fffff0]",
                  ].join(" ")}
                >
                  {String.fromCharCode(65 + index)}
                </span>
                <span className="text-sm font-medium leading-6 sm:text-base">
                  {option}
                </span>
              </span>

              <span
                aria-hidden="true"
                className={[
                  "h-2 w-2 rounded-full transition-colors duration-300",
                  isSelected ? "bg-[#d9c08c]" : "bg-[#fffff0]/16",
                ].join(" ")}
              />
            </button>
          );
        })}
      </div>
    );
  }

  if (question.kind === "checkbox") {
    return (
      <label className="flex cursor-pointer items-start gap-4 border-y border-[#fffff0]/12 py-6">
        <input
          type="checkbox"
          checked={value === "accepted"}
          onChange={(event) => onChange(event.target.checked ? "accepted" : "")}
          className="mt-1 h-5 w-5 rounded border-[#fffff0]/30 bg-transparent accent-[#d9c08c]"
        />
        <span className="max-w-2xl text-lg leading-8 text-[#fffff0]/72 sm:text-xl">
          {question.checkboxLabel}
        </span>
      </label>
    );
  }

  if (question.kind === "image") {
    return (
      <div className="max-w-2xl border-y border-[#fffff0]/12 py-6">
        <input
          key={selectedImageName || "empty-image"}
          id={question.id}
          name={question.id}
          type="file"
          accept="image/*"
          onChange={(event) => onImageChange(event.target.files?.[0] ?? null)}
          className="sr-only"
        />

        <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
          <label
            htmlFor={question.id}
            className="inline-flex w-fit cursor-pointer items-center rounded-full border border-[#fffff0] bg-[#fffff0] px-7 py-3 text-[0.65rem] font-medium uppercase tracking-[0.32em] text-[#0c090a] transition-all duration-300 hover:bg-transparent hover:text-[#fffff0]"
          >
            Choose Image
          </label>

          {selectedImageName ? (
            <button
              type="button"
              onClick={() => onImageChange(null)}
              className="inline-flex w-fit items-center rounded-full border border-[#fffff0]/14 bg-[#fffff0]/[0.03] px-5 py-3 text-[0.6rem] font-medium uppercase tracking-[0.3em] text-[#fffff0]/62 transition-all duration-300 hover:border-[#fffff0] hover:text-[#fffff0]"
            >
              Remove
            </button>
          ) : null}
        </div>

        <p className="mt-4 min-h-6 break-all text-sm leading-6 text-[#fffff0]/58">
          {selectedImageName || "No image selected."}
        </p>
      </div>
    );
  }

  return (
    <input
      id={question.id}
      name={question.id}
      type={question.kind}
      value={value}
      onChange={(event) => onChange(event.target.value)}
      onKeyDown={onInputKeyDown}
      placeholder={question.placeholder}
      autoComplete={question.autoComplete}
      className="w-full border-b border-[#fffff0]/22 bg-transparent py-4 text-2xl text-[#fffff0] outline-none transition-colors duration-300 placeholder:text-[#fffff0]/18 focus:border-[#d9c08c]/80 sm:text-3xl"
      autoFocus
    />
  );
}
