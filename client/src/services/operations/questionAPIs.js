import { questionEndpoints } from "../APIs";
import { apiConnector } from "../apiConnector"
import toast from "react-hot-toast";

export const createQuestion = async (data, token) => {

  try {
    const response = await apiConnector(
      "POST",
      questionEndpoints.CREATE_QUESTION,
      data,
      {
        Authorization: `Bearer ${token}`,
      }
    );

    if (!response.data.success) {
      throw new Error(response.data.error);
    }

    console.log("CREATE QUESTION API RESPONSE : ", response);

    return response.data.data;
  } catch (error) {
    console.log("Error while creating question", error);
    toast.error("Error while creating question");
  }
  return null;
};

export const deleteQuestion = async (questionId, token) => {
  try {
    const response = await apiConnector(
      "DELETE",
      `${questionEndpoints.DELETE_QUESTION}/${questionId}`,
      null,
      {
        Authorization: `Bearer ${token}`,
      }
    );

    if (!response.data.success) {
      throw new Error(response.data.error);
    }

    console.log("DELETE QUESTION API RESPONSE : ", response);

    return true
  } catch (error) {
    console.log("Error while deleting question", error);
    toast.error("Error while deleting question");
  }
  return false;
};