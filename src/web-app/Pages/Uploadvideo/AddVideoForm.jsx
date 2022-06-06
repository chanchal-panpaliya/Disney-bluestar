import { useContext,useState } from "react"
import VideoContext from "web-app/Context/video/VideoContext"
import "./Uploadvideo.css";
//redux
import { useDispatch, useSelector } from "react-redux";
import { uploadVideoData } from '../../Redux/Reducer/uploadSlice';
import blue_logo from '../../img/blue.png';

const testCredentials = {
    episode_id:"",
    categoryName:"Movies",
    categoryType:"Comedy",
    language:"Hindi",
    duration:"2h 14m",
    year:"2006",
    UA:'13+',
    thumbnail_url: "https://m.media-amazon.com/images/M/MV5BMDE1ODQ1OWEtZGY1ZS00Njk3LTlmNGEtMWY1MmI3Y2JmOGU4XkEyXkFqcGdeQXVyNjQ2MjQ5NzM@._V1_FMjpg_UX1000_.jpg",
    thumbnail_land:"https://i.ytimg.com/vi/7dcWmEoq7tU/hq720.jpg?sqp=-oaymwEcCNAFEJQDSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLCsDME7DoITfOXgrX7cwcdpkLTg4g",
    title: "Apna Sapna Money Money",
    description:"Satyabol, a devout Hindu, is against his daughter Shivani's relationship with Arjun, a Christian. Resultantly, Arjun asks his conniving cousin, Kishan, to help him unite with his lover.",
    rating:"6.1/10",
    videoYTId: "7dcWmEoq7tU",
  };

const formInitialState={
    episode_id:"",
    categoryName:"",
    categoryType:"",
    language:"",
    duration:"",
    year:"",
    UA:'',
    thumbnail_url: "",
    thumbnail_land:"",
    title: "",
    description:"",
    rating:"",
    videoYTId: "",
}

const AddVideoForm = ({modalClose}) =>{
    let {toastdispatch} = useContext(VideoContext)

    const [formData, setFormData] = useState(formInitialState);
    const { episode_id,categoryName,categoryType,language,duration,year,UA,thumbnail_url,thumbnail_land,title,description,rating,videoYTId} = formData;

    const handleInput = (e) =>
    setFormData((prevFormData) => ({
      ...prevFormData,
      [e.target.name]: e.target.value,
    }));
    //
    const { token , user } = useSelector((store) => store.authentication);
    const dispatch = useDispatch();

      const datauploadhandle = () =>{
  
        let uploadvideo={
            episode_id: episode_id,
            categoryName: categoryName,
            categoryType: categoryType,
            language:language,
            duration:duration,
            year:year,
            UA:UA,
            creator: `${user.firstName || user.firstname}  ${user.lastName || user.lastname}`, 
            creatorLogo: {
              altText: "user Logo",
              url: blue_logo,
            },
            thumbnail: {
              altText: "Thumbnail",
              url: thumbnail_url,
              land: thumbnail_land 
            },
            title: title,
            description: description,
            cast:[],
            rating:rating,
            videoYTId: videoYTId,
            uploadedOn: new Date(),
            note:"",
            view: 1
          } 

        dispatch(uploadVideoData([token,uploadvideo,toastdispatch]))
        modalClose()
      }

    return(
        <div className="upload-page-container">
             <h3 className="typography-padding-top-right-bottom-left"> Upload Video </h3>
            <div className="uploadvideo-container">
                <div>
                   <button className="header-button-login" onClick={() => setFormData(testCredentials)}>  test data </button>
                </div>
            
                <div className="table --background"> 
                                <div className="row-table"> 
                                        <div className="column-table" style={{border:"none"}}>
                                            CategoryName :
                                        </div>
                                        <div className="column-table" style={{border:"none"}}>
                                            <select className='filter-select' name="categoryName" value={categoryName} onChange={handleInput} >
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
                                            <input type="text" name="episode_id" placeholder="enter episode number" value={episode_id} onChange={handleInput}/>
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
                                        <input type="text" name="categoryType" placeholder="enter categoryType" value={categoryType} onChange={handleInput}/>
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
                                            <input type="text" name="language" placeholder="enter language" value={language} onChange={handleInput}/>
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
                                            <input type="text" name="duration" placeholder="enter duration" value={duration} onChange={handleInput}/>
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
                                            <input type="text" name="year" placeholder="enter year" value={year} onChange={handleInput}/>
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
                                            <input type="text" name="UA" placeholder="UA" value={UA} onChange={handleInput}/>
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
                                            <input type="text" name="thumbnail_url" placeholder="peast imdb vertical images link" value={thumbnail_url} onChange={handleInput}/>
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
                                        <img style={{width:'100px'}} src={thumbnail_url} className="video-card-image"/>
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
                                            <input type="text" name="thumbnail_land" placeholder="peast imdb full screen images link" value={thumbnail_land} onChange={handleInput}/>
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
                                            <img style={{width:'100px'}} src={thumbnail_land} className="video-card-image"/>
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
                                            <input type="text" name="title" value={title}  onChange={handleInput}/>
                                        </div>
                                </div>
                                <div className="row-table"> 
                                        <div className="column-table" style={{border:"none"}}>
                                            Description :
                                        </div>
                                        <div className="column-table" style={{border:"none"}}>
                                            <input type="text" name="description" value={description} onChange={handleInput} />
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
                                            <input type="text" name="rating" placeholder="6/10" value={rating} onChange={handleInput}/>
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
                                            <input type="text" name="videoYTId" placeholder="eg. REqFOV2A7sI" value={videoYTId} onChange={handleInput}/>
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
                                                src={`https://www.youtube.com/embed/${videoYTId}`} 
                                                title="YouTube video player" frameBorder="0" 
                                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen>
                                                </iframe>  
                                        </div>
                                </div>

                </div>
                     <div>

                       {
                             categoryName && categoryType && language && duration && year && UA && thumbnail_url && thumbnail_land && title && description && rating && videoYTId && (
                                 <button className="header-button-login" onClick={datauploadhandle}> upload </button>
                            )
                       }

                       
                     </div>                 
            </div>
           
        </div>
    )
}

export default AddVideoForm 