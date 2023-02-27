import React, { useState } from "react";
import { useForm } from "react-hook-form";

import styles from "./sendMsgForm.module.css";
import cn from "classnames";
import { userApi } from "../../entities/services/userServices";

export const SendMsgForm = ({ avatarUrl, nickname }) => {
  const form = useForm({
    mode: "onChange", //mode: onChange | onBlur | onSubmit | onTouched | all
  });
  const {
    getValues,
    handleSubmit,
    register,
    formState: { errors },
  } = form;

  const [text, setText] = useState(getValues("text"));
  const [postMsg, { error }] = userApi.usePostMessageMutation();

  const onSubmit = async (data, event) => {
    event.preventDefault();
    console.log(data);
    console.log(avatarUrl, nickname);
    const correctData = {
      ...data,
      nickname,
      avatarUrl,
    };
    try {
      await postMsg(correctData);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
      <div className={styles.formControl}>
        <input
          className={cn(styles.formInput, {
            [styles.succes]: errors.text === undefined,
            [styles.error]: errors.text !== undefined,
          })}
          type="text"
          placeholder="...message"
          name="text"
          {...register("text", {
            required: true,
            minLength: 1,
          })}
          onBlur={(e) => setText(e.target.value)}
        />
      </div>
      <button type="submit" className={styles.submit}>
        Send
      </button>
    </form>
  );
};
