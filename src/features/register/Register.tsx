import s from "./Register.module.css";
import { FormEvent, useState } from "react";
import { useAppDispatch, useAppSelector, useOnUnmount } from "../../app/hooks";
import { clearErrors, register, selectUser } from "../../common/slices/userSlice";
import FormErrorCard from "../../common/sharedComponents/FormErrorCard/FormErrorCard";

const Register = () => {
  const dispatch = useAppDispatch();
  const { isError, errorMessages } = useAppSelector(selectUser);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  useOnUnmount(() => dispatch(clearErrors()));

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    dispatch(register({username, password} as User, confirmPassword));
  };

  const handleUsernameChange = (e: FormEvent<HTMLInputElement>) => {
    setUsername(e.currentTarget.value);
  };

  const handlePasswordChange = (e: FormEvent<HTMLInputElement>) => {
    setPassword(e.currentTarget.value);
  };

  const handleConfirmPasswordChange = (e: FormEvent<HTMLInputElement>) => {
    setConfirmPassword(e.currentTarget.value);
  };

  return (
    <div className={s["register-container"]}>
      <form onSubmit={handleSubmit}>
        <h2 className="heading-3">Sign up for an account</h2>
        <p>
          Signing up for an account is free and easy. Fill out the form below
          to get started.
        </p>
        {isError && <FormErrorCard errorMessages={errorMessages} />}
        <input
          type="text"
          name="username"
          value={username}
          placeholder="Username"
          onChange={handleUsernameChange}
        />
        <input
          type="password"
          name="password"
          value={password}
          placeholder="Password"
          onChange={handlePasswordChange}
        />
        <input
          type="password"
          name="confirmPassword"
          value={confirmPassword}
          placeholder="Confirm password"
          onChange={handleConfirmPasswordChange}
        />
        <input type="submit" value="Register" />
      </form>
    </div>
  );
};
export default Register;
