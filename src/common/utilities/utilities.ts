import { errorConstants } from "../../app/constants";

export const debounce = (callback: Function, delay = 350) => {
  let timer: ReturnType<typeof setTimeout>;

  return (...args: any[]) => {
    clearTimeout(timer);
    timer = setTimeout(() => callback(...args), delay);
  };
};

export const dateFromString = (timestamp: string) => {
  const releaseDate = new Date(timestamp);

  return releaseDate;
};

export const getItemFromLocalStorage = (key: string) => {
  const localItem = localStorage.getItem(key);
  return localItem ? JSON.parse(localItem) : null;
};

export const setItemToLocalStorage = (key: string, value: any) => {
  localStorage.setItem(key, JSON.stringify(value));
};

export const validateRegister = (
  username: string,
  password: string,
  confirmPassword: string
) => {
  const usernameLength = username.split(" ").join("").length;
  const passwordLength = password.split(" ").join("").length;

  const minUsernameLength = 4;
  const maxUsernameLength = 64;

  const minPasswordLength = 6;
  const maxPasswordLength = 64;

  let errors: string[] = [];

  if (usernameLength === 0)
    errors = [...errors, errorConstants.EMPTY_USERNAME_FIELD];

  if (usernameLength >= 1 && usernameLength < minUsernameLength)
    errors = [...errors, errorConstants.USERNAME_TOO_SHORT];

  if (usernameLength > maxUsernameLength)
    errors = [...errors, errorConstants.USERNAME_TOO_LONG];

  if (passwordLength === 0)
    errors = [...errors, errorConstants.EMPTY_PASSWORD_FIELD];

  if (passwordLength >= 1 && passwordLength < minPasswordLength)
    errors = [...errors, errorConstants.PASSWORD_TOO_SHORT];

  if (passwordLength > maxPasswordLength)
    errors = [...errors, errorConstants.PASSWORD_TOO_LONG];

  if (password !== confirmPassword)
    errors = [...errors, errorConstants.CONFIRM_NOT_MATCHED];

  return { errorStrings: errors, isValid: !errors.length };
};

export const validateLogin = (username: string, password: string) => {
  const usernameLength = username.split(" ").join("").length;
  const passwordLength = password.split(" ").join("").length;

  let errors: string[] = [];

  if (usernameLength === 0)
    errors = [...errors, errorConstants.EMPTY_USERNAME_FIELD];

  if (passwordLength === 0)
    errors = [...errors, errorConstants.EMPTY_PASSWORD_FIELD];

  return { errorStrings: errors, isValid: !errors.length };
};
