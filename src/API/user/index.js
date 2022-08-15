import axios from "axios";
const API_URL = "http://18.222.199.244/api/v1";

export const logout = async () => {
  try {
    return await axios.get(`${API_URL}/user/logout`);
  } catch (err) {
    return -1;
  }
};

export const adminUserCount = async () => {
  try {
    return await axios.get(`${API_URL}/user/admin/count`, {
      headers: {
        Authorization: `Bearer ${
          JSON.parse(localStorage.getItem("userInformations")).access_token
        }`,
      },
    });
  } catch (err) {
    return -1;
  }
};

export const userCount = async () => {
  try {
    return await axios.get(`${API_URL}/user/count`, {
      headers: {
        Authorization: `Bearer ${
          JSON.parse(localStorage.getItem("userInformations")).access_token
        }`,
      },
    });
  } catch (err) {
    return -1;
  }
};

export const getAllAdmin = async () => {
  try {
    return await axios.get(`${API_URL}/user/admin/all`, {
      headers: {
        Authorization: `Bearer ${
          JSON.parse(localStorage.getItem("userInformations")).access_token
        }`,
      },
    });
  } catch (err) {
    return -1;
  }
};

export const getUserProfile = async () => {
  try {
    return await axios.get(`${API_URL}/user/profile`, {
      headers: {
        Authorization: `Bearer ${
          JSON.parse(localStorage.getItem("userInformations")).access_token
        }`,
      },
    });
  } catch (err) {
    return -1;
  }
};

export const updateUserProfile = async (fullname, phone, zip) => {
    try {
      return await axios.patch(`${API_URL}/user/profile`, {
        fullname: fullname,
        phone: phone,
        zip: zip
      }, {
        headers: {
          Authorization: `Bearer ${
            JSON.parse(localStorage.getItem("userInformations")).access_token
          }`,
        },
      });
    } catch (err) {
      return -1;
    }
  };
  

  export const deleteUserProfile = async () => {
    try {
      return await axios.delete(`${API_URL}/user/profile`,{
        headers: {
          Authorization: `Bearer ${
            JSON.parse(localStorage.getItem("userInformations")).access_token
          }`,
        },
      });
    } catch (err) {
      return -1;
    }
  };