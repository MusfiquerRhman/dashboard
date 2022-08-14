import axios from "axios";
const API_URL = "http://18.222.199.244/api/v1";

export const getAllCategory = async () => {
  try {
    return await axios.get(`${API_URL}/get/category/all`);
  } catch (err) {
    return -1;
  }
};