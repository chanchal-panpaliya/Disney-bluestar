//react
import { useContext ,useEffect } from 'react';
//css
import "./Toast.css";
//context
import VideoContext from '../../Context/video/VideoContext';

const Toast = (props) =>{
    const {toastList,deleteToast} = useContext(VideoContext)

    useEffect(() => {
      const interval = setInterval(() => {
        if(toastList.length) {
          deleteToast(toastList[0].id);
        }
      }, 2000);
  
      return () => {
        clearInterval(interval);
      }
    }, [toastList, deleteToast]);

    return(
      <div className="toast-container --background">
      {
        props.data.map((toast, i) => (
          <div
            key={i}
            className="toast-notification --background"
            style={{ background: toast.backgroundColor }}
          >
            <button onClick={() => deleteToast(toast.id)}>X</button>
            <div className='--background'>
              <p className="toast-description --background">{toast.description}</p>
            </div>
          </div>
        ))
      }
    </div>
    )
}

export {Toast}