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

//redux
//registration
export const Registration = async (e,email,password,firstname,lastname,termsAndConditions,navigator,modalClose,setError,toastdispatch) =>{
    e.preventDefault();
    try {
         const res = await axios.post("/api/auth/signup",{
            email,password,firstname,lastname,termsAndConditions
         }).then((res) => {
          
            if(res.status === 200 || res.status === 201){
                toastdispatch({type:'SUCCESS',payload:"Registered and LOGIN SUCCESSFULL"})
                setError("Registered successfully")
                modalClose()
                return res
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
        
        return res
        
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
export const Login = async (e,email,password,navigator,modalClose,setError,toastdispatch) => {
    e.preventDefault();
    try {
        const res = await axios.post('/api/auth/login',{
            email,password 
        }).then((res)=>{
            if(res.status === 200){
                if(res.data){
                    toastdispatch({type:'SUCCESS',payload:"LOGIN SUCCESSFULL"})
                    modalClose()
                    return res
                } 
            }else{
                toastdispatch({type:'DANGER',payload:"login Failed ! please try again"})
                setError("login Failed ! please try again") 
            }
         });
         return res
      } catch (error) {
          toastdispatch({type:'DANGER',payload:"login Failed ! please try again"})
          setError("login Failed ! please try again")
      }
};


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

//add playlist name
export const addPlayListName = async (e,token,playlistName,toastdispatch) => {
    e.preventDefault()
            try {
                const res = await axios.post('/api/user/playlists', {
                    playlist: { title: playlistName, description: "" }
                },
                {
                        headers: {
                            authorization: token,
                        },
                }).then((res)=>{
                    toastdispatch({type:'SUCCESS',payload:"Playlist Created"})
                    return res.data.playlists
                })
                return res
            } catch (error) {
                console.log(error)
            }

}


// add video playlist
export const addVideoPlaylist = async (e,palylist_id,data,token,toastdispatch)=>{
 
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
            ).then((res)=>{
                toastdispatch({type:'SUCCESS',payload:"Video Added to palylist"})
                return res.data.playlist
            });
            return res
        } catch (error) {
            console.log(error)
        }

}

//remove video playlist
export const removedVideoPlaylist = async(e,palylist_id,videoId,token,toastdispatch)=>{       
        try{
            const res=await axios.delete(`/api/user/playlists/${palylist_id}/${videoId}`,
            {
                headers: {
                    authorization: token,
                },
            }).then((res)=>{
                toastdispatch({type:'DANGER',payload:"Video removed from Playlist"})
                return res.data.playlist
            })
            return res
    
        }catch(error){
            console.log(error)
        }

}


//delete playlist
export const deletePlaylist=async (e,playlistId,token,toastdispatch)=>{
    e.preventDefault()
        try{
            const res=await axios.delete(`/api/user/playlists/${playlistId}`,{
                headers: {
                    authorization: token,
                }, 
            }).then((res)=>{
                toastdispatch({type:'DANGER',payload:"Playlist Deleted"})
                return res.data.playlists
            })
           return res
        }catch(error){
            console.log(error)
        }
}


//add watch later
export const addWatchLater = async (token,data,toastdispatch) => {
    try {
        const res = await axios.post('/api/user/watchlater',
            { video: data },
            {
                headers: {
                    authorization: token
                }
            },
        ).then((res)=>{
            toastdispatch({type:'SUCCESS',payload:"Video Added to watchlist"})
            return res.data.watchlater
        })
        return res
    } catch (error) {
        console.log(error)
    }
}

//removed watch later
export const removeWatchLater = async (token,id,toastdispatch) => {
    try {
        const res = await axios.delete(`/api/user/watchlater/${id}`, {
            headers: {
                authorization: token
            }
        },
        ).then((res)=>{
            toastdispatch({type:'DANGER',payload:"Video Removed from watchlist"})
            return res.data.watchlater
        })
        return res
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
export const addVideoToLikedVideos = async (token,data,toastdispatch) => {
    try {
        const res = await axios.post('/api/user/likes',
            { video: data },
            {
                headers: {
                    authorization: token
                }
            },
        ).then((res)=>{
            toastdispatch({type:'SUCCESS',payload:"Liked"})
            return res.data.likes
        })
        return res
    } catch (error) {
        console.log(error)
    }
}

//unliked
export const removeFromlikedVideos=async(token,id,toastdispatch)=>{
try{
    const res=await axios.delete(`/api/user/likes/${id}`,{
        headers:{
            authorization:token
        }
    }).then((res)=>{
        toastdispatch({type:'SUCCESS',payload:"DisLiked"})
        return res.data.likes
    })
   return res
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


export const AllHistoryData = async(token)=>{
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


export const addVideoHistory = async (token,video) => {
      try {
        let res =[]
        res = await axios.post(
          "/api/user/history",
          { video: video },
          {
            headers: {
              authorization: token,
            },
          }
        ).then((res)=>res.data.history);
        return res
      } catch (error) {
        console.log(error);
      }
  };
  
  export const removeHistory = async (token,Id,toastdispatch) => {
    try {
      const res = await axios.delete(`/api/user/history/${Id}`, {
        headers: {
          authorization: token,
        },
      }).then((res)=>{
      toastdispatch({type:'DANGER',payload:"Video Removed from historylist"})
      return res.data.history
      }
      );
    return res
    } catch (error) {
      console.log(error);
    }
  };
  
  export const removeallHistory = async (token,toastdispatch) => {
    try {
      const res = await axios.delete(`/api/user/history/all`, {
        headers: {
          authorization: token,
        },
      }).then((res)=>{
        toastdispatch({type:'DANGER',payload:"Historylist Cleared"})
        return res.data.history
      });
    return res
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
export function getNotesService(token, videoId) {
    const res = axios.get(`/api/user/notes/${videoId}`, {
          headers: { authorization: token },
      })
    return res
}

export function addNoteService( token, note ,toastdispatch) {
   const res = axios.post(
        "/api/user/notes",
        { note },
        {
            headers: { authorization: token },
        }
    ).then((res)=>{
        toastdispatch({type:'SUCCESS',payload:"NOTE ADDED"})
        return res.data.notes
    });
    return res
}

// delete
export function deleteNoteService( token, noteId ,toastdispatch) {
    const res = axios.delete(`/api/user/notes/${noteId}`, {
        headers: { authorization: token },
    }).then((res)=>{
        toastdispatch({type:'DANGER',payload:"NOTE DELETED"})
        return res.data.notes
    });

    return res
}

//edit
export function editNoteService( token, note ,toastdispatch) {
    const res = axios.post(
        `/api/user/notes/${note._id}`,
        { note },
        {
            headers: { authorization: token },
        }
    ).then((res)=>{
        toastdispatch({type:'SUCCESS',payload:"NOTE EDITED"})
        return res.data.notes
    });

    return res
}

//
export function addNewVideoHandler( token,uploadvideo,toastdispatch) {
    let res = axios.post(
        "/api/user/videos",
        { uploadvideo },
        {
            headers: { authorization: token },
        }
    ).then((res)=>{
        toastdispatch({type:'SUCCESS',payload:"Video Uplaoded"})
        return res.data.uploadedvideo
    }); 
    return res      
}






