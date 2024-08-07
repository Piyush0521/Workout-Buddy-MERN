import { useState } from "react";
import { Navigate } from "react-router-dom";
import { useAuthContext } from "./useAuthContext";

const BACKEND_URL = "https://workout-buddy-mern-c92e.onrender.com";

export const useSignup = () => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(null);
  const { dispatch } = useAuthContext;

  const signup = async (email, password) => {
    setIsLoading(true);
    setError(null);

    const response = await fetch(`${BACKEND_URL}/api/users/signup`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });
    const data = await response.json();

    if (!response.ok) {
      setIsLoading(false);
      setError(data.error);
    }
    if (response.ok) {
      //save the user to local storage so that when a user returns to the browser he remains logged in
      localStorage.setItem("user", JSON.stringify(data));

      //update the auth context
      dispatch({ type: "LOGIN", payload: data });
      setIsLoading(false);
      <Navigate to='/' />;
    }
  };
  return { signup, isLoading, error };
};
