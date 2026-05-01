"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

type MemberAccessFormProps = {
  nextPath: string;
};

export function MemberAccessForm({ nextPath }: MemberAccessFormProps) {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setIsSubmitting(true);

    try {
      const response = await fetch("/api/member-login", {
        body: JSON.stringify({ password, username }),
        headers: {
          "Content-Type": "application/json",
        },
        method: "POST",
      });

      if (!response.ok) {
        const result = (await response.json().catch(() => null)) as {
          message?: string;
        } | null;

        setError(result?.message ?? "Access could not be verified.");
        return;
      }

      router.replace(nextPath);
      router.refresh();
    } catch (loginError) {
      console.error("Error verifying member access:", loginError);
      setError("Access could not be verified. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="mt-8 space-y-5">
      <div>
        <label
          htmlFor="member-username"
          className="text-[0.58rem] uppercase tracking-[0.34em] text-[#fffff0]/40"
        >
          Username
        </label>
        <input
          id="member-username"
          type="text"
          value={username}
          onChange={(event) => setUsername(event.target.value)}
          autoComplete="username"
          className="mt-3 w-full border-b border-[#fffff0]/22 bg-transparent py-3 text-xl text-[#fffff0] outline-none transition-colors duration-300 placeholder:text-[#fffff0]/18 focus:border-[#d9c08c]/80"
          required
        />
      </div>

      <div>
        <label
          htmlFor="member-password"
          className="text-[0.58rem] uppercase tracking-[0.34em] text-[#fffff0]/40"
        >
          Password
        </label>
        <input
          id="member-password"
          type="password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          autoComplete="current-password"
          className="mt-3 w-full border-b border-[#fffff0]/22 bg-transparent py-3 text-xl text-[#fffff0] outline-none transition-colors duration-300 placeholder:text-[#fffff0]/18 focus:border-[#d9c08c]/80"
          required
        />
      </div>

      <p aria-live="polite" className="min-h-6 text-sm text-[#d9c08c]">
        {error}
      </p>

      <button
        type="submit"
        disabled={isSubmitting}
        className="inline-flex w-fit items-center rounded-full border border-[#fffff0] bg-[#fffff0] px-7 py-3 text-[0.65rem] font-medium uppercase tracking-[0.32em] text-[#0c090a] transition-all duration-300 hover:bg-transparent hover:text-[#fffff0] disabled:cursor-wait disabled:opacity-60 disabled:hover:bg-[#fffff0] disabled:hover:text-[#0c090a]"
      >
        {isSubmitting ? "Verifying..." : "Enter Members Area"}
      </button>
    </form>
  );
}
