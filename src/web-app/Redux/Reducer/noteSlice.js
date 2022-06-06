import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getNotesService,addNoteService,deleteNoteService,editNoteService } from "web-app/Service/service";

const initialState = {
    notelist: [],
    isLoading: false,
    status: null
  };

//fetch like
export const getNoteData = createAsyncThunk(
    "note/getNoteData",
    async (formData) => {
          try {
              const data  = await getNotesService(formData[0],formData[1]);
              return data;
          } catch (error) {
              console.log(error);
          }
      }
  )

// add
export const addNote = createAsyncThunk(
    "note/addNote",
    async (formData) => {
          try {
              const data  = await addNoteService(formData[0], formData[1] ,formData[2]);
              return data;
          } catch (error) {
              console.log(error);
          }
      }
  )

// delete
export const deleteNote = createAsyncThunk(
    "note/deleteNote",
    async (formData) => {
          try {
              const data  = await deleteNoteService(formData[0], formData[1] ,formData[2]);
              return data;
          } catch (error) {
              console.log(error);
          }
      }
  )
// edit
export const editNote = createAsyncThunk(
    "note/editNote",
    async (formData) => {
          try {
              const data  = await editNoteService( formData[0], formData[1] ,formData[2]);
              return data;
          } catch (error) {
              console.log(error);
          }
      }
  )

  
const noteSlice = createSlice({
    name: "note",
    initialState,
    extraReducers: {
      //fetch
      [getNoteData.pending]: (state, action) => {
        state.isLoading = true;
      },
      [getNoteData.fulfilled]: (state, action) => {
        state.notelist = action.payload.data.notes;
        state.isLoading = false;
      },
      [getNoteData.rejected]: (state, action) => {},
      //add
      [addNote.pending]: (state, action) => {
        state.isLoading = true;
      },
      [addNote.fulfilled]: (state, action) => {
        state.notelist = action.payload;
        state.isLoading = false;
      },
      [addNote.rejected]: (state, action) => {},
      //delete
      [deleteNote.pending]: (state, action) => {
        state.isLoading = true;
      },
      [deleteNote.fulfilled]: (state, action) => {
        state.notelist = action.payload;
        state.isLoading = false;
      },
      [deleteNote.rejected]: (state, action) => {},
      //edit
      [editNote.pending]: (state, action) => {
        state.isLoading = true;
      },
      [editNote.fulfilled]: (state, action) => {
        state.notelist = action.payload;
        state.isLoading = false;
      },
      [editNote.rejected]: (state, action) => {},
    },
  });

  export default noteSlice.reducer;
