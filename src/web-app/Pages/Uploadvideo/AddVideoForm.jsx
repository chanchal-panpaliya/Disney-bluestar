import { useContext,useState } from "react"
import { addNewVideoHandler } from "web-app/Service/service"
import VideoContext from "web-app/Context/video/VideoContext"
import { useAuth } from "web-app/Context/login/AuthContext"
import "./Uploadvideo.css";


    

const AddVideoForm = ({modalClose}) =>{
    let {token,user} = useAuth()
    let {Add_Uploaded_Video} = useContext(VideoContext)
    const [episode,setepisode]=useState("")
    const [categoryName,setcategoryName]=useState("")
    const [categoryType,setcategoryType]=useState("")
    const [language,setlanguage]=useState("")
    const [duration,setduration]=useState("")
    const [year,setyear]=useState("")
    const [UA,setUA]=useState("")
    const [img_vertical,set_img_vertical]=useState("")
    const [img_Horizontal,set_img_Horizontal]=useState("")
    const [title,settitle]=useState("")
    const [description,setdescription]=useState("")
    const [rating,setrating]=useState("")
    const [videolink,setvideolink]=useState("")
    const [testdata,setestdata]=useState(false)

    const initialdata={
        episode_id:"",
        categoryName:"Movies",
        categoryType:"Comedy",
        language:"Hindi",
        duration:"2h 14m",
        year:"2006",
        UA:'13+',
        creator: "Ultra Movie Parlour",
        creatorLogo: {
        altText: "Ultra Movie Parlour Logo",
        url: "https://yt3.ggpht.com/ytc/AKedOLTMb29B2py-0b3-4qWuHBdVrI7oEkzgCOzI8rXa=s68-c-k-c0x00ffffff-no-rj",
        },
        thumbnail: {
        altText: "apna sapna money money Thumbnail",
        url: "https://m.media-amazon.com/images/M/MV5BMDE1ODQ1OWEtZGY1ZS00Njk3LTlmNGEtMWY1MmI3Y2JmOGU4XkEyXkFqcGdeQXVyNjQ2MjQ5NzM@._V1_FMjpg_UX1000_.jpg",
        land:"https://i.ytimg.com/vi/7dcWmEoq7tU/hq720.jpg?sqp=-oaymwEcCNAFEJQDSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLCsDME7DoITfOXgrX7cwcdpkLTg4g"
        },
        title: "Apna Sapna Money Money",
        description:"Satyabol, a devout Hindu, is against his daughter Shivani's relationship with Arjun, a Christian. Resultantly, Arjun asks his conniving cousin, Kishan, to help him unite with his lover.",
        cast:[],
        rating:"6.1/10",
        videoYTId: "7dcWmEoq7tU",
        uploadedOn: "March 08 2006",
        note:"",
        view:1
    }

      const datauploadhandle = () =>{

        let uploadvideo={
            episode_id: testdata?initialdata.episode_id:episode,
            categoryName: testdata?initialdata.categoryName:categoryName,
            categoryType: testdata?initialdata.categoryType:categoryType,
            language:testdata?initialdata.language:language,
            duration:testdata?initialdata.duration:duration,
            year:testdata?initialdata.year:year,
            UA:testdata?initialdata.UA : UA,
            creator: `${user.firstName || user.firstname}  ${user.lastName || user.lastname}`, 
            creatorLogo: {
              altText: "user Logo",
              url: "https://yt3.ggpht.com/cpajxwo_F6AznpciPGhZs7TLBJiwRM02BR67VkI_p0I99vR2VvQ2S6ZRm6zLoBf0y9voDqU92bs=s88-c-k-c0x00ffffff-no-rj",
            },
            thumbnail: {
              altText: "Thumbnail",
              url: testdata?initialdata.thumbnail.url:img_vertical,
              land: testdata?initialdata.thumbnail.land : img_Horizontal
            },
            title: testdata?initialdata.title:title,
            description:testdata?initialdata.description:description,
            cast:[],
            rating:testdata?initialdata.rating:rating,
            videoYTId:testdata?initialdata.videoYTId :videolink,
            uploadedOn: new Date(),
            note:"",
            view:1
          } 
          
          addNewVideoHandler(token,uploadvideo,Add_Uploaded_Video)
          modalClose()
       
      }

    return(
        <div className="upload-page-container">
             <h3 className="typography-padding-top-right-bottom-left"> Upload Video </h3>
            <div className="uploadvideo-container">
                <div>
                   <button className="header-button-login" onClick={()=>setestdata(!testdata)}> test data </button>
                </div>
            
                <div className="table --background"> 
                                <div className="row-table"> 
                                        <div className="column-table" style={{border:"none"}}>
                                            CategoryName :
                                        </div>
                                        <div className="column-table" style={{border:"none"}}>
                                            <select className='filter-select' value={testdata?initialdata.categoryName:categoryName} onChange={(e)=>setcategoryName(e.target.value)}>
                                                <option value="Movies"> Movies </option>
                                                <option value="Shows"> Shows </option>
                                                <option value="Songs"> Songs </option>
                                                <option value="Sports"> Sports </option>
                                                <option value="Kids"> Kids </option>
                                            </select>
                                        </div>
                                </div>
                                {
                                   categoryName==="Shows" ? 
                                   <div className="row-table"> 
                                        <div className="column-table" style={{border:"none"}}>
                                            <div className="flex-col">
                                                <label> Episode Number: </label>
                                                <b className="uploadedSmallText"> (eg episode 1) </b>
                                            </div>    
                                        </div>
                                        <div className="column-table" style={{border:"none"}}>
                                            <input type="text" name="episodenumber" placeholder="enter episode number" value={testdata?initialdata.episode_id:episode} onChange={(e)=>setepisode(e.target.value)}/>
                                        </div>
                                    </div> 
                                   :
                                   null
                                }

                                <div className="row-table"> 
                                        <div className="column-table" style={{border:"none"}}>
                                            <div className="flex-col">
                                                 <label> Category Type : </label>
                                                 <b className="uploadedSmallText"> (eg Comedy)</b>
                                            </div> 
                                        </div>
                                        <div className="column-table" style={{border:"none"}}>
                                        <input type="text" name="categoryType" placeholder="enter categoryType" value={testdata?initialdata.categoryType:categoryType} onChange={(e)=>setcategoryType(e.target.value)}/>
                                        </div>
                                </div>
                                <div className="row-table"> 
                                        <div className="column-table" style={{border:"none"}}>
                                            <div className="flex-col">
                                                <label> Language: </label>
                                                <b className="uploadedSmallText"> (eg hindi) </b>
                                            </div>
                                        </div>
                                        <div className="column-table" style={{border:"none"}}>
                                            <input type="text" name="language" placeholder="enter language" value={testdata?initialdata.language:language} onChange={(e)=>setlanguage(e.target.value)}/>
                                        </div>
                                </div>
                                <div className="row-table"> 
                                        <div className="column-table" style={{border:"none"}}>
                                            <div className="flex-col">
                                                <label> Duration : </label>
                                                <b className="uploadedSmallText"> (eg 2h 30min) </b>
                                            </div>
                                        </div>
                                        <div className="column-table" style={{border:"none"}}>
                                            <input type="text" name="duration" placeholder="enter duration" value={testdata?initialdata.duration:duration} onChange={(e)=>setduration(e.target.value)}/>
                                        </div>
                                </div>
                                <div className="row-table"> 
                                        <div className="column-table" style={{border:"none"}}>
                                            <div className="flex-col">
                                                <label>Year :</label>
                                                <b className="uploadedSmallText">(eg 2021)</b>
                                            </div>
                                        </div>
                                        <div className="column-table" style={{border:"none"}}>
                                            <input type="text" name="year" placeholder="enter year" value={testdata?initialdata.year:year} onChange={(e)=>setyear(e.target.value)}/>
                                        </div>
                                </div>
                                <div className="row-table"> 
                                        <div className="column-table" style={{border:"none"}}>
                                            <div className="flex-col">
                                                <label> UA : </label>
                                                <b className="uploadedSmallText"> (eg 12+) </b>
                                            </div>
                                        </div>
                                        <div className="column-table" style={{border:"none"}}>
                                            <input type="text" name="UA" placeholder="UA" value={testdata?initialdata.UA : UA} onChange={(e)=>setUA(e.target.value)}/>
                                        </div>
                                </div>
                                <div className="row-table"> 
                                        <div className="column-table" style={{border:"none"}}>
                                            <div className="flex-col">
                                                <label> Thumbnail - Vertical </label>
                                                <b className="uploadedSmallText"> Use imdb - Image vertical(poster) only</b>
                                            </div>
                                        </div>
                                        <div className="column-table" style={{border:"none"}}>
                                            <input type="text" name="img_vertical" placeholder="peast imdb vertical images link" value={testdata?initialdata.thumbnail.url:img_vertical} onChange={(e)=>set_img_vertical(e.target.value)}/>
                                        </div>
                                </div>
                                <div className="row-table"> 
                                        <div className="column-table" style={{border:"none"}}>  
                                            <div className="flex-col">
                                                <label> Thumbnail (imdb - Image vertical(poster)):(preview) </label>
                                                <b className="uploadedSmallText"> </b>
                                            </div>
                                        </div>
                                        <div className="column-table" style={{border:"none"}}>
                                        <img style={{width:'100px'}} src={testdata?initialdata.thumbnail.url:img_vertical} className="video-card-image"/>
                                        </div>
                                </div>
                                <div className="row-table"> 
                                        <div className="column-table" style={{border:"none"}}>
                                             
                                            <div className="flex-col">
                                                <label> Thumbnail - Horizontal Image</label>
                                                <b className="uploadedSmallText"> Use youtube movie banner Horizontal Image</b>
                                            </div>
                                        </div>
                                        <div className="column-table" style={{border:"none"}}>
                                            <input type="text" name="img_Horizontal" placeholder="peast imdb full screen images link" value={testdata?initialdata.thumbnail.land : img_Horizontal} onChange={(e)=>set_img_Horizontal(e.target.value)}/>
                                        </div>
                                </div>
                                <div className="row-table"> 
                                        <div className="column-table" style={{border:"none"}}>
                                            <div className="flex-col">
                                                <label> Thumbnail (youtube banner Horizontal Image):(preview) </label>
                                                <b className="uploadedSmallText"> </b>
                                            </div>
                                        </div>
                                        <div className="column-table" style={{border:"none"}}>
                                            <img style={{width:'100px'}} src={testdata?initialdata.thumbnail.land : img_Horizontal} className="video-card-image"/>
                                        </div>
                                </div>
                                <div className="row-table"> 
                                        <div className="column-table" style={{border:"none"}}>
                                           <div className="flex-col">
                                             <label> Title : </label> 
                                             <b className="uploadedSmallText"> Note: for "show" , title name should be constant </b>
                                            </div>
                                        </div>
                                        <div className="column-table" style={{border:"none"}}>
                                            <input type="text" name="title" value={testdata?initialdata.title:title} onChange={(e)=>settitle(e.target.value)}/>
                                        </div>
                                </div>
                                <div className="row-table"> 
                                        <div className="column-table" style={{border:"none"}}>
                                            Description :
                                        </div>
                                        <div className="column-table" style={{border:"none"}}>
                                            <input type="text" name="description" value={testdata?initialdata.description:description} onChange={(e)=>setdescription(e.target.value)} />
                                        </div>
                                </div>
                                <div className="row-table"> 
                                        <div className="column-table" style={{border:"none"}}>
                                            <div className="flex-col">
                                                <label> Rating : </label>
                                                <b className="uploadedSmallText">(6.1/10)</b>
                                            </div>
                                        </div>
                                        <div className="column-table" style={{border:"none"}}>
                                            <input type="text" name="rating" placeholder="6/10" value={testdata?initialdata.rating:rating} onChange={(e)=>setrating(e.target.value)}/>
                                        </div>
                                </div>
                                <div className="row-table"> 
                                        <div className="column-table" style={{border:"none"}}>
                                            <div className="flex-col">
                                                <label> Youtube Video Link : </label>
                                                <b className="uploadedSmallText"> (eg:DloIQG73TMk) </b>
                                            </div>
                                        </div>
                                        <div className="column-table" style={{border:"none"}}>
                                            <input type="text" name="videolink" placeholder="eg. REqFOV2A7sI" value={testdata?initialdata.videoYTId :videolink} onChange={(e)=>setvideolink(e.target.value)}/>
                                        </div>
                                </div>
                                <div className="row-table"> 
                                        <div className="column-table" style={{border:"none"}}>
                                            Youtube Video Link (Preview):
                                        </div>
                                        <div className="column-table" style={{border:"none"}}>
                                                <iframe
                                                width="100px" 
                                                height="50px"
                                                src={`https://www.youtube.com/embed/${testdata?initialdata.videoYTId :videolink}`} 
                                                title="YouTube video player" frameBorder="0" 
                                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen>
                                                </iframe>  
                                        </div>
                                </div>

                </div>
                     <div>
                        <button className="header-button-login" onClick={datauploadhandle}> upload </button>
                     </div>                 
            </div>
           
        </div>
    )
}

export default AddVideoForm 