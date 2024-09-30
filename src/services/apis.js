import { axiosInstance } from '../utils/axiosConfig';

// Function to fetch all newsletters
export const fetchAllNewsletters = async (langId) => {
  const response = await axiosInstance.get(`/api/v1/json/newsletter/get-all-newsletters?langId=${langId}`);
  return response.data;
};

// Function to request OTP
export const requestOtp = async (email) => {
  const response = await axiosInstance.get(`/api/v1/json/newsletter/request-otp?Email=${email}`);
  return response.data;
};

// Function to verify OTP
export const verifyOtp = async ({ otp, verificationID }) => {
  const response = await axiosInstance.get(`/api/v1/json/newsletter/otp-verification?EmailVerificationCode=${otp}&RegitserVerificationID=${verificationID}`);
  return response.data;
};

// Function to subscribe to a newsletter
export const subscribeToNewsletter = async ({ userId, preferenceID }) => {
  const response = await axiosInstance.post(`/api/v1/json/newsletter/subscribe-newsletter?PreferenceId=${preferenceID}&UserId=${userId}&isSubscribed=1`, {});
  return response.data;
};

// Function to unsubscribe from a newsletter
export const unsubscribeFromNewsletter = async ({ userId, preferenceID }) => {
  const response = await axiosInstance.post(`/api/v1/json/newsletter/subscribe-newsletter?PreferenceId=${preferenceID}&UserId=${userId}&isSubscribed=0`, {});
  return response.data;
};

// Function to fetch user subscriptions
export const getUserSubscription = async (userId, langId) => {
  const response = await axiosInstance.get(`/api/v1/json/newsletter/get-user-subscriptions?userId=${userId}&langId=${langId}`);
  console.log('API response in getUserSubscription:', response.data); // Debugging log
  return response.data;
};