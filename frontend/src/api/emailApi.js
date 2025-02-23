import axios from "axios";

const API_URL = "http://localhost:8080/api";

export const fetchEmails = async () => {
  const response = await axios.get(`${API_URL}/emails`);
  return response.data;
};

export const searchEmails = async (query) => {
  const response = await axios.get(`${API_URL}/search?query=${query}`);
  return response.data;
};
