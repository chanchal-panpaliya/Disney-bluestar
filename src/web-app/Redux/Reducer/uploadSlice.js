import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { addNewVideoHandler } from "web-app/Service/service";


const initialState = {
    uploadlist: [],
    isLoading: false,
    status: null
  };
  
// add history
export const uploadVideoData = createAsyncThunk(
  "uploadlist/uploadVideoData",
  async (formData) => {
    try {
      const res = await addNewVideoHandler(formData[0], formData[1] ,formData[2])
      return res;
    } catch (error) {
      console.log(error);
    }
 }
);


const uploadSlice = createSlice({
    name: "uploadlist",
    initialState,
    extraReducers: {
      //upload video
      [uploadVideoData.pending]: (state, action) => {
        state.isLoading = true;
      },
      [uploadVideoData.fulfilled]: (state, action) => {
        state.uploadlist = action.payload;
        state.isLoading = false;
      },
      [uploadVideoData.rejected]: (state, action) => {},
    },
  });

  export default uploadSlice.reducer;
