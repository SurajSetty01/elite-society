export const memberSessionCookieName = "lite_member_session";

export function getMemberCredentials() {
  return {
    password: process.env.MEMBER_PASSWORD ?? "",
    username: process.env.MEMBER_USERNAME ?? "",
  };
}

export function getMemberSessionToken() {
  return process.env.MEMBER_SESSION_TOKEN ?? "";
}

export function isValidMemberSessionToken(token: string | undefined) {
  return token === getMemberSessionToken();
}
