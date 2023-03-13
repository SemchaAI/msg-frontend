import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import cn from "classnames";
import styles from "./form.module.css";
import { Link, useNavigate } from "react-router-dom";
import { userApi } from "../../services/userServices";
import { useDispatch, useSelector } from "react-redux";
import { selectUser, setAll } from "../../redux/user";
import { authControl } from "../../../features/authControl/authControl";

export const FormRegister = () => {
  const navigate = useNavigate();
  //redirect to home if user is already logget
  useEffect(() => {
    authControl() && navigate("/home");
  }, []);
  const form = useForm({
    mode: "onChange", //mode: onChange | onBlur | onSubmit | onTouched | all
  });
  const {
    getValues,
    handleSubmit,
    register,
    formState: { errors },
  } = form;

  const [createUser, { error }] = userApi.useRegisterUserMutation();

  const [name, setName] = useState(getValues("nickname"));
  const [password, setPassword] = useState(getValues("password"));
  const [email, setEmail] = useState(getValues("email"));

  const onSubmit = async (data) => {
    // console.log(data);
    try {
      await createUser(data);
      navigate("/login");
    } catch (error) {
      //  console.log(error);
    }
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
      <div className={styles.formControl}>
        <div className={styles.labelContainer}>
          <label className={styles.label} htmlFor="nickname">
            Name
          </label>
          {errors.nickname && (
            <p
              className={cn({
                [styles.label]: true,
                [styles.succes]: errors.nickname === undefined,
                [styles.error]: errors.nickname !== undefined,
              })}
            >
              This field is required.
            </p>
          )}
        </div>
        <input
          className={cn(styles.formInput, {
            [styles.succes]: errors.nickname === undefined,
            [styles.error]: errors.nickname !== undefined,
          })}
          type="text"
          placeholder="Semcha"
          name="nickname"
          {...register("nickname", {
            required: true,
            maxLength: 15,
          })}
          onBlur={(e) => setName(e.target.value)}
        />
      </div>
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
          <label className={styles.label} htmlFor="password">
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
      <div className={styles.formControl}>
        <div className={styles.labelContainer}>
          <label className={styles.label} htmlFor="gender">
            Gender
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
        <div className={styles.inputContainer}>
          <label className={styles.label} htmlFor="male">
            <input
              type="radio"
              id="male"
              value="male"
              {...register("gender")}
              className={styles.gender}
            />
            Male
          </label>
          <label className={styles.label} htmlFor="female">
            <input
              type="radio"
              id="female"
              value="female"
              {...register("gender")}
              className={styles.gender}
            />
            Female
          </label>
          <label className={styles.label} htmlFor="stone">
            <input
              type="radio"
              id="stone"
              value="stone"
              {...register("gender")}
              className={styles.gender}
            />
            Stone
          </label>
        </div>
      </div>

      <button type="submit" className={styles.submit}>
        Register
      </button>
      <div className={styles.loginLink}>
        <p>Already have an account?</p>
        <Link className={styles.loginLinkButton} to="login">
          Login
        </Link>
      </div>
    </form>
  );
};
