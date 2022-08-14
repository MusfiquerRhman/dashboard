import axios from "axios";
const API_URL = "http://18.222.199.244/api/v1";

export const getAllVendors = async () => {
  try {
    return await axios.get(`${API_URL}/get/vendor/all`);
  } catch (err) {
    return -1;
  }
};

export const getFeaturedVendors = async () => {
  try {
    return await axios.get(`${API_URL}/vendor/featured/all`);
  } catch (err) {
    return -1;
  }
};


export const deleteVendor = async (vendorId) => {
  try {
    return await axios.delete(`${API_URL}/vendor/${vendorId}`, {
      headers: {
        "Authorization": `Bearer ${JSON.parse(localStorage.getItem("userInformations")).access_token}`,
    }});
  } catch (err) {
    return -1;
  }
};

export const updateVendor = async (
    vid, vendor_name, email, phone, description, hours, street1, street2, city, state, zip_code, website, requirements, is_active, feature_vendor, file
) => {
  const formdata = new FormData();
  formdata.append("file", file);
    try {
        return await axios.put(`${API_URL}/vendor/${vid}`, formdata, {
            params: {
              vendor_id: vid,
              vendor_name: vendor_name,
              email: email,
              phone: phone,
              street1: street1,
              street2: street2,
              description: description,
              city: city,
              state: state,
              zip_code: zip_code,
              website: website,
              requirements: requirements,
              is_active: is_active,
              feature_vendor: feature_vendor,
              hours: hours,
            },
            headers: {
                "Authorization": `Bearer ${JSON.parse(localStorage.getItem("userInformations")).access_token}`,
            },
        });
    } catch (e) {
        return -1;
    }
};


export const addVendor = async (
  vendor_name, email, phone, description, hours, street1, street2, city, state, zip_code, website, requirements, is_active, feature_vendor, file
) => {
  const formdata = new FormData();
  formdata.append("file", file);
    try {
      return await axios.post(`${API_URL}/vendor`, formdata, {
        params: {
          vendor_name: vendor_name,
          email: email,
          phone: phone,
          street1: street1,
          street2: street2,
          description: description,
          city: city,
          state: state,
          zip_code: zip_code,
          website: website,
          requirements: requirements,
          is_active: is_active,
          feature_vendor: feature_vendor,
          hours: hours,
        },
        headers: {
          "Authorization": `Bearer ${JSON.parse(localStorage.getItem("userInformations")).access_token}`,
        },
      });
    } 
    catch (e) {
        return -1;
    }
}