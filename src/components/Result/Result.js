import React from "react";
import styles from "./Result.module.scss";
import { AppContext } from "../../DataContext";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { BsFillArrowLeftSquareFill } from "react-icons/bs";
import { useForm } from "react-hook-form";

export const Result = () => {
  const navigate = useNavigate();
  const { data, setValues, setData } = React.useContext(AppContext);
  const [success, setSuccess] = React.useState(false);
  console.log(data);

  // const {register, handleSubmit, formState:{errors, isValid}} = useForm({
  //   mode: 'onSubmit',
  //   defaultValues: {
  //     fi
  //   }
  // });

  
  
  const onSubmitData = async () => {
    try {
      console.log(data);
      const res = await axios.post("http://localhost:3002/users", data);
      if (res.status === 200) {
        setSuccess(true);
      }
      setValues({});
      setData({});
    } catch (error) {
      alert(error);
    }
  };

  return (
    <div className={styles.wrapper}>
      <BsFillArrowLeftSquareFill
        onClick={() => navigate(-1)}
        className={styles.prev}
      />
      <h2>Result</h2>
      <h3>🎉Congratulate🎉</h3>
      <span className={styles.spanText}>
        You have completed the registration!
      </span>
      <div className={styles.finalTable}>
        <table>
          <tr style={{ borderBottom: "1px solid rgb(0, 105, 123)" }}>
            <th style={{ borderRight: 0 }}>Fields</th>
            <th>Values</th>
          </tr>
          {Object.keys(data)
            .filter((item) => !item.toLowerCase().includes("password"))
            .map((key, index) => {
              return (
                <tr key={index}>
                  <th style={{ fontWeight: "400", height: "40px" }}>
                    {key.charAt(0).toUpperCase() + key.slice(1)}
                  </th>
                  <th style={{ fontWeight: "400", height: "40px" }}>
                    {data[key]}
                  </th>
                </tr>
              );
            })}
        </table>
      </div>
      {/* <Link to="final"> */}
        <button className={styles.btn} onClick={onSubmitData}>
          Submit
        </button>
      {/* </Link> */}
      <Link to="/">
        <button
          className={styles.btn}
          style={{ backgroundColor: "transparent", color: "rgb(0, 105, 123)" }}
        >
          Fill in again
        </button>
      </Link>
    </div>
  );
};
