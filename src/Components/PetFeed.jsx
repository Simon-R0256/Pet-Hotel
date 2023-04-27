import "./petfeed.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import { useState} from "react";
import { usePost, usePostDispatch} from "./PostProvider";


export default function PetFeedPage(){
    const posts = usePost();
    
    return(
        <div className="flexRow" style={{margin:"20px 0"}}>
            <div className="flexCol" style={{gap:"20px"}}>
            {posts.map(post => 
                <ImagePost key={post.id} postData={post} /> 
            )}
            </div>
        </div> 
    )
}

export function ImagePost({postData}){
    const [hideComments, setHideComments] = useState(false);

    function handleCommentVisibility(){
        if(postData.comments.length > 0){
            setHideComments(!hideComments);
        }
    }

    return(  
        <div className="flexRow imagePost">
            <Picture content={postData.content}/>
            <PostInfo 
                postData={postData}
                toggleComments={handleCommentVisibility}
                commentsVisibility={hideComments}
            >
                <CommentSection
                    postId={postData.id}
                    comments={postData.comments}
                    commentsVisibility={hideComments}
                />
            </PostInfo>
            
        </div>
    );
}

function Picture({content}){
    return (
        <img className="picture" src={content} alt="Here will be your Pet" />
    )
}

function PostInfo({postData,commentsVisibility,toggleComments,children}){
    const dispatch = usePostDispatch();

    function handleInteraction(emotion){
        dispatch({
            type: "interaction",
            id: postData.id,
            emotion: emotion
        })
    }

    return(
        <div className="flexcol note">
            <div className="flexRow noteHead">
                <img className="noteImage" src={postData.picture} alt="Avatar"/>
                <section className="noteContentArea flexCol">
                    <label className="noteCreatorLabel"> {postData.username} </label>
                    <article className="noteContent"> {postData.info} </article>
                </section>
            </div>
            <div className="flexRow noteFooter">
                <div className="expandComments" onClick={toggleComments}>
                    Comments ({postData.comments.length}){" "} 
                    <i className={"bi bi-caret-"+(commentsVisibility ? "up" : "down")}></i>
                </div>
                <div className="flexRow">
                    <div className="voteButton" onClick={() => handleInteraction("like")}>
                        <i className={"voteGreen bi bi-arrow-up-circle "+(postData.interaction === "like" && "green")}></i>
                    </div>
                    <div className="voteButton" onClick={() => handleInteraction("dislike")}>
                        <i className={"voteRed bi bi-arrow-down-circle "+(postData.interaction === "dislike" && "red")}></i>
                    </div>
                </div>
            </div>
            {children}
        </div>
    )
}

function CommentSection({postId,comments,commentsVisibility}){
    const [commentText, setCommentText] = useState("");
    const dispatch = usePostDispatch();
    
    return(
        <>
        <div className="createComment flexRow">
                <input 
                    value={commentText} 
                    onChange={(event) => setCommentText(event.target.value)}
                    placeholder="Write a comment ..."
                />
                <button onClick={() => {
                    dispatch({type:"create_comment", text:commentText, id:postId});
                    setCommentText("")} 
                    }>
                    <i className="bi bi-chat-left-text"></i>
                </button>
        </div>
        <div className={"flexCol commentList "+(!commentsVisibility ? "hidden" : "visible")}>
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