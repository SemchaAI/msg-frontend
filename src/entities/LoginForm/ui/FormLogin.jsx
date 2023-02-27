import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import cn from "classnames";
import styles from "./form.module.css";
import { Link, redirect, useNavigate } from "react-router-dom";
import { userApi } from "../../services/userServices";
import { useDispatch, useSelector } from "react-redux";
import { selectUser, setAll } from "../../redux/user";
import { authControl } from "../../../features/authControl/authControl";

export const FormLogin = () => {
  const navigate = useNavigate();
  //redirect to home if user is already logget
  useEffect(() => {
    authControl() && navigate("/home");
  }, []);

  const form = useForm({
    defaultValues: {
      email: "test@gmail.com",
      password: "12345678",
    },
    mode: "onChange", //mode: onChange | onBlur | onSubmit | onTouched | all
  });

  const {
    getValues,
    handleSubmit,
    register,
    formState: { errors },
  } = form;

  const dispatch = useDispatch();

  const [password, setPassword] = useState(getValues("password"));
  const [email, setEmail] = useState(getValues("email"));

  const [loginUser, { error }] = userApi.useLoginUserMutation();

  const onSubmit = async (data) => {
    const UserData = await loginUser(data);
    const UserToken = dispatch(setAll(UserData.data));
    // console.log(UserToken.payload.token);
    if (UserToken.payload.token !== "") {
      localStorage.setItem("token", UserToken.payload.token);
      navigate("/home");
    }
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
      <div className={styles.formControl}>
        <div className={styles.labelContainer}>
          <label className={styles.label} htmlFor="email">
            Email Adress
          </label>
          {errors.email && (
            <p
              className={cn({
                [styles.label]: true,
                [styles.succes]: errors.email === undefined,
                [styles.error]: errors.email !== undefined,
              })}
            >
              This field is required.
            </p>
          )}
        </div>
        <input
          className={cn(styles.formInput, {
            [styles.succes]: errors.email === undefined,
            [styles.error]: errors.email !== undefined,
          })}
          type="email"
          placeholder="example@gmail.com"
          name="email"
          {...register("email", {
            required: true,
            pattern: /.+@.+\..+/i,
          })}
          onBlur={(e) => setEmail(e.target.value)}
        />
      </div>
      <div className={styles.formControl}>
        <div className={styles.labelContainer}>
          <label className={styles.label} htmlFor="email">
            Password
          </label>
          {errors.password && (
            <p
              className={cn({
                [styles.label]: true,
                [styles.succes]: errors.password === undefined,
                [styles.error]: errors.password !== undefined,
              })}
            >
              This field is required.
            </p>
          )}
        </div>
        <input
          className={cn(styles.formInput, {
            [styles.succes]: errors.password === undefined,
            [styles.error]: errors.password !== undefined,
          })}
          type="password"
          placeholder="min 8 symbols"
          name="password"
          {...register("password", {
            required: true,
            minLength: 8,
          })}
          onBlur={(e) => setPassword(e.target.value)}
        />
      </div>
      <button type="submit" className={styles.submit}>
        Login
      </button>
      <div className={styles.loginLink}>
        <p>Don't have an account yet?</p>
        <Link className={styles.loginLinkButton} to="/">
          Register
        </Link>
      </div>
    </form>
  );
};
