import axios from "axios";

//all data
export async function fetchAllVideoData() {
    try {
       let data = [];
       data = await axios.get("/api/videos").then(res=> res.data.videos)
    
       return data
      }catch (error) {
        console.log(error);
    }
}


//for single video
export async function fetch_single_video(id) {
    try {
       let data = "";
        data = await axios.get(`${"/api/video/"+id}`).then(res=>{ return res.data.video})
       return data
      }catch (error) {
        console.log(error);
    }
}

//registration
export const handleRegistration = async (e,email,password,firstname,lastname,termsAndConditions,navigator,modalClose,setError,toastdispatch) =>{
    e.preventDefault();
    try {
         await axios.post("/api/auth/signup",{
            email,password,firstname,lastname,termsAndConditions
         }).then((res) => {
          
            if(res.status === 200 || res.status === 201){
                toastdispatch({type:'SUCCESS',payload:"Registered and LOGIN SUCCESSFULL"})
                localStorage.setItem("token", res.data.encodedToken );
                localStorage.setItem("user", JSON.stringify(res.data.createdUser));
                setError("Registered successfully")
                modalClose()
                window.location.reload()
                navigator('/')
                
            }
         }).catch((error)=>{
            if(error.response.status === 422){
               toastdispatch({type:'WARNING',payload:"email id already exist"})
               setError("email id already exist")
               let time = setTimeout(()=>{
                   setError("")
                 },1000)
                 return()=>clearTimeout(time)
            }
        });
               
          } catch (error) {
              toastdispatch({type:'DANGER',payload:"Not able to registered !! check"})
              setError("Not able to registered")
              let time = setTimeout(()=>{
                setError("")
              },1000)
              return()=>clearTimeout(time)
        }
}

//login
export const handleLogin = async (e,email,password,navigator,modalClose,setError,setToken,setUser,toastdispatch) => {
    e.preventDefault();
    
    try {
        await axios.post('/api/auth/login',{
            email,password 
        }).then((res)=>{
               console.log("res",res)
            if(res.status === 200){
                if(res.data){
                    
                    localStorage.setItem("token", res.data.encodedToken );
                    localStorage.setItem("user", JSON.stringify(res.data.foundUser));
                    modalClose()
                    window.location.reload()
                    navigator('/')
                    toastdispatch({type:'SUCCESS',payload:"LOGIN SUCCESSFULL"})
                } 
            }else{
                toastdispatch({type:'DANGER',payload:"login Failed ! please try again"})
                setError("login Failed ! please try again") 
            }

         });
      } catch (error) {
          toastdispatch({type:'DANGER',payload:"login Failed ! please try again"})
          setError("login Failed ! please try again")
      }
};

//add playlist name
export const handler_addPlayListName = async (e,token,addTitlePlaylist,playlistName) => {
    e.preventDefault()

            try {
                const res = await axios.post('/api/user/playlists', {
                    playlist: { title: playlistName, description: "" }
                },
                    {
                        headers: {
                            authorization: token,
                        },
                    })
                    addTitlePlaylist(res.data.playlists)
            
            } catch (error) {
                console.log(error)
            }

}

// add video playlist

export const handler_addVideoPlaylist = async (e,palylist_id,data,token,addVideoPlaylist)=>{
 
        try {
            const res = await axios.post(
                `/api/user/playlists/${palylist_id}`,
                {
                    video: {...data}
                },
                {
                    headers: {
                        authorization: token,
                    },
                }
            );
            addVideoPlaylist(res.data.playlist)
        } catch (error) {
            console.log(error)
        }

}

//remove video playlist
export const handler_removedVideoPlaylist = async(e,palylist_id,videoId,token,removeVideoPlaylsit)=>{
        console.log(palylist_id,videoId,token)
        try{
            const res=await axios.delete(`/api/user/playlists/${palylist_id}/${videoId}`,
            {
                headers: {
                    authorization: token,
                },
            })
            removeVideoPlaylsit(res.data.playlist)
    
        }catch(error){
            console.log(error)
        }

}

//get palylist data
export const fetchAllPlaylistData = async(token)=>{
    try{
        let data =[]
        data = await axios.get(`/api/user/playlists`,
        {
            headers: {
                authorization: token,
            },
        })
        return data

    }catch(error){
        console.log(error)
    }
}

//delete playlist
export const handler_deletePlaylist=async (e,playlistId,token,deleteplaylist)=>{
    e.preventDefault()

        try{
            const res=await axios.delete(`/api/user/playlists/${playlistId}`,{
                headers: {
                    authorization: token,
                }, 
            })

            deleteplaylist(res.data.playlists)
    
        }catch(error){
            console.log(error)
        }
}

//add watch later
export const handler_addWatchLater = async (token, addwatchlist, data) => {
        try {
            const res = await axios.post('/api/user/watchlater',
                { video: data },
                {
                    headers: {
                        authorization: token
                    }
                },
            )
            addwatchlist(res.data.watchlater)

        } catch (error) {
            console.log(error)
        }
}

//removed watch later
export const handler_removeWatchLater = async (token, removedwatchlist, id) => {
        try {
            const res = await axios.delete(`/api/user/watchlater/${id}`, {
                headers: {
                    authorization: token
                }
            },
            )
            removedwatchlist(res.data.watchlater)
        } catch (error) {
            console.log(error)
        }
}

//all watch later
export const fetchAllWatchlaterData = async(token)=>{
    try{
        let data =[]
        data = await axios.get(`/api/user/watchlater`,
        {
            headers: {
                authorization: token,
            },
        })
        return data

    }catch(error){
        console.log(error)
    }
}

//liked
export const addVideoToLikedVideos = async (token, add_liked,data) => {
        try {
            const res = await axios.post('/api/user/likes',
                { video: data },
                {
                    headers: {
                        authorization: token
                    }
                },
            )
            add_liked(res.data.likes)

        
        } catch (error) {
            console.log(error)
        }
   
}

//unliked
export const removeFromlikedVideos=async(token, removed_liked, id)=>{
    try{
        const res=await axios.delete(`/api/user/likes/${id}`,{
            headers:{
                authorization:token
            }
        })
        removed_liked(res.data.likes)
    }catch(error){
        console.log(error)
    }
}

//all like 
export const fetchAllLikedData = async(token)=>{
    try{
        let data =[]
        data = await axios.get(`/api/user/likes`,
        {
            headers: {
                authorization: token,
            },
        })
        return data

    }catch(error){
        console.log(error)
    }
}

//history data
export const fetchAllHistoryData = async(token)=>{
    try{
        let data =[]
        data = await axios.get(`/api/user/history`,
        {
            headers: {
                authorization: token,
            },
        })
        return data

    }catch(error){
        console.log(error)
    }
}


export const handler_addVideoHistory = async (token, video, add_history) => {
      try {
        const res = await axios.post(
          "/api/user/history",
          { video: video },
          {
            headers: {
              authorization: token,
            },
          }
        );
        add_history(res.data.history)
      } catch (error) {
        console.log(error);
      }
  };
  
  export const handler_removeHistory = async (token, remove_history,Id) => {
    try {
      const res = await axios.delete(`/api/user/history/${Id}`, {
        headers: {
          authorization: token,
        },
      });
      remove_history(res.data.history)
    } catch (error) {
      console.log(error);
    }
  };
  
  export const handler_removeallHistory = async (token,removed_all_historys) => {
    try {
      const res = await axios.delete(`/api/user/history/all`, {
        headers: {
          authorization: token,
        },
      });
      removed_all_historys(res.data.history)
    } catch (error) {
      console.log(error);
    }
  };


//show data
export async function fetch_Show_Data() {
    try {
       let data = [];
      data = await axios.get("/api/videos").then(res=> res.data.videos)
       return data.filter(item=> item.categoryName === "Shows")
      }catch (error) {
        console.log(error);
    }
}

//movie data
export async function fetch_movie_Data() {
    try {
       let data = [];
      data = await axios.get("/api/videos").then(res=> res.data.videos)
       return data.filter(item=> item.categoryName === "Movies")
      }catch (error) {
        console.log(error);
    }
}


//note--> add

export function addNoteService( token, note ,toastdispatch) {

    axios.post(
        "/api/user/notes",
        { note },
        {
            headers: { authorization: token },
        }
    ).then((res)=>{
        toastdispatch({type:'SUCCESS',payload:"NOTE ADDED"})
    });
}

// delete

export function deleteNoteService( token, noteId ,toastdispatch) {
    return axios.delete(`/api/user/notes/${noteId}`, {
        headers: { authorization: token },
    }).then(()=>{
        toastdispatch({type:'DANGER',payload:"NOTE DELETED"})
    });
}

//edit

export function editNoteService( token, note ,toastdispatch) {
    
    return axios.post(
        `/api/user/notes/${note._id}`,
        { note },
        {
            headers: { authorization: token },
        }
    ).then(()=>{
        toastdispatch({type:'SUCCESS',payload:"NOTE EDITED"})
    })
    ;
}

//
export function getNotesService(token, videoId) {
  return axios.get(`/api/user/notes/${videoId}`, {
        headers: { authorization: token },
    })
}

//



export function addNewVideoHandler( token, uploadvideo ,Add_Uploaded_Video) {
    axios.post(
        "/api/user/videos",
        { uploadvideo },
        {
            headers: { authorization: token },
        }
    ).then((res)=>{
        console.log(res)
        Add_Uploaded_Video(res.data.uploadedvideo)
    });       
}






