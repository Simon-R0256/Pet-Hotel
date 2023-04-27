import { ImagePost } from "./PetFeed";
import guestAvatar from "./pic/guest.png";
import loading from "./pic/loading.gif";
import { useState, useRef} from "react";
import {usePost, usePostDispatch} from "./PostProvider"
import "./createpost.css";


export default function CreatePost({handleRoute}){
    const [link,setLink] = useState("");
    const [info,setInfo] = useState("");
    const [imageState,setImageState] = useState(false);
    
    const dispatch = usePostDispatch();
    const posts = usePost();

    const modal = useRef(null);
    const testImage = useRef(null);


    function handleCreatePost(){
        if(!imageState){
            alert("Error: The Link doesnt resolve to an Image");
            return;
        }

        if(info.length === 0){
            alert("Error: Please Enter a Description");
            return;
        }

        dispatch({
            type: "create_post",
            nextid: posts.length+1,
            username: "Guest",
            picture: guestAvatar,
            content: link,
            info: info,
        })

        setTimeout(() => {
            handleRoute(1);
        },2500)
        modal.current.style.display = "block";
    }
    
    return(
        <div className="flexCol createPage">
            <div className="flexCol userInputArea">
                <div className="inputHeader">
                    <h1>Create a Post <i className="bi bi-journal-richtext"></i></h1>
                </div>
                <hr></hr>
                <div></div>
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
                <button onClick={handleCreatePost} className="postButton">
                    Submit Post <i className="bi bi-pin-angle"></i>
                </button>

                {/*Hidden Image to Test if Link resolves to an Image */}
                <img 
                    ref={testImage} 
                    onLoad={() => setImageState(true)} 
                    onError={() => setImageState(false)} 
                    src={link} 
                    alt="" 
                    style={{display:"none"}}
                />

                <div ref={modal} className="modal"> 
                    <div className="modalBody">
                        <div>
                            Post Created Successfully
                            <i className="bi bi-check2-circle"></i>
                        </div>
                        <div>
                            Redirects...
                        </div>
                        <div>
                            <img src={loading} alt="Loading" />
                        </div>
                    </div>
                </div>
            </div>
            <div className="postWrapper">
                <h1 style={{marginBottom:"10px"}}>Preview <i className="bi bi-zoom-in"></i></h1>
                <ImagePost postData={{
                    id: null,
                    username: "Guest",
                    picture: guestAvatar,
                    content: link,
                    info: info,
                    interaction: "none",
                    comments: [],
                }}/>
            </div>
        </div>
    )
}
