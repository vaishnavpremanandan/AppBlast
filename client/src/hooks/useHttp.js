import { useReducer, useCallback } from "react";

function httpReducer(state, action) {
  if (action.type === "SEND") {
    return {
      data: {},
      error: null,
      status: "pending",
    };
  }

  if (action.type === "SUCCESS") {
    return {
      data: action.responseData,
      error: null,
      status: "completed",
    };
  }

  if (action.type === "ERROR") {
    return {
      data: {},
      error: action.errorMessage,
      status: "completed",
    };
  }

  if (action.type === "RESET_STATE") {
    return {
      status: null,
      data: {},
      error: null,
    };
  }

  return state;
}

function useHttp(requestFunction, startWithPending = false) {
  const [httpState, dispatch] = useReducer(httpReducer, {
    status: startWithPending ? "pending" : null,
    data: {},
    error: null,
  });

  const sendRequest = useCallback(
    async function (argument1, argument2, argument3) {
      dispatch({ type: "SEND" });
      try {
        const responseData = await requestFunction(
          argument1,
          argument2,
          argument3
        );
        dispatch({ type: "SUCCESS", responseData });
      } catch (error) {
        dispatch({
          type: "ERROR",
          errorMessage: error.message || "Something went wrong!",
        });
      }
    },
    [requestFunction]
  );

  const reset = () => {
    dispatch({ type: "RESET_STATE" });
  };

  return {
    sendRequest,
    reset,
    ...httpState,
  };
}

export default useHttp;
