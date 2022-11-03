import axios from "axios";
const API_URL = "http://18.222.199.244/api/v1";

export const logout = async () => {
  let source = axios.CancelToken.source();
  try {
    return await axios.get(`${API_URL}/user/logout`);
  } catch (err) {
    return -1;
  }
  finally {
    source.cancel();
  }
};

export const adminUserCount = async () => {
  let source = axios.CancelToken.source();
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
  finally {
    source.cancel();
  }
};

export const userCount = async () => {
  let source = axios.CancelToken.source();
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
  finally {
    source.cancel();
  }
};

export const getAllAdmin = async () => {
  let source = axios.CancelToken.source();
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
  finally {
    source.cancel();
  }
};

export const getUserProfile = async () => {
  let source = axios.CancelToken.source();
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
  finally {
    source.cancel();
  }
};

export const updateUserProfile = async (fullname, phone, zip) => {
  let source = axios.CancelToken.source();
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
    finally {
      source.cancel();
    }
  };

export const updateProfilePicture = async (file) => {
  let source = axios.CancelToken.source();
  try {
    const formdata = new FormData();
    formdata.append('file', file)
    return axios.post(`${API_URL}/category/upload-profile-image`, formdata, {
      headers: {
        Authorization: `Bearer ${
          JSON.parse(localStorage.getItem("userInformations")).access_token
        }`,
      },
    });
    } catch (err) {
      return -1;
    }
    finally {
      source.cancel();
    }
}
  

export const deleteUserProfile = async () => {
  let source = axios.CancelToken.source();
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
  finally {
    source.cancel();
  }
};