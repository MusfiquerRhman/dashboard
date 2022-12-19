import axios from "axios";
const API_URL = "http://3.131.82.99/api/v1";

export const getAllSubCategory = async () => {
  try {
    return await axios.get(`${API_URL}/get/subcategory/all`);
  } 
  catch (err) {
    return -1;
  }
};

export const getAllSubCategoryByCategoryID = async (category_id) => {
  try {
    return await axios.get(`${API_URL}/${category_id}/sub_categories/all`);
  } 
  catch (err) {
    return -1;
  }
};

export const updateSubCategories = async (category_id, sub_category_id, sub_category_name, file) => {
  try {
    const formData = new FormData();
    formData.append("sub_category_name", sub_category_name);
    formData.append("file", file);
    return await axios.put(`${API_URL}/${category_id}/subcategory/${sub_category_id}`, formData, {
        headers: {
          Authorization: `Bearer ${JSON.parse(localStorage.getItem("userInformations")).access_token}`,
        },
      }
    );
  } 
  catch (e) {
    return e;
  } 
};

export const addSubCategories = async (category_id, sub_category_name, file) => {
  try {
    const formData = new FormData();
    formData.append("sub_category_name", sub_category_name);
    formData.append("category_id", category_id);
    formData.append("file", file);
    return await axios.post(`${API_URL}/subcategory`, formData, {
      headers: {
        Authorization: `Bearer ${JSON.parse(localStorage.getItem("userInformations")).access_token}`,
      },
    });
  } 
  catch (e) {
    return e;
  }
};

export const deleteSubCategories = async (sub_category_id) => {
  try {
    return await axios.delete(`${API_URL}/sub_category/${sub_category_id}`, {
      headers: {
        Authorization: `Bearer ${JSON.parse(localStorage.getItem("userInformations")).access_token}`,
      },
    });
  } 
  catch (e) {
    return e;
  }
};
