import { useReducer ,useEffect } from "react";
import VideoContext from './VideoContext';
import ToastReducer from '../Toast/ToastReducer';
import {MenuReducer,SingleProductData,SinglePlaylistId,Authroute,EpisodeVideoId}from '../menu/MenuReducer';

import FilterReducer from "../Filter/FilterReducer";
import ContinuewatchReducer from "../others/Continuewatch";
import {videos} from "../../../backend/db/videos";

import {ViewCountreducer} from "../others/Viewcount";

// redux
import { useSelector } from "react-redux";

const VideoState =({ children })=>{
    const [toast,toastdispatch] = useReducer(ToastReducer,{showToast:false , toastList : []})
    //menu selected
    const [menu,selectedmenudispatch] = useReducer(MenuReducer,{selectedMenu:""})
    // getsingle data
    const [singledata,singledatadispatch] = useReducer(SingleProductData,{getsingledata:""})
    
    //single playlist
    const [singleplalist,singleplaylist_dispatch] = useReducer(SinglePlaylistId,{PlaylistId:""})
    //auth route
    const [route,route_dispatch]=useReducer(Authroute,{authroute:"login"})
    //episode id
    const [episode,episode_dispatch]=useReducer(EpisodeVideoId,{episode_video_Id:""})
    //filter
    const [filter,filter_dispatch]=useReducer(FilterReducer,{categoryType:"All",sort:""})
    //ViewCountreducer
    const [view,view_dispatch]=useReducer(ViewCountreducer,{viewcount:videos})
    //continue watch list
    const [continuelist,continue_dispatch]=useReducer(ContinuewatchReducer,{Continuewatchlist:[]})
    //redux upload video
    const { uploadlist } = useSelector((store) => store.upload);

    useEffect(()=>{
        if(uploadlist.length>0){
          view.viewcount.push(...uploadlist)
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

    //singledata
    const getSingleSelectedData=(data)=>{
        singledatadispatch({type:"DATA_SELECTED",payload:data})
    }
    //menu selected
    const menuselected=(name)=>{
        selectedmenudispatch({type:"MENU_SELECTED",payload:name})
    }

     //single playlist
     const singlePlaylist=(id)=>{
      singleplaylist_dispatch({type:'PLAYLIST_SELECTED',payload:id})
     } 
 
   //delete toast
   const deleteToast = (id) =>{
    toastdispatch({type:'REMOVE_TOAST',payload:id})  
   }

   //auth route
   const selectAuthRoute=(item)=>{
    route_dispatch({type:'AUTH_ROUTE',payload:item})   
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
            //single playlist
            PlaylistId:singleplalist.PlaylistId,
            //authroute
            authroute:route.authroute,
            //episode id
            episode_video_Id:episode.episode_video_Id,
            //
            viewcount:view.viewcount,
            //
            filter,filter_dispatch,
            toast,toastdispatch,
            //
            Continuewatchlist:continuelist.Continuewatchlist,
            //
            menuselected,
            getSingleSelectedData,  
            deleteToast  ,
            selectAuthRoute,
            getEpisodeVideoId,
            singlePlaylist,
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