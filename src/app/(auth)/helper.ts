import { LoginPayload, RegisterPayload } from "@/services/api";

type AuthPayload = Partial<LoginPayload & RegisterPayload>;

export const checkPasswordStrongLevel = (value?: string) => {
  if (!value) return 0;
  let level = 0;
  if (/[a-z]+[A-Z]|[A-Z]+[a-z]/.test(value)) {
    level++;
  }

  if (/[0-9]/.test(value) && value.length >= 8) {
    level++;
  }

  if (/\W/.test(value)) {
    level++;
  }

  return level;
};

export const validate = (
  data: AuthPayload,
  setErrors: (e: AuthPayload) => void,
  checkPasswordStrong?: boolean,
) => {
  const result: { valid: boolean; errors: AuthPayload } = {
    valid: true,
    errors: {},
  };

  if (Object.hasOwn(data, "email")) {
    if (!/^\w+@\w+\.\w+$/.test(data.email ?? "")) {
      result.errors.email = "Định dạng email không đúng";
      result.valid = false;
    }

    if (!data.email) {
      result.errors.email = "Vui lòng nhập email";
      result.valid = false;
    }
  }

  if (Object.hasOwn(data, "name")) {
    if (!data.name) {
      result.errors.name = "Vui lòng nhập họ và tên";
      result.valid = false;
    }
  }

  if (Object.hasOwn(data, "password")) {
    if (checkPasswordStrong && checkPasswordStrongLevel(data.password) < 3) {
      result.errors.password = "Mật khẩu yếu";
      result.valid = false;
    }

    if (!data.password) {
      result.errors.password = "Vui lòng nhập mật khẩu";
      result.valid = false;
    }
  }

  setErrors(result.errors);
  return result.valid;
};
