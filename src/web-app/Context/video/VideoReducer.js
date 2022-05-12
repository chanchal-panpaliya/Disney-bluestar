
const VideoReducer=(state,action)=>{

    switch(action.type){  

        case 'PLAYLIST_NAME':{
            return{...state,playlistdata : action.payload}
        }

        case 'PLAYLIST_ADD_VIDEO':{
             let update = state.playlistdata.map(playlist=>playlist._id===action.payload._id ? action.payload:playlist)
            return{...state,playlistdata:update}
        }

        case 'PLAYLIST_REMOVE_VIDEO':{
            let update = state.playlistdata.map(playlist=>playlist._id===action.payload._id ? action.payload:playlist)
            return{...state,playlistdata:update}
        }

        case 'PLAYLIST_REMOVE':{
            let update = state.playlistdata.map(playlist=>playlist._id===action.payload._id ? action.payload:playlist)
            return{...state,playlistdata:update}  
        }

        default :
        return state
    }
}

export default VideoReducer;

