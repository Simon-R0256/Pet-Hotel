import { createContext, useContext, useReducer } from "react";
import data from "./exampledata";

const PostContext = createContext(null);
const PostDispatchContext = createContext(null);

function postsReducer(posts,action){

    //Deep clone of posts
    const nextPosts = posts.map(post => {
        return ({
            ...post,
            comments: post.comments.map(comment => {return {...comment}})
        })
    })
    
    //creates a Ref to the post if it has an Id
    let PostRef;
    if(action.hasOwnProperty("id")){
        PostRef = nextPosts.find(post => post.id === action.id);
        if(PostRef === undefined){
            console.error("ID not found " + action.id);
            return posts;
        } 
    }
        
    //Different Dispatch tasks
    switch (action.type) {
        case "create_comment": {
            if(action.text.length > 0){
                PostRef.comments.unshift({name:"Guest",text:action.text});
            }
            break;
        }
        case "interaction" : {
            PostRef.interaction = PostRef.interaction === action.emotion ? "none" : action.emotion;
            break;
        }
        case "create_post" : {
            const createdPost = {
                id: action.nextid,
                username: action.username,
                interaction: "none",
                picture: action.picture,
                content: action.content,
                info: action.info,
                comments: []
            }

            nextPosts.unshift(createdPost);
            break;
        }
        default : {
            throw Error("Unknown Action type "+action.type);
        }  
    }

    return nextPosts;
}

export function PostProvider({children}){
    const [posts,dispatch] = useReducer(postsReducer,data);

    return (
        <PostContext.Provider value={posts}>
            <PostDispatchContext.Provider value={dispatch}>
                {children}
            </PostDispatchContext.Provider>
        </PostContext.Provider>
    )
}

export function usePost(){
    return useContext(PostContext);
}

export function usePostDispatch(){
    return useContext(PostDispatchContext);
}
