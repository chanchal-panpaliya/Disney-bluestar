import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { fetchAllWatchlaterData , removeWatchLater , addWatchLater } from "web-app/Service/service";


const initialState = {
    watchlist: [],
    isLoading: false,
    status: null
  };

//fetch like
export const getWatchlistData = createAsyncThunk(
    "watch/getWatchlistData",
    async (token) => {
          try {
              const data  = await fetchAllWatchlaterData(token);
              return data;
          } catch (error) {
              console.log(error);
          }
      }
  )
  
// add watch
export const addWatchlistData = createAsyncThunk(
  "watch/addWatchlistData",
  async (formData) => {
    try {
      const token = localStorage.getItem("token")
      const res = await addWatchLater(token,formData[0],formData[1])
      return res;
    } catch (error) {
      console.log(error);
    }
 }
);

// remove watch
export const removeWatchlistData = createAsyncThunk(
  "watch/removeWatchlistData",
  async (formData) => {
    try {
      const token = localStorage.getItem("token")
      const res = await removeWatchLater(token,formData[0],formData[1])
      return res;
    } catch (error) {
      console.log(error);
    }
 }
); 

const watchSlice = createSlice({
    name: "watch",
    initialState,
    extraReducers: {
      //fetch
      [getWatchlistData.pending]: (state, action) => {
        state.isLoading = true;
      },
      [getWatchlistData.fulfilled]: (state, action) => {
        state.watchlist = action.payload.data.watchlater;
        state.isLoading = false;
      },
      [getWatchlistData.rejected]: (state, action) => {},
      //add
      [addWatchlistData.pending]: (state, action) => {
        state.isLoading = true;
      },
      [addWatchlistData.fulfilled]: (state, action) => {
        state.watchlist = action.payload;
        state.isLoading = false;
      },
      [addWatchlistData.rejected]: (state, action) => {},
      //removed
      [removeWatchlistData.pending]: (state, action) => {
        state.isLoading = true;
      },
      [removeWatchlistData.fulfilled]: (state, action) => {
        state.watchlist = action.payload;
        state.isLoading = false;
      },
      [removeWatchlistData.rejected]: (state, action) => {},
    },
  });

  export default watchSlice.reducer;
