import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

import styles from "./sendMsgForm.module.css";
import cn from "classnames";
import { userApi } from "../../entities/services/userServices";

export const SendMsgForm = ({ avatarUrl, nickname, id, scroll }) => {
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
  const [createMsg, { error: createMsgErr }] =
    userApi.useCreateMessageMutation();
  let [scrollFlag, setScrollFlag] = useState(false);

  const onSubmit = async (data) => {
    //console.log(data);
    // console.log(avatarUrl, nickname);
    const correctData = {
      ...data,
      nickname,
      avatarUrl,
      id,
    };
    try {
      if (id) {
        await createMsg(correctData);
      } else {
        await postMsg(correctData);
      }
      setScrollFlag(!scrollFlag);
      console.log(scrollFlag);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    scroll();
  }, [scrollFlag]);

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
          autoComplete="off"
          name="text"
          {...register("text", {
            required: true,
            minLength: 1,
            maxLength: 150,
            pattern: /(?!.*(.)\1\1)^(?:[A-Za-z0-9]|[А-Яа-я0-9])/g,
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
