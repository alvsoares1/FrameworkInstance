interface ICreateUserDTO {
  id?: string;
  fullname: string;
  password: string;
  email: string;
  gender: string;
  role: number;
  registration: string;
}

export { ICreateUserDTO };