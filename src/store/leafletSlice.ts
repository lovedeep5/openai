import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { GPTRequest, GPTIimageRequest } from "../gateways/gateways";
import {
  GPTRequestType,
  leafletInitialTypes,
  GPTImageRequestType,
} from "../types";

const initialState: leafletInitialTypes = {
  coordinates: [],
  title: "",
  image: "",
  loading: false,
  error: "",
};

export const getGeoPointsFromGPT = createAsyncThunk(
  "leaflet/getGeoPointsFromGPT",
  async (requestData: GPTRequestType) => {
    try {
      const response = await GPTRequest(requestData);
      if (response.status === 200) {
        return JSON.parse(response.data.choices[0].message.content);
      }
    } catch (error) {
      return error;
    }
  }
);

export const getImageFromGPT = createAsyncThunk(
  "leaflet/getImageFromGPT",
  async (requestData: GPTImageRequestType) => {
    try {
      const response = await GPTIimageRequest(requestData);
      console.log(response);

      if (response.status === 200) {
        return response.data.data[0].url;
      }
    } catch (error) {
      return error;
    }
  }
);

export const leafletSlice = createSlice({
  name: "leaflet",
  initialState,
  reducers: {
    // Add any synchronous action reducers here if needed
  },
  extraReducers: (builder) => {
    builder.addCase(getGeoPointsFromGPT.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getGeoPointsFromGPT.fulfilled, (state, action) => {
      state.coordinates = action.payload.coordinates;
      state.title = action.payload.title;
      state.loading = false;
    });
    builder.addCase(getGeoPointsFromGPT.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
    builder.addCase(getImageFromGPT.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getImageFromGPT.fulfilled, (state, action) => {
      state.image = action.payload;
      state.loading = false;
    });
    builder.addCase(getImageFromGPT.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
  },
});

// Export action creators
// export const {} = leafletSlice.actions;

// Export reducer
export default leafletSlice.reducer;
