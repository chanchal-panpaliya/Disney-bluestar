import { useReducer ,useEffect } from "react";
import VideoContext from './VideoContext';
import ToastReducer from '../Toast/ToastReducer';
import {MenuReducer,SingleProductData,SinglePlaylistId,Authroute,EpisodeVideoId}from '../menu/MenuReducer';
import VideoReducer from "./VideoReducer";
import Watchlist from "../others/Watchlist";
import LikedList from "../others/Liked";
import HistoryList from "../others/History";
import FilterReducer from "../Filter/FilterReducer";
import NoteReducer from "../others/Note";
import ContinuewatchReducer from "../others/Continuewatch";
import {videos} from "../../../backend/db/videos";

import {Uploadreducer,ViewCountreducer} from "../others/Uploaded";


const VideoState =({ children })=>{
    const [toast,toastdispatch] = useReducer(ToastReducer,{showToast:false , toastList : []})
    //menu selected
    const [menu,selectedmenudispatch] = useReducer(MenuReducer,{selectedMenu:""})
    // getsingle data
    const [singledata,singledatadispatch] = useReducer(SingleProductData,{getsingledata:""})
    // playlist 
    const [playlist,playlist_dispatch] = useReducer(VideoReducer,{playlistdata:[]})
    //single playlist
    const [singleplalist,singleplaylist_dispatch] = useReducer(SinglePlaylistId,{PlaylistId:""})
    //auth route
    const [route,route_dispatch]=useReducer(Authroute,{authroute:"login"})
    //watchlist
    const [watch,watchlist_dispatch]=useReducer(Watchlist,{watchlist:[]})
   //liked
    const [like,like_dispatch]=useReducer(LikedList,{liked:[]})
    //history
    const [history,history_dispatch]=useReducer(HistoryList,{historylist:[]})
    //note
    const [note,note_dispatch]=useReducer(NoteReducer,{notedata:[]})
    //episode id
    const [episode,episode_dispatch]=useReducer(EpisodeVideoId,{episode_video_Id:""})
    //filter
    const [filter,filter_dispatch]=useReducer(FilterReducer,{categoryType:"All",sort:""})
    //uploaded video
    const [uploaded,uploaded_dispatch]=useReducer(Uploadreducer,{uploadedvideo:[]})
    //ViewCountreducer
    const [view,view_dispatch]=useReducer(ViewCountreducer,{viewcount:videos})
    //continue watch list
    const [continuelist,continue_dispatch]=useReducer(ContinuewatchReducer,{Continuewatchlist:[]})
    
    useEffect(()=>{
        if(uploaded.uploadedvideo.length>0){
          view.viewcount.push(...uploaded.uploadedvideo)
        }
    },[view.viewcount])
    
    const getAllVideo=(data)=>{
      view_dispatch({type:"GET_ALL_VIDEO",payload:data})
    }

    const CountVideoView=(video)=>{
      view_dispatch({type:"VIDEO_VIEW_COUNT",payload:video})
    }

    //Continue watchlist
    const getContinueWatchItem =(item)=>{
       continue_dispatch({type:"ADD_CONTINUE_WATCH",payload:item})
    }

    //Uploaded new video

    const Add_Uploaded_Video=(data)=>{
      uploaded_dispatch({type:"ADD_NEW_VIDEO",payload:data})
    }


    //add Note
    const AddNote=(data)=>{
      note_dispatch({type:"ADD_NOTE",payload:data})
    }

    //singledata
    const getSingleSelectedData=(data)=>{
        singledatadispatch({type:"DATA_SELECTED",payload:data})
    }
    //menu selected
    const menuselected=(name)=>{
        selectedmenudispatch({type:"MENU_SELECTED",payload:name})
    }
 
   //delete toast
   const deleteToast = (id) =>{
    toastdispatch({type:'REMOVE_TOAST',payload:id})  
   }

   //auth route
   const selectAuthRoute=(item)=>{
    route_dispatch({type:'AUTH_ROUTE',payload:item})   
   }

  
   /*------------------------------------------------------------*/

   //playlist
   const addTitlePlaylist=(list)=>{
    playlist_dispatch({type:'PLAYLIST_NAME',payload:list}) 
    toastdispatch({type:'SUCCESS',payload:"Playlist Created"})
   }
   //add video playlist
   const addVideoPlaylist=(video)=>{
    playlist_dispatch({type:'PLAYLIST_ADD_VIDEO',payload:video}) 
    toastdispatch({type:'SUCCESS',payload:"Video Added to palylist"})
   } 
   //remove video playlist
   const removeVideoPlaylsit=(video)=>{
    playlist_dispatch({type:'PLAYLIST_REMOVE_VIDEO',payload:video})
    toastdispatch({type:'DANGER',payload:"Video removed from Playlist"})
   }
   //single playlist
   const singlePlaylist=(id)=>{
    singleplaylist_dispatch({type:'PLAYLIST_SELECTED',payload:id})
   }
   //delete playlist
   const deleteplaylist=(id)=>{
     playlist_dispatch({type:'PLAYLIST_REMOVE',payload:id})
     toastdispatch({type:'DANGER',payload:"Playlist Deleted"})
   }

   /*------------------------------------------------------------*/

   const addwatchlist=(item)=>{
     watchlist_dispatch({type:"ADD_WATCHLIST",payload:item})
     toastdispatch({type:'SUCCESS',payload:"Video Added to watchlist"})
   }

   const removedwatchlist=(item)=>{
     watchlist_dispatch({type:"REMOVED_WATCHLIST",payload:item}) 
     toastdispatch({type:'DANGER',payload:"Video Removed from watchlist"})
   }

   /*----------------------------------------------------------*/

   const add_liked=(item)=>{
    like_dispatch({type:"LIKED",payload:item})
    toastdispatch({type:'SUCCESS',payload:"Liked"})
   }

   const removed_liked=(item)=>{
    like_dispatch({type:"DISLIKED",payload:item})
    toastdispatch({type:'SUCCESS',payload:"DisLiked"})
   }

  /*----------------------------------------------------------*/
  const add_history=(item)=>{
    history_dispatch({type:"ADD_HISTORY",payload:item})
  }

  const remove_history=(item)=>{
    history_dispatch({type:"REMOVED_HISTORY",payload:item})
    toastdispatch({type:'DANGER',payload:"Video Removed from historylist"})
  }

  const removed_all_history=(item)=>{
    history_dispatch({type:"DELETE_ALL_HISTORY",payload:item})
    toastdispatch({type:'DANGER',payload:"History Cleared"})
  }

  /*------------------*/ 
  const getEpisodeVideoId=(id)=>{
    episode_dispatch({type:"EPISODE_VIDEO_ID",payload:id})  
  }

    return(
        <VideoContext.Provider value={{
            toastList : toast.toastList,
            selectedMenu:menu.selectedMenu,
            getsingledata:singledata.getsingledata,
            //playlist
            playlistdata:playlist.playlistdata,
            PlaylistId:singleplalist.PlaylistId,
            //authroute
            authroute:route.authroute,
            //watchlist
            watchlist:watch.watchlist,
            //liked
            liked:like.liked,
            //history
            historylist:history.historylist,
            //episode id
            episode_video_Id:episode.episode_video_Id,
            //
            notedata : note.notedata,
            //
            uploadedvideo:uploaded.uploadedvideo,
            //
            viewcount:view.viewcount,
            //
            filter,filter_dispatch,
            toast,toastdispatch,
            //
            Continuewatchlist:continuelist.Continuewatchlist,

            menuselected,
            getSingleSelectedData,  
            deleteToast  ,
            selectAuthRoute,
            //playlist
            addTitlePlaylist ,
            addVideoPlaylist ,
            removeVideoPlaylsit,
            singlePlaylist ,
            deleteplaylist ,
            //watchlist
            addwatchlist,
            removedwatchlist,
            //liked
            add_liked,
            removed_liked,
            //history
            add_history,
            remove_history,
            removed_all_history,
            //episode_id
            getEpisodeVideoId,
            //note app
            AddNote,
            //uploadnew video
            Add_Uploaded_Video,
            //
            CountVideoView,
            getAllVideo,
            //
            getContinueWatchItem
        }}>
            { children }
        </VideoContext.Provider>
    )

}

export default VideoState;