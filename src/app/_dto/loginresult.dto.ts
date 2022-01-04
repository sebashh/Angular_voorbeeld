import {User} from "@app/_models/user";

export interface LoginResult {
  user: User;
  accessToken: string;
}
