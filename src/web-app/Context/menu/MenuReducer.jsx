export const MenuReducer = (state,action) =>{
    switch(action.type){
        case "MENU_SELECTED" :{
            localStorage.setItem('VIDEO_MENU_SELECTED', action.payload);
            return {...state,selectedMenu : action.payload}
        }
        default :
        return state
     }
}


export const SingleProductData = (state,action) =>{
     switch(action.type){
         case "DATA_SELECTED" :{
              return {...state,getsingledata : action.payload}
         }
        
         default :
         return state
      }
 }


 export const SinglePlaylistId=(state,action)=>{
    switch(action.type){
        case "PLAYLIST_SELECTED" :{
             return {...state,PlaylistId : action.payload}
        }
       
        default :
        return state
     }
 }

 export const Authroute=(state,action)=>{
    switch(action.type){
        case "AUTH_ROUTE" :{
             return {...state,authroute : action.payload}
        }
       
        default :
        return state
     }
 }

 export const EpisodeVideoId=(state,action)=>{
    switch(action.type){
        case "EPISODE_VIDEO_ID" :{
             return {...state,episode_video_Id : action.payload}
        }
       
        default :
        return state
     }
 }
 
export default {MenuReducer,SingleProductData,SinglePlaylistId,Authroute,EpisodeVideoId};