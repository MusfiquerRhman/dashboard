import axios from "axios";
const API_URL = "http://3.131.82.99/api/v1";

export const getAllCategory = async () => {
  try {
    return await axios.get(`${API_URL}/get/category/all`);
  } catch (err) {
    return -1;
  }
};

export const addCategories = async (category_name, categoryOrderId, file) => {
  try {
    const formData = new FormData();
    formData.append("category_name", category_name);
    formData.append("app_order_id", parseInt(categoryOrderId));
    formData.append("file", file);
    return await axios.post(`${API_URL}/category`, formData, {
      headers: {
        "Authorization": `Bearer ${JSON.parse(localStorage.getItem("userInformations")).access_token}`
      },
    });
  }
  catch (e) {
    return e;
  }
}

export const updateCategories = async (category_id, category_name, categoryOrderId, file) => {
  try {
    const formData = new FormData();
    formData.append("category_name", category_name);
    formData.append("app_order_id", parseInt(categoryOrderId));
    formData.append("file", file);
    return await axios.put(`${API_URL}/category/${category_id}`, formData, {
      headers: {
        "Authorization": `Bearer ${JSON.parse(localStorage.getItem("userInformations")).access_token}`
      },
    });
  }
  catch (e) {
    return e;
  }
}

export const deleteCategories = async (category_id) => {
  try {
    return await axios.delete(`${API_URL}/category/${category_id}`, {
      headers: {
        "Authorization": `Bearer ${JSON.parse(localStorage.getItem("userInformations")).access_token}`
      },
    });
  }
  catch (e) {
    return e;
  }
}