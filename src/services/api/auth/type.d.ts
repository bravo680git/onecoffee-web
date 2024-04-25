export type LoginPayload = {
  email: string;
  password: string;
};

type RegisterPayload = LoginPayload & {
  name: string;
};

type LoginData = {
  accessToken: string;
  refreshToken: string;
  user: {
    id: number;
    name: string;
    email: string;
  };
};

type RegisterData = LoginData;

type VerifyEmailPayload = {
  token: string;
};
type VerifyData = LoginData;

type ChangePasswordPayload = {
  password: string;
  newPassword: string;
  confirmNewPassword: string;
};
