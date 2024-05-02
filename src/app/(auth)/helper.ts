import {
  ChangePasswordPayload,
  LoginPayload,
  RegisterPayload,
} from "@/services/api";

type AuthPayload = Partial<
  LoginPayload & RegisterPayload & ChangePasswordPayload
>;

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
    if (!/^[\w\.]+@\w+\.\w+$/.test(data.email ?? "")) {
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

  if (Object.hasOwn(data, "newPassword")) {
    if (checkPasswordStrong && checkPasswordStrongLevel(data.newPassword) < 3) {
      result.errors.newPassword = "Mật khẩu yếu";
      result.valid = false;
    }

    if (!data.newPassword) {
      result.errors.newPassword = "Vui lòng nhập mật khẩu mới";
      result.valid = false;
    }
  }

  if (Object.hasOwn(data, "confirmNewPassword")) {
    if (
      checkPasswordStrong &&
      checkPasswordStrongLevel(data.confirmNewPassword) < 3
    ) {
      result.errors.confirmNewPassword = "Mật khẩu yếu";
      result.valid = false;
    }

    if (data.newPassword !== data.confirmNewPassword) {
      result.errors.confirmNewPassword = "Mật khẩu xác nhận không trùng khớp";
      result.valid = false;
    }

    if (!data.confirmNewPassword) {
      result.errors.confirmNewPassword = "Vui lòng nhập mật khẩu xác nhận";
      result.valid = false;
    }
  }

  setErrors(result.errors);
  return result.valid;
};
