import PetFeedPage from "./Components/PetFeed";
import AboutUsPage from "./Components/AboutUs";

import logo from "./Components/pic/logo.png"
import doglogo from "./Components/pic/dog_logo.svg"
import { useState } from "react";
import { PostProvider } from "./Components/PostProvider";

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
                <li className="navItem">
                    Placeholder
                </li>
            </div>
            <img src={doglogo} className="dogLogo" alt="Dog Logo" />
        </div>

        {/* Seperate routed Pages, uses the PostProvider*/}
        <PostProvider>
            {routes[0] && <AboutUsPage/>}
            {routes[1] && <PetFeedPage/>}
        </PostProvider>
        </>
    )
}
