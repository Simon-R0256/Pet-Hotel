/* eslint-disable no-fallthrough */
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

    //Different Dispatch tasks
    switch (action.type) {
        case "create_comment": {
            const newPost = nextPosts.find(post => post.id === action.id);
            newPost.comments.push({name:"Guest",text:action.text});
            nextPosts.map(post => post.id === action.id ? newPost : post);
            break;
        }
        case "interaction": {
            nextPosts.find(post => post.id === action.id).interaction = action.emotion;
            break;
        }
        default : {
            throw Error("Unknown Action type "+action.type)
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
