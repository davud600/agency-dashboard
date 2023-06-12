export interface AdminSession {
  token: string;
  expires?: Date;
}

export type LoginResStatus = "success" | "incorrect credentials";
