import "./imagepost.css";
import "bootstrap-icons/font/bootstrap-icons.css";

import { useState } from "react";

export default function ImagePost({postData}){
    const [hideComments, setHideComments] = useState(true);
    const [comments,setComments] = useState(postData.comments);

    function handleCreateComment(text){
        if(text.length < 3) return;
        setComments([
                {name: "Guest", text:text},
                ...comments
        ])
    }

    function handleCommentVisibility(){
        setHideComments(!hideComments);
    }

    return(  
        <div className="flexRow imagePost">
            <Picture content={postData.content}/>
            <PostInfo 
                username={postData.username} 
                picture={postData.picture} 
                info={postData.info}
                commentCount={comments.length}
                toggleComments={handleCommentVisibility}
                commentsVisibility={hideComments}
            >
                <CommentSection
                    comments={comments}
                    commentsVisibility={hideComments}
                    createComment={handleCreateComment}
                />
            </PostInfo>
            
        </div>
    );
}

function Picture({content}){
    return (
        <img className="picture" src={content} alt="Animal" />
    )
}

function PostInfo({username,picture,info,commentCount,commentsVisibility,toggleComments,children}){
    const [interaction, setInteraction] = useState("none");

    function handleInteraction(emotion){
        interaction === emotion ? setInteraction("none") : setInteraction(emotion);
    }

    return(
        <div className="flexcol note">
            <div className="flexRow noteHead">
                <img className="noteImage" src={picture} alt="Avatar"/>
                <section className="noteContentArea flexCol">
                    <label className="noteCreatorLabel"> {username} </label>
                    <article className="noteContent"> {info} </article>
                </section>
            </div>
            <div className="flexRow noteFooter">
                <div className="expandComments" onClick={toggleComments}>
                    Comments ({commentCount}){" "} 
                    <i className={"bi bi-caret-"+(!commentsVisibility ? "up" : "down")}></i>
                </div>
                <div className="flexRow">
                    <div className="voteButton" onClick={() => handleInteraction("like")}>
                        <i className={"voteGreen bi bi-arrow-up-circle "+(interaction === "like" && "green")}></i>
                    </div>
                    <div className="voteButton" onClick={() => handleInteraction("dislike")}>
                        <i className={"voteRed bi bi-arrow-down-circle "+(interaction === "dislike" && "red")}></i>
                    </div>
                </div>
            </div>
            {children}
        </div>
    )
}

function CommentSection({comments,commentsVisibility,createComment}){
    const [commentText, setCommentText] = useState("");
    
    return(
        <>
        <div className="createComment flexRow">
                <input 
                    value={commentText} 
                    onChange={(event) => setCommentText(event.target.value)}
                    placeholder="Write a comment ..."
                />
                <button onClick={() => {createComment(commentText);setCommentText("")} }>
                    <i className="bi bi-chat-left-text"></i>
                </button>
        </div>
        <div className={"flexCol commentList "+(commentsVisibility ? "hidden" : "visible")}>
            {comments.map((com,index) => <Comment key={index} name={com.name} text={com.text}/>)}
        </div>
        </>
    )
}

function Comment({name,text}){

    return(
        <div className="flexCol comment">
            <div className="flexRow commentHead">
                <div className="commentIcon"><i className="bi bi-person-fill"></i></div>
                <div className="commentName">{name}</div>
            </div>
            <div className="commentText">
                {text}
            </div>
        </div>
    )
}