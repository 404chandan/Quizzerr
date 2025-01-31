import axios from "axios";

const axiosInstance = axios.create({});

export const apiConnector = async (method, url, bodyData, headers, params) => {
  return await axiosInstance({
    method: method,
    url: url,
    data: bodyData ? bodyData : null,
    headers: headers ? headers : null,
    params: params ? params : null,
  });
};
