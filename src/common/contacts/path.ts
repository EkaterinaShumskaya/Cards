export const PATH = {
  MAIN: "/",
  AUTH: "/auth/",
  LOGIN: "/auth/login",
  REGISTRATION: "/auth/registration",
  CHECK_EMAIL: "/auth/check-email",
  NEW_PASSWORD: "/auth/set-new-password/:token",
  PASSWORD_RECOVERY: "/auth/password-recovery",
  PROFILE: "/profile",
  PACKS: "/packs",
  CARDS: "/cards",
  LEARN: "/learn",
  ERROR404: "/*"
} as const;