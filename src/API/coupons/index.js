import axios from "axios";
const API_URL = "http://18.222.199.244/api/v1";

export const getAllCoupons = async () => {
  try {
    return await axios.get(`${API_URL}/coupons/all`);
  } catch (err) {
    return -1;
  }
};

export const getAllExpiredCoupons = async () => {
  try {
    return await axios.get(`${API_URL}/coupons/expired/all`);
  } catch (err) {
    return -1;
  }
};

export const getAllFeaturedCoupons = async () => {
  try {
    return await axios.get(`${API_URL}/coupons/admin/featured/all`);
  } catch (err) {
    return -1;
  }
};

export const getAllActiveAndFutureCoupons = async () => {
  try {
    return await axios.get(`${API_URL}/coupons/active_and_future_start_date/all`);
  } catch (err) {
    return -1;
  }
};

export const getCouponsByVendor = async (vendor_id) => {
  try {
    return await axios.get(`${API_URL}/${vendor_id}/coupons/all`);
  } catch (err) {
    return -1;
  }
};

export const deleteCoupon = async (coupon_id) => {
  try {
    return await axios.delete(`${API_URL}/coupon/${coupon_id}`, {
      headers: {
        "Authorization": `Bearer ${JSON.parse(localStorage.getItem("userInformations")).access_token}`
      }}
    )} 
    catch (err) {
    return -1;
  }
};

export const updateCoupons = async (coupon_id, vendor_id, subcategory_id, coupon_code, percentage_off, single_use, feature_coupon, start_date, end_date, updateDate) => {
  try {
    return await axios.put(`${API_URL}/${vendor_id}/coupon/${coupon_id}/${subcategory_id}`, {
      vid: vendor_id,
      scid: subcategory_id,
      coupon_code: coupon_code,
      percentage_off: percentage_off,
      single_use: single_use,
      feature_coupon: feature_coupon,
      start_date: start_date,
      end_date: end_date,
      updated_date: updateDate
    }, {
      headers: {
        "Authorization": `Bearer ${JSON.parse(localStorage.getItem("userInformations")).access_token}`
      }}
    )} 
    catch (err) {
    return -1;
  }
};


export const addCoupons = async (vendor_id, subcategory_id, coupon_code, percentage_off, single_use, feature_coupon, start_date, end_date) => {
  try {
    return await axios.post(`${API_URL}/${vendor_id}/${subcategory_id}/coupon`, {
      coupon_code: coupon_code,
      percentage_off: percentage_off,
      single_use: single_use,
      feature_coupon: feature_coupon,
      start_date: start_date,
      end_date: end_date,
    }, {
      headers: {
        "Authorization": `Bearer ${JSON.parse(localStorage.getItem("userInformations")).access_token}`
      }}
    )} 
    catch (err) {
    return -1;
  }
};

// "coupon_code": "string",
// "percentage_off": 0,
// "single_use": false,
// "feature_coupon": false,
// "start_date": "2022-08-15",
// "end_date": "2022-08-15"