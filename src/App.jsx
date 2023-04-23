import ImagePost from "./Components/ImagePost"
import data from "./Components/exampledata";

import logo from "./Components/pic/logo.png"
import doglogo from "./Components/pic/dog_logo.svg"
import { useState } from "react";

export default function App(){
    const [routes,setRoutes] = useState([true,false,false]);

    //Route Handler to set the active Page
    function handleToggleRoutes(path){
        let toggleIndex;
        
        path === "about" && (toggleIndex = 0);
        path === "pet" && (toggleIndex = 1);

        if(routes[toggleIndex] === true) return;
        const nextRoutes = routes.map((route,index) => {
            if(index === toggleIndex){
                return !route; 
            }
            return false;
        })
        setRoutes(nextRoutes);
    }

    return (
        <>
        <div className="flexRow pageHeader">
            <img src={logo} className="pageLogo" alt="Pet-Hotel Logo" />
            <div className="navBar">
                <li onClick={() => handleToggleRoutes("about")} className={"navItem " + (routes[0] && "active")}>
                    About Us <i className="bi bi-chat-dots"></i>
                </li>
                <li onClick={() => handleToggleRoutes("pet")} className={"navItem " + (routes[1] && "active")}>
                    Pet-Feed <i className="bi bi-card-image"></i>
                </li>
                <li className="navItem">
                    Placeholder
                </li>
            </div>
            <img src={doglogo} className="dogLogo" alt="Dog Logo" />
        </div>

        <PetFeedPage visibility={routes[1] ? "visible" : "hidden"}/>
        

        </>
    )
}

function PetFeedPage({visibility}){


    return(
        <div className={`flexRow ${visibility}`} style={{margin:"20px 0"}}>
            <div className="flexCol" style={{gap:"20px"}}>
            {data.map(post => 
                <ImagePost key={post.id} postData={post}/> 
            )}
            </div>
        </div>
    )
}