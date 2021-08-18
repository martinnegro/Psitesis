import React from "react"
import { useState } from "react"
import { postComment } from "../../../utils/auth"
const Comment = () =>{
    const [commentInf,setCommentInf] = useState({
        comment_contents: "",
        post_id : undefined,
        user_id : undefined,
        comment_state: null,
        response_to_comment_id: null,
    })

    function handleSubmit(e){
        e.preventDefault();
        postComment(commentInf)
    }

    return(
        <div>
            <h3>Comment component</h3>
        </div>
    )
}

export default Comment