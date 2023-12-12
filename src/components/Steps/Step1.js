import React from "react";
import { useForm } from "react-hook-form";
import styles from "./Form.module.scss";
import { useNavigate } from "react-router-dom";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import classNames from "classnames";
import { AppContext } from "../../DataContext";

const schema = yup.object().shape({
  firstName: yup
    .string()
    .matches(/^([^0-9а-яёА-ЯЁ]*)$/, "First Name should not contain numbers and russian letters")
    .required("Frist Name is a required field"),
  lastName: yup
    .string()
    .matches(/^([^0-9а-яёА-ЯЁ]*)([A-Za-z]*)$/, "Last Name should not contain numbers")
    .required("Last Name is a required field"),
  email: yup
    .string()
    .matches(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i, "Email is invalid")
    .email()
    .required("Email is a required field"),
  password: yup
    .string()
    .min(6, "Min size is 6 elements")
    .max(12, "Max size is 12 elements")
    .matches(/^(?=.*?[a-z])(?=.*?[A-Z])(?=.*?\d).*/, "Password should contain at least 1 upper letter, 1 lower letter and 1 number")
    .required("Password is a required field"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password"), null], "Passwords don't match")
    .required(),
});

export const Step1 = () => {
  const { data, setValues } = React.useContext(AppContext);
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({
    mode: "onChange",
    resolver: yupResolver(schema),
    defaultValues: {
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      password: data.password,
      confirmPassword: data.confirmPassword,
    },
  });

  const onSubmit = (data) => {
    setValues(data);
    navigate("/step2");
  };

  return (
    <div className={styles.wrapper}>
      <h2>Step1</h2>
      <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
        <div className={styles.inputBox}>
          <span>First Name</span>
          <input
            className={classNames(styles.input, {
              [styles.errorInput]: errors.firstName,
            })}
            id="firstName"
            type="text"
            placeholder="Enter your First Name"
            {...register("firstName")}
          />
          {errors.firstName && (
            <p className={styles.errorMessage}>{errors.firstName.message}</p>
          )}
        </div>
        <div className={styles.inputBox}>
          <span>Last Name</span>
          <input
            className={classNames(styles.input, {
              [styles.errorInput]: errors.lastName,
            })}
            id="lastName"
            type="text"
            placeholder="Enter your Last Name"
            {...register("lastName")}
          />
          {errors.lastName && (
            <p className={styles.errorMessage}>{errors.lastName.message}</p>
          )}
        </div>
        <div className={styles.inputBox}>
          <span>Email</span>
          <input
            className={classNames(styles.input, {
              [styles.errorInput]: errors.email,
            })}
            id="email"
            type="text"
            placeholder="Enter your Email"
            {...register("email")}
          />
          {errors.email && (
            <p className={styles.errorMessage}>{errors.email.message}</p>
          )}
        </div>
        <div className={styles.inputBox}>
          <span>Password</span>
          <input
            className={classNames(styles.input, {
              [styles.errorInput]: errors.password,
            })}
            id="password"
            type="password"
            placeholder="Enter your Password"
            {...register("password")}
          />
          {errors.password && (
            <p className={styles.errorMessage}>{errors.password.message}</p>
          )}
        </div>
        <div className={styles.inputBox}>
          <span>Confirm Password</span>
          <input
            className={classNames(styles.input, {
              [styles.errorInput]: errors.confirmPassword,
            })}
            id="confirmPassword"
            type="password"
            placeholder="Confitm your Password"
            {...register("confirmPassword")}
          />
          {errors.confirmPassword && (
            <p className={styles.errorMessage}>
              {errors.confirmPassword.message}
            </p>
          )}
        </div>
        <button className={styles.btn} disabled={!isValid}>
          Next
        </button>
      </form>
    </div>
  );
};
