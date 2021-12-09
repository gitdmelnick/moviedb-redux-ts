
import { FormEvent, useEffect, useState } from "react";
import s from "./Login.module.css"
import { store } from "../../app/store";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { login, selectUser } from "../../common/slices/userSlice";
import FormErrorCard from "../../common/sharedComponents/FormErrorCard/FormErrorCard";

const Login = () => {
  const dispatch = useAppDispatch();
  const {currentUser, isError, errorMessages} = useAppSelector(selectUser);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    dispatch(login({ username, password} as User));
  };

  const handleUsernameChange = (e: FormEvent<HTMLInputElement>) => {
    setUsername(e.currentTarget.value);
  }

  const handlePasswordChange = (e: FormEvent<HTMLInputElement>) => {
    setPassword(e.currentTarget.value);
  }

  return (
    <div className={s["login-container"]}>
      <form onSubmit={handleSubmit}>
        <h2 className="heading-3">Login to your account</h2>
        <p>In order to use history and favorites features you will need to login to your account.</p>
        {isError && <FormErrorCard errorMessages={errorMessages}/>}
        <input type="text" name="username" value={username} placeholder="Username" onChange={handleUsernameChange}/>
        <input type="password" name="password" value={password} placeholder="Password" onChange={handlePasswordChange}/>
        <input type="submit" value="Login"/>
      </form>
    </div>
  );
};

export default Login;
