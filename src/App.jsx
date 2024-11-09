// import * as React from "react";
// import * as ReactDOM from "react-dom/client";
import "./index.css";
// import AppContext from "./context/AppContext";
import MainPage from "./components/HomePage/MainPage";
import CreateNote from "./components/Notes/CreateNote";
import Sidebar from "./components/Notes/Sidebar";

function App(){
    return(
        <div className="main">
        <MainPage />
        <Sidebar />
        <CreateNote />
        </div>
    )
}

export default App;

