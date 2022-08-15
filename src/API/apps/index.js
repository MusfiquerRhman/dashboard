import axios from "axios";
const API_URL = "http://18.222.199.244/api/v1";

export const getAllCoupons = async () => {
  try {
    return await axios.get(`${API_URL}/apps/get/coupon/all`);
  } catch (err) {
    return -1;
  }
};


export const getExpiredCoupons = async () => {
  try {
    return await axios.get(`${API_URL}/apps/coupons/expired/30daysold/all`);
  }
  catch (err) {
    return -1;
  }
}