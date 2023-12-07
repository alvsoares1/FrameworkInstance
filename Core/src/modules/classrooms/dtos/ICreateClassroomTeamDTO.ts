import { User } from "../../accounts/entities/User";

interface ICreateClassroomTeamDTO {
  id?: string;
  classroom_id: string;
  creator_id: string;
  name: string;
  members?: User[];
}

export { ICreateClassroomTeamDTO };