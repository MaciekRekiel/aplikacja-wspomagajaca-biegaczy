import { useState, useEffect, useContext } from "react";

import { Context as AuthContext } from "../context/AuthContext";

export const useError = () => {
  const [errors, setErrors] = useState({});
  const { state } = useContext(AuthContext);

  useEffect(() => {
    const errorsObj = {};
    for (let err in state.errorMessages) {
      errorsObj[err] = state.errorMessages[err];
    }
    setErrors(errorsObj);
  }, [state.errorMessages]);

  return [errors];
};
