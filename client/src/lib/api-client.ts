import { SERVER_URL } from "@/utils/constants";
import axios from "axios";

export const apiClient = axios.create({
  baseURL: SERVER_URL,
});
