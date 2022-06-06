import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { addVideoToLikedVideos ,removeFromlikedVideos,fetchAllLikedData } from "web-app/Service/service";

const initialState = {
    likedlist: [],
    isLoading: false,
    status: null
  };

//fetch like
export const getLikedData = createAsyncThunk(
    "like/getLikedData",
    async (token) => {
          try {
              const data  = await fetchAllLikedData(token);
              return data;
          } catch (error) {
              console.log(error);
          }
      }
  )
  
// add history
export const addLikedData = createAsyncThunk(
  "like/addLikedData",
  async (formData) => {
    try {
      const token = localStorage.getItem("token")
      const res = await addVideoToLikedVideos(token,formData[0],formData[1])
      return res;
    } catch (error) {
      console.log(error);
    }
 }
);

// remove history
export const removeLikedData = createAsyncThunk(
  "like/removeLikedData",
  async (formData) => {
    try {
      const token = localStorage.getItem("token")
      const res = await removeFromlikedVideos(token,formData[0],formData[1])
      return res;
    } catch (error) {
      console.log(error);
    }
 }
); 

const likeSlice = createSlice({
    name: "like",
    initialState,
    extraReducers: {
      //fetch
      [getLikedData.pending]: (state, action) => {
        state.isLoading = true;
      },
      [getLikedData.fulfilled]: (state, action) => {
        state.likedlist = action.payload.data.likes;
        state.isLoading = false;
      },
      [getLikedData.rejected]: (state, action) => {},
      //add
      [addLikedData.pending]: (state, action) => {
        state.isLoading = true;
      },
      [addLikedData.fulfilled]: (state, action) => {
        state.likedlist = action.payload;
        state.isLoading = false;
      },
      [addLikedData.rejected]: (state, action) => {},
      //removed
      [removeLikedData.pending]: (state, action) => {
        state.isLoading = true;
      },
      [removeLikedData.fulfilled]: (state, action) => {
        state.likedlist = action.payload;
        state.isLoading = false;
      },
      [removeLikedData.rejected]: (state, action) => {},
    },
  });

  export default likeSlice.reducer;
