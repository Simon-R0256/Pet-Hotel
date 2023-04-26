import PetFeedPage from "./Components/PetFeed";
import AboutUsPage from "./Components/AboutUs";
import CreatePost from "./Components/CreatePost"
import { PostProvider } from "./Components/PostProvider";

import logo from "./Components/pic/logo.png"
import doglogo from "./Components/pic/dog_logo.svg"
import { useState } from "react";

export default function App(){
    const [routes,setRoutes] = useState([true,false,false]);

    //Route Handler to set the active Page
    function handleRoute(pathId){
        setRoutes( routes.map( (route,index) => 
            index === pathId ? true : false
        ));
    }

    return (
        <>
        {/* Page Header and Navbar*/}
        <div className="flexRow pageHeader">
            <img src={logo} className="pageLogo" alt="Pet-Hotel Logo" />
            <div className="navBar">
                <li onClick={() => handleRoute(0)} className={"navItem " + (routes[0] && "active")}>
                    About Us <i className="bi bi-chat-dots"></i>
                </li>
                <li onClick={() => handleRoute(1)} className={"navItem " + (routes[1] && "active")}>
                    Pet-Feed <i className="bi bi-card-image"></i>
                </li>
                <li onClick={() => handleRoute(2)} className={"navItem " + (routes[2] && "active")}>
                    Create <i className="bi bi-pencil-square"></i>
                </li>
            </div>
            <img src={doglogo} className="dogLogo" alt="Dog Logo" />
        </div>

        {/* Seperate routed Pages, every Page can use the PostProvider*/}
        <PostProvider>
            {routes[0] && <AboutUsPage/>}
            {routes[1] && <PetFeedPage/>}
            {routes[2] && <CreatePost/>}
        </PostProvider>
        </>
    )
}
