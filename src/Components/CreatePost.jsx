import { ImagePost } from "./PetFeed";
import avatar from "./pic/guest.png";
import { useState, useEffect } from "react";
import "./createpost.css";

const post = {
    id: "420",
    username: "Guest",
    interaction: "none",
    picture: avatar,
    content: "",
    info: "",
    comments: []
};

export default function CreatePost(){
    const [link,setLink] = useState("");
    const [info,setInfo] = useState("");

    post.content = link;
    post.info = info;
    
    return(
        <div className="flexCol createPage">
            <div className="flexCol userInputArea">
                <div className="inputHeader">
                    <h1>Create a Post <i className="bi bi-journal-richtext"></i></h1>
                </div>
                <hr></hr>
                <input 
                    value={link} 
                    className="linkInput" 
                    placeholder="Weblink to an Image"
                    onChange={(event) => {setLink(event.target.value); }}
                />
                <textarea 
                    value={info} 
                    className="infoInput" 
                    placeholder="Description"
                    onChange={(event) => {setInfo(event.target.value)}}                   
                />
                <button className="postButton">Submit Post <i className="bi bi-pin-angle"></i></button>
            </div>
            <div className="postWrapper">
                <h1 style={{marginBottom:"10px"}}>Preview <i className="bi bi-zoom-in"></i></h1>
                <ImagePost postData={post}/>
            </div>
        </div>
    )
}
