export interface User {
  id?: string;
  username: string;
  name: string;
  role: "admin" | "user";
  avatar?: string;
}
