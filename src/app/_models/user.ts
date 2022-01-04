import {Role} from "@app/_models/role";

export class User {
  id: string | undefined;
  email: string | undefined;
  role: Role | undefined;
}
