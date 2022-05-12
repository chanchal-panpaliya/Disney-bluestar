import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { makeServer } from "./server";
import VideoState from './web-app/Context/video/VideoState';
import {AuthProvider} from "./web-app/Context/login/AuthContext";

// Call make Server
makeServer();

ReactDOM.render(
  <React.StrictMode>
    <AuthProvider>
      <VideoState> 
        <App />
      </VideoState>
    </AuthProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
