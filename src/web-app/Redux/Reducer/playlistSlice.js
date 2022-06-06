import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {fetchAllPlaylistData ,
        addPlayListName , 
        addVideoPlaylist ,
        removedVideoPlaylist ,
        deletePlaylist
    } from "web-app/Service/service";


const initialState = {
    playlist: [],
    isLoading: false,
    status: null
  };

//fetch playlist
export const getplaylistData = createAsyncThunk(
    "playlist/getplaylistData",
    async (token) => {
          try {
              const data  = await fetchAllPlaylistData(token);
              return data;
          } catch (error) {
              console.log(error);
          }
      }
);

//add label / create playlist
export const createplaylist = createAsyncThunk(
    "playlist/createplaylist",
    async (formData) => {
      try {
        const token = localStorage.getItem("token")
        const res = await addPlayListName (formData[0],formData[1],formData[2],formData[3])
        return res;
      } catch (error) {
        console.log(error);
      }
   }
);

// add videos to playlist
export const addVideoToplaylist = createAsyncThunk(
    "playlist/addVideoToplaylist",
    async (formData) => {
      try {
        const token = localStorage.getItem("token")
        const res = await addVideoPlaylist(formData[0],formData[1],formData[2],formData[3],formData[4])
        return res;
      } catch (error) {
        console.log(error);
      }
   }
);

// delete video from playlist
export const deleteVideoplaylist = createAsyncThunk(
    "playlist/deleteVideoplaylist",
    async (formData) => {
      try {
        const token = localStorage.getItem("token")
        const res = await removedVideoPlaylist(formData[0],formData[1],formData[2],formData[3],formData[4])
        return res;
      } catch (error) {
        console.log(error);
      }
   }
);

//delete playlist
export const deleteplaylist = createAsyncThunk(
    "playlist/deleteplaylist",
    async (formData) => {
      try {
        const token = localStorage.getItem("token")
        const res = await deletePlaylist(formData[0],formData[1],formData[2],formData[3])
        return res;
      } catch (error) {
        console.log(error);
      }
   }
);

const playlistSlice = createSlice({
    name: "playlist",
    initialState,
    extraReducers: {
      //fetch
      [getplaylistData.pending]: (state, action) => {
        state.isLoading = true;
      },
      [getplaylistData.fulfilled]: (state, action) => {
        state.playlist = action.payload.data.playlists;
        state.isLoading = false;
      },
      [getplaylistData.rejected]: (state, action) => {},
      //create playlist
      [createplaylist.pending]: (state, action) => {
        state.isLoading = true;
      },
      [createplaylist.fulfilled]: (state, action) => {
        state.playlist = action.payload;
        state.isLoading = false;
      },
      [createplaylist.rejected]: (state, action) => {},
       //add video to playlist
       [addVideoToplaylist.pending]: (state, action) => {
        state.isLoading = true;
      },
      [addVideoToplaylist.fulfilled]: (state, action) => {
        let update = state.playlist.map(playlist=>playlist._id===action.payload._id ? action.payload:playlist)
        state.playlist = update;
        state.isLoading = false;
      },
      [addVideoToplaylist.rejected]: (state, action) => {},
      //delete video from playlist
      [deleteVideoplaylist.pending]: (state, action) => {
        state.isLoading = true;
      },
      [deleteVideoplaylist.fulfilled]: (state, action) => {
        let update = state.playlist.map(playlist=>playlist._id===action.payload._id ? action.payload:playlist)
        state.playlist = update;
        state.isLoading = false;
      },
      [deleteVideoplaylist.rejected]: (state, action) => {},
      //delete playlist
      [deleteplaylist.pending]: (state, action) => {
        state.isLoading = true;
      },
      [deleteplaylist.fulfilled]: (state, action) => {
        //   console.log("action.payload",action.payload)
        // let update = state.playlist.map(playlist=>playlist._id===action.payload._id ? action.payload:playlist)
        // console.log("action.payload update",update)
        state.playlist = action.payload;
        state.isLoading = false;
      },
      [deleteplaylist.rejected]: (state, action) => {},
    },
  });

  export default playlistSlice.reducer;
