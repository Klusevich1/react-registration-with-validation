import React from "react";
import styles from "./Form.module.scss";
import classNames from "classnames";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { ImCheckboxUnchecked, ImCheckboxChecked } from "react-icons/im";
import { BsFillArrowLeftSquareFill } from "react-icons/bs";
import { yupResolver } from "@hookform/resolvers/yup";
import { AppContext } from "../../DataContext";

const schema2 = yup.object().shape({
  nick: yup
    .string()
    .matches(
      /^([^а-яёА-ЯЁ]*)([A-Za-z0-9-_])$/,
      "Nick should contain only latin letters, '-', '_' and numbers"
    )
    .required("Your NickName is required!"),
  phoneNumber: yup
    .string()
    .matches(
      /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im,
      "Phone Number should contain only numbers and plus"
    )
    .required(""),
});

export const Step2 = () => {
  const { data, setValues } = React.useContext(AppContext);
  const navigate = useNavigate();
  const [checked, setChecked] = React.useState(true);
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({
    mode: "onChange",
    resolver: yupResolver(schema2),
    defaultValues: {
      nick: data.nick,
      phoneNumber: data.phoneNumber,
    },
  });

  const onSubmit = (data) => {
    setValues(data);
    navigate("/step3");
  };

  return (
    <div className={styles.wrapper}>
      <BsFillArrowLeftSquareFill
        onClick={() => navigate(-1)}
        className={styles.prev}
      />
      <h2>Step2</h2>
      <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
        <div className={styles.inputBox}>
          <span>NickName</span>
          <input
            className={classNames(styles.input, {
              [styles.errorInput]: errors.nick,
            })}
            id="NickName"
            type="text"
            placeholder="Enter your Nick Name"
            {...register("nick")}
          />
          {errors.nick && (
            <p className={styles.errorMessage}>{errors.nick.message}</p>
          )}
        </div>
        <div
          style={{ flexDirection: "row", gap: "20px", alignItems: "center" }}
          className={styles.inputBox}
        >
          {!checked && <ImCheckboxChecked onClick={() => setChecked(true)} />}
          {checked && <ImCheckboxUnchecked onClick={() => setChecked(false)} />}
          <span style={{ margin: 0, fontWeight: "500", fontSize: "13px" }}>
            Do you have a Phone Number?
          </span>
        </div>
        {!checked && (
          <div className={styles.inputBox}>
            <span>Phone Number</span>
            <input
              className={classNames(styles.input, {
                [styles.errorInput]: errors.phoneNumber,
              })}
              type="text"
              {...register("phoneNumber")}
            />
            {errors.phoneNumber && (
              <p className={styles.errorMessage}>
                {errors.phoneNumber.message}
              </p>
            )}
          </div>
        )}
        <button className={styles.btn} disabled={!isValid}>
          Next
        </button>
      </form>
    </div>
  );
};
