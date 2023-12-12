import React from "react";
import { Route, Routes } from "react-router-dom";
import { AppContext } from "./DataContext";
import { Header } from "./components/Header";
import { Step1 } from "./components/Steps/Step1";
import { Step2 } from "./components/Steps/Step2";
import { Step3 } from "./components/Steps/Step3";
import { Result } from "./components/Result/Result";

function App() {
  const [data, setData] = React.useState({});

  const setValues = (values) => {
    setData((prevData) => ({
      ...prevData,
      ...values,
    }));
  };

  return (
    <AppContext.Provider value={{ data, setValues, setData }}>
      <Header />
      <Routes>
        <Route path="/" element={<Step1 />} />
        <Route path="/step2" element={<Step2 />} />
        <Route path="/step3" element={<Step3 />} />
        <Route path="/result" element={<Result />} />
      </Routes>
    </AppContext.Provider>
  );
}

export default App;
