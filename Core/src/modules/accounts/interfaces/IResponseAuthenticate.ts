export interface IResponseAuthenticate {
  user: {
    fullname: string;
    email: string;
  };
  token: string;
  refresh_token: string;
}