import axios from "axios";
const API_URL = "http://18.222.199.244/api/v1";

export const getAllCoupons = async () => {
  let source = axios.CancelToken.source();
  try {
    return await axios.get(`${API_URL}/apps/get/coupon/all`);
  } catch (err) {
    return -1;
  } finally {
    source.cancel();
  }
};


export const getExpiredCoupons = async () => {
  let source = axios.CancelToken.source();
  try {
    return await axios.get(`${API_URL}/apps/coupons/expired/30daysold/all`);
  }
  catch (err) {
    return -1;
  } finally {
    source.cancel();
  }
}