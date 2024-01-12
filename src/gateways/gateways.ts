import axios from "axios";
import { GPT_TEXT, GPT_IMAGE } from "../constants";
import { GPTRequestType, GPTImageRequestType } from "../types";

export const GPTRequest = async (requestData: GPTRequestType) =>
  axios.post(GPT_TEXT, requestData, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${import.meta.env.VITE_REACT_APP_OPEN_AI_API_KEY}`,
    },
  });

export const GPTIimageRequest = async (requestData: GPTImageRequestType) =>
  axios.post(GPT_IMAGE, requestData, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${import.meta.env.VITE_REACT_APP_OPEN_AI_API_KEY}`,
    },
  });
