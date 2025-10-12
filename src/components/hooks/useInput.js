import { useState } from "react";

const useInput = (validate) => {
  const [value, setValue] = useState("");
  const [isTouched, setIsTouched] = useState(false);

  const isValid = validate(value);
  const isInvalid = isTouched && !isValid;

  const valueChangeHandler = (event) => {
    setValue(event.target.value);
  };

  const inputBlurHandler = (event) => {
    setIsTouched(true);
  };

  const resetInput = () => {
    setValue("");
    setIsTouched(false);
  };

  return {
    value,
    setValue,
    isValid,
    isInvalid,
    valueChangeHandler,
    inputBlurHandler,
    resetInput,
  };
};

export default useInput;
