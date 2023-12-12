import React from "react";
import styles from "./Form.module.scss";
import { BsFillArrowLeftSquareFill } from "react-icons/bs";
import { useNavigate, useRevalidator } from "react-router-dom";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { AppContext } from "../../DataContext";
import classNames from "classnames";

const birthSchema = yup.object().shape({
  region: yup.string().required("Your Region is required"),
  postCode: yup.string().matches(/^([0-9]*)$/, "Post Code should contain only 6 numbers").length(6, "Only 6 elements").required("Your Post Code is required"),
  dateOfBirth: yup.string().required("Your Date of Birth is required"),
});

export const Step3 = () => {
  const { data, setValues } = React.useContext(AppContext);
  const [value, setValue] = React.useState('');
  const regions = ['Minsk', 'Minsk region', 'Grodno region', 'Vitebsk region', 'Mogilev region', 'Gomel region', 'Brest region']
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({
    mode: "onChange",
    resolver: yupResolver(birthSchema),
    defaultValues: {
      region: data.region,
      dateOfBirth: data.dateOfBirth,
      postCode: data.postCode,
    },
  });

  const options = regions.map((region, index) => {
    return <option key={index}>{region}</option>
  })

  const onSubmit = (data) => {
    setValues(data);
    navigate("/result");
  };

  return (
    <div className={styles.wrapper}>
      <BsFillArrowLeftSquareFill
        onClick={() => navigate(-1)}
        className={styles.prev}
      />
      <h2>Step3</h2>
      <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
        <div className={styles.inputBox}>
          <select className={styles.input} value={value} onChange={(event) => setValue(event.target.value)} {...register("region")}>{options}</select>
        </div>
        {/* <div className={styles.inputBox}>
          <span>City</span>
          <input
            className={classNames(styles.input, {
              [styles.errorInput]: errors.city,
            })}
            id="city"
            type="text"
            placeholder="Enter your City"
            {...register("city")}
          />
          {errors.city && (
            <p className={styles.errorMessage}>{errors.city.message}</p>
          )}
        </div> */}
        <div className={styles.inputBox}>
          <span>Post Code</span>
          <input
            className={classNames(styles.input, {
              [styles.errorInput]: errors.postCode,
            })}
            id="postCode"
            type="text"
            placeholder="Enter your Post Code"
            {...register("postCode")}
          />
          {errors.postCode && (
            <p className={styles.errorMessage}>{errors.postCode.message}</p>
          )}
        </div>
        <div className={styles.inputBox}>
          <span>Date of Birth</span>
          <input
            className={classNames(styles.input, {
              [styles.errorInput]: errors.nick,
            })}
            id="dateOfBirth"
            type="date"
            placeholder="Enter your Date of Birth"
            {...register("dateOfBirth")}
          />
          {errors.dateOfBirth && (
            <p className={styles.errorMessage}>{errors.dateOfBirth.message}</p>
          )}
        </div>
        <button className={styles.btn} disabled={!isValid}>
          Next
        </button>
      </form>
    </div>
  );
};
