import { useReducer } from "react";

const initialState = {
  value: "",
  isTouched: false,
};

const validationReducer = (state, action) => {
  if (action.type === "INPUT_CHANGE") {
    return { value: action.value, isTouched: state.isTouched };
  }
  if (action.type === "INPUT_BLUR") {
    return { value: state.value, isTouched: true };
  }
  if (action.type === "INPUT_RESET") {
    return { value: "", isTouched: false };
  }
  return initialState;
};

const useValidation = (validationFunc) => {
  const [inputState, dispatch] = useReducer(validationReducer, initialState);

  const valueIsValid = validationFunc(inputState.value);

  const valueHasError = !valueIsValid && inputState.isTouched;

  const valueChangeHandler = (event) => {
    dispatch({ type: "INPUT_CHANGE", value: event.target.value });
  };

  const setInitialInputHandler = (val) => {
    dispatch({ type: "INPUT_CHANGE", value: val });
  };

  const valueBlurHandler = () => {
    dispatch({ type: "INPUT_BLUR" });
  };

  const valueReset = () => {
    dispatch({ type: "INPUT_RESET" });
  };

  return {
    value: inputState.value,
    valueIsValid,
    valueHasError,
    valueChangeHandler,
    setInitialInputHandler,
    valueBlurHandler,
    valueReset,
  };
};

export default useValidation;
