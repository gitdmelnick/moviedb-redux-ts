export const apiConstants = {
  BASE_URL: "https://api.themoviedb.org/3/",
  API_KEY: "8f52ccf9f912af022f7ba1538c8115f4",
  POSTER_URL: "https://image.tmdb.org/t/p/w500",
  BACKDROP_URL: "https://image.tmdb.org/t/p/original",
  NO_POSTER_URL: "https://www.themoviedb.org/assets/2/v4/glyphicons/basic/glyphicons-basic-38-picture-grey-c2ebdbb057f2a7614185931650f8cee23fa137b93812ccb132b9df511df1cfac.svg",
} as const;

export const errorConstants = {
  USER_DOES_NOT_EXIST: "User does not exist.",
  INVALID_PASSWORD: "Invalid username or password.",
  USER_ALREADY_EXISTS: "A user with this name already exists. Use a different name.",
  PASSWORD_TOO_SHORT: "Password should be atleast 6 characters long.",
  PASSWORD_INVALID_CHARS: "Password shouldn't contain invalid characters.",
  EMPTY_INPUT: "Please fill in all fields.",
  EMPTY_USERNAME_FIELD: "Please fill in username.",
  EMPTY_PASSWORD_FIELD: "Please fill in password.",
  EMPTY_CONFIRM_PASSWORD: "Password confirm can't be blank",
  CONFIRM_NOT_MATCHED: "Password confirm  should match with password.",
  USERNAME_TOO_SHORT: "Username should be atleast 4 characters long.",
  USERNAME_TOO_LONG: "Username should be shorter than 64 symbols",
  PASSWORD_TOO_LONG: "Password should be shorter than 64 symbols",
} as const;
