import { User } from "../../accounts/entities/User";

interface ICreateClassroomDTO {
  id?: string;
  name: string;
  description: string;
  members?: User[];
}

export { ICreateClassroomDTO };