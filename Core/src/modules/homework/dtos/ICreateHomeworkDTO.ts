import { User } from "../../accounts/entities/User";

interface ICreateHomeworkDTO {
  id?: string;
  creator_id: string;
  team_id?: string;
  name: string;
  details: string;
  feedback?: string;
}

export { ICreateHomeworkDTO };