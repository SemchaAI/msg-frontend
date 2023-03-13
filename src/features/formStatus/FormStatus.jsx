import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

import styles from "./formStatus.module.css";
import cn from "classnames";
import { userApi } from "../../entities/services/userServices";

export const FormStatus = ({ status, func, flag }) => {
  const form = useForm({
    mode: "onSubmit", //mode: onChange | onBlur | onSubmit | onTouched | all
  });
  const {
    getValues,
    handleSubmit,
    register,
    formState: { errors },
  } = form;

  const [changeStatus, { error: errStatus }] =
    userApi.useChangeStatusUserMutation();

  const onSubmit = async (data) => {
    try {
      await changeStatus(data);
      func(!flag);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
      <div className={styles.formControl}>
        <input
          className={cn(styles.formInput)}
          type="text"
          defaultValue={status}
          autoComplete="off"
          name="status"
          {...register("status", {
            minLength: 1,
            maxLength: 150,
            pattern: /(?!.*(.)\1\1)^(?:[A-Za-z0-9]|[А-Яа-я0-9])/g,
          })}
        />
      </div>
      <button type="submit" className={styles.submit}>
        Change
      </button>
    </form>
  );
};
