import { authEndpoints } from "../APIs";
import { apiConnector } from "../apiConnector";
import toast from "react-hot-toast";
import { setToken, setUser } from "../../slices/AuthSlice";

const { SIGNUP, LOGIN } = authEndpoints;

export const signUp = async (data) => {
  try {
    const response = await apiConnector("POST", SIGNUP, data);

    if (!response?.data?.success) {
      throw new Error(response?.data?.error);
    }

    console.log("SIGNUP RESPONSE : ", response);

    toast.success("Signed Up Successfully");
    return true;
  } catch (e) {
    console.log("ERROR WHILE SINGING UP : ", e);
    toast.error(e?.response?.data?.error);
  }
  return false;
};

export const login = async (data, dispatch) => {
  try {
    const response = await apiConnector("POST", LOGIN, data);

    if (!response?.data?.success) {
      throw new Error(response?.data?.error);
    }

    console.log("LOGIN RESPONSE : ", response);

    localStorage.setItem("token", response?.data?.data?.token);
    localStorage.setItem("user", JSON.stringify(response?.data?.data?.user));
    dispatch(setToken(response?.data?.data?.token));
    dispatch(setUser(response?.data?.data?.user));
    
    toast.success("Logged In Successfully");
    return true;
  } catch (e) {
    console.log("ERROR WHILE LOGGING IN : ", e);
    toast.error(e.response.data.error);
  }
  return false;
};

export const logout = async (dispatch, navigate) => {
  try {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    dispatch(setToken(null));
    dispatch(setUser(null));
    toast.success("Logged Out Successfully");
    navigate("/login")
    return true;
  } catch (e) {
    console.log("ERROR WHILE LOGGING OUT : ", e);
    toast.error("Logout failed");
  }
  return false;
};  