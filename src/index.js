import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { makeServer } from "./server";
import VideoState from './web-app/Context/video/VideoState';
//redux
import { store } from './web-app/Redux/Store/store'
import { Provider } from 'react-redux'

// Call make Server
makeServer();

ReactDOM.render(
  <React.StrictMode>
     <Provider store={store}> 
        <VideoState> 
          <App />
        </VideoState>
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);
