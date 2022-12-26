import { useAuthContext } from "./useAuthContext";

export const useLogout = () => {
  const { dispatch } = useAuthContext();

  const logout = () => {
    //removing user email and token from local torage
    localStorage.removeItem("user");

    //updating the global state using dispatch
    dispatch({ type: "LOGOUT" });
  };

  return { logout };
};
