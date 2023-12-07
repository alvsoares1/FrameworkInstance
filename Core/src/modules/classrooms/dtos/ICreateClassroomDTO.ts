import { User } from "../../accounts/entities/User";

interface ICreateClassroomDTO {
  id?: string;
  name: string;
  description: string;
  professor_id: string;
  members?: User[];
}

export { ICreateClassroomDTO };