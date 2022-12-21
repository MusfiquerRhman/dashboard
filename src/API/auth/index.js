import axios from "axios";
const API_URL = "http://3.131.82.99/api/v1";

export const login = async (username, password) => {
  try {
    const formData = new FormData();
    formData.append("username", username);
    formData.append("password", password);
    return await axios.post(`${API_URL}/auth/admin/login`, formData);
  } catch (err) {
    return -1;
  }
};

export const registration = async (email, password, phone, admin_status) => {
  try {
    return await axios.post(`${API_URL}/auth/admin/register`, {
      email: email,
      phone: phone,
      password: password,
      admin_status: admin_status,
    });
  } catch (err) {
    return -1;
  } 
};

export const sendOTP = async (email) => {
  try {
    return await axios.post(`${API_URL}/otp/send`, {
      recipient_id: email
    }, {
      params: {
        type: 'Email'
      },
    });
  }
  catch (err) {
      return -1;
  } 
}

export const verifyOTP = async (email, sessionId, optCode) => {
  try {
    return await axios.post(`${API_URL}/otp/verify`, {
      recipient_id: email,
      session_id: sessionId,
      otp_code: optCode
    });
  }
  catch (err) {
      return -1;
  } 
}


export const resetPassword = async (resetToken, password, confirmPassword) => {
  try {
    return await axios.post(`${API_URL}/auth/reset-password`, {      
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

