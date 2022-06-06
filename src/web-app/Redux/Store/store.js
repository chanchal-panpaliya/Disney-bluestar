import { configureStore } from '@reduxjs/toolkit'
import historyReducers from '../Reducer/historySlice';
import likedReducers from '../Reducer/likeSlice';
import watchReducers from '../Reducer/watchSlice';
import playlistReducers from '../Reducer/playlistSlice';
import NoteReducer from '../Reducer/noteSlice';
import uploadReducer from '../Reducer/uploadSlice';
import authenticationReducer from "../Reducer/authSlice";


export const store = configureStore({
  reducer: {
    history: historyReducers,
    likes : likedReducers ,
    watch : watchReducers,
    playlist : playlistReducers ,
    note :NoteReducer,
    upload : uploadReducer,
    authentication: authenticationReducer,
  },
})

