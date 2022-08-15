import axios from "axios";
const API_URL = "http://18.222.199.244/api/v1";

export const getAllCategory = async () => {
  try {
    return await axios.get(`${API_URL}/get/category/all`);
  } catch (err) {
    return -1;
  }
};

export const addCategories = async (category_name, file) => {
  try {
    const formdata = new FormData();
    formdata.append("category_name", category_name);
    formdata.append("file", file);
    return await axios.post(`${API_URL}/category`, formdata, {
      headers: {
        "Authorization": `Bearer ${JSON.parse(localStorage.getItem("userInformations")).access_token}`
      },
    });
  }
  catch (e) {
    return -1;
  }
}

export const updateCategories = async (category_id, category_name, file) => {
  try {
    const formdata = new FormData();
    formdata.append("category_name", category_name);
    formdata.append("file", file);
    return await axios.put(`${API_URL}/category/${category_id}`, formdata, {
      headers: {
        "Authorization": `Bearer ${JSON.parse(localStorage.getItem("userInformations")).access_token}`
      },
    });
  }
  catch (e) {
    return -1;
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
    return -1;
  }
}