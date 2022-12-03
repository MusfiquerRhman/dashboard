import axios from "axios";
const API_URL = "http://18.222.199.244/api/v1/auth";

export const login = async (username, password) => {
  try {
    const formData = new FormData();
    formData.append("username", username);
    formData.append("password", password);
    return await axios.post(`${API_URL}/admin/login`, formData);
  } catch (err) {
    return -1;
  }
};

export const registration = async (email, password, phone, admin_status) => {
  try {
    return await axios.post(`${API_URL}/admin/register`, {
      email: email,
      phone: phone,
      password: password,
      admin_status: admin_status,
    });
  } catch (err) {
    return -1;
  } 
};

export const forgotPassword = async (email) => {
  try {
    return await axios.post(`${API_URL}/forgot-password`, {
        email: email
    });
  }
  catch (err) {
      return -1;
  } 
}

export const resetPassword = async (resetToken, password, confirmPassword) => {
  try {
    return await axios.post(`${API_URL}/reset-password`, {      
      new_password:  password,
      confirm_password: confirmPassword
    }, {
      params: {
        reset_password_token: resetToken
      },
    });
  }
  catch (err) {
    return -1;
  } 
}


// try {
//   const formdata = new FormData();
//   formdata.append("file", file);
//   return await axios.put(`${API_URL}/vendor/${vid}`, {
      // vendor_id: vid,
      // vendor_name: vendor_name,
      // email: email,
      // phone: phone,
      // street1: street1,
      // street2: street2,
      // description: description,
      // city: city,
      // state: state,
      // zip_code: zip_code,
      // website: website,
      // requirements: requirements,
      // is_active: is_active,
      // feature_vendor: feature_vendor,
      // hours: hours,
//   }, {
//       headers: {
//           "Authorization": `Bearer ${JSON.parse(localStorage.getItem("userInformations")).access_token}`
//       },
//   });
// } catch (e) {
//   return -1;
// }