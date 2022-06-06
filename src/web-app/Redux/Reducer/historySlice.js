import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { AllHistoryData ,addVideoHistory,removeHistory,removeallHistory } from "web-app/Service/service";


const initialState = {
    historylist: [],
    isLoading: false,
    status: null
  };

//fetch history
export const getHistoryData = createAsyncThunk(
  "history/getHistoryData",
  async (token) => {
		try {
			const data  = await AllHistoryData(token);
			return data;
		} catch (error) {
			console.log(error);
		}
	}
)

// add history
export const addHistoryData = createAsyncThunk(
  "history/addHistoryData",
  async (video) => {
    try {
      const token = localStorage.getItem("token")
      const res = await addVideoHistory(token,video)
      return res;
    } catch (error) {
      console.log(error);
    }
 }
);  

// delete history
export const DeleteHistoryData = createAsyncThunk(
  "history/DeleteHistoryData",
  async (yourData) => {
    try {
      const token = localStorage.getItem("token")
      const res = await removeHistory(token,yourData[0],yourData[1])
      return res;
    } catch (error) {
      console.log(error);
    }
 }
)

// delete all
export const DeleteAllHistoryData = createAsyncThunk(
        "history/DeleteAllHistoryData",
        async (yourData) => {
          try {
            const res = await removeallHistory(yourData[0],yourData[1])
            return res;
          } catch (error) {
            console.log(error);
          }
       }
)


const historySlice = createSlice({
    name: "history",
    initialState,
    extraReducers: {
      //fetch
      [getHistoryData.pending]: (state, action) => {
        state.isLoading = true;
      },
      [getHistoryData.fulfilled]: (state, action) => {
        state.historylist = action.payload.data.history;
        state.isLoading = false;
      },
      [getHistoryData.rejected]: (state, action) => {},
      //add
      [addHistoryData.pending]: (state) => {
        state.status = "loading";
      },
      [addHistoryData.fulfilled]: (state, action) => {
        state.historylist = action.payload.data.history;
        state.status = "success";
      },
      [addHistoryData.rejected]: (state) => {
        state.status = "failed";
      },
      //delete
      [DeleteHistoryData.pending]: (state) => {
        state.status = "loading";
      },
      [DeleteHistoryData.fulfilled]: (state, action) => {
        state.historylist = action.payload;
        state.status = "success";
      },
      [DeleteHistoryData.rejected]: (state) => {
        state.status = "failed";
      },
      //delete all
      [DeleteAllHistoryData.pending]:(state)=>{
        state.status = "loading";
      },
      [DeleteAllHistoryData.fulfilled]: (state, action) => {
        state.historylist = action.payload;
        state.status = "success";
      },
      [DeleteAllHistoryData.rejected]: (state) => {
        state.status = "failed";
      }
    },
  });

  export default historySlice.reducer;
