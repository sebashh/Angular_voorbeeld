import {Group, GroupRole} from "@app/_models";

export interface GroupUserResult {
  id: string;
  group: Group;
  role: GroupRole;
}
