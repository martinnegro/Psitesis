import React from "react"
import { useState } from "react"
import { useAuth0 } from '@auth0/auth0-react';
import { postComment } from "../../../utils/auth"
import { useParams, useHistory } from 'react-router-dom'
import { makeStyles, Container,Button} from "@material-ui/core";
import ReplyIcon from '@material-ui/icons/Reply';
import { useSelector } from "react-redux";
import ReactQuill from "react-quill";

const useStyle = makeStyles({
    disableButton : {
        disabled : true,
        
    },
    button:{
        color: "#ff99bb"
    }
})

const Comment = ({response_to_comment_id,fetchPostData,handleCancellComment}) =>{
    let history = useHistory();
    const classes = useStyle()
    const userId = useSelector((state) => state.usersReducer.user_id); 
    const { post_id } = useParams();

    const [commentInf,setCommentInf] = useState({
        comment_contents: "",
        post_id : post_id,
        user_id : userId,
        comment_state: true,
        response_to_comment_id : undefined
    })
    
    async function handleSubmit(e){
        e.preventDefault();
       
        console.log(commentInf.comment_contents)
        setCommentInf({
            comment_contents : "" 
        })
         await postComment(commentInf)
         await fetchPostData();
         handleCancellComment();
    }

    function handleOnChange(e){
        setCommentInf({
            ...commentInf,
            comment_contents : e
        })
        
    }
    return(
        <Container>
            <h3>Comment component</h3>
            
            {
            /* <form type = "submit" 
            onSubmit = {handleSubmit}>
            <input type = "text" name = "comment_contents" value = {commentInf.comment_contents} onChange = {handleOnChange}></input>
            <Button className = {commentInf.comment_contents === "" ? classes.disableButton : null} type = "submit" >
            <ReplyIcon/> </Button></form> */}

            <ReactQuill
            placeholder="Escribe aqui ...."
            modules={Comment.modules}
            formats={Comment.formats}
            onChange={handleOnChange}
            value={commentInf.comment_contents}
            name = "comment_contents"
          />
           <Button className = {commentInf.comment_contents === "" ? classes.disableButton : null} type = "submit" onClick = {handleSubmit} >
            <ReplyIcon/> </Button>
            <button button onClick={handleCancellComment}>Cancel</button>
            
            </Container>
            
        
    )
}

Comment.modules = {
    toolbar: [
      [{ header: "1" }, { header: ["2", "3", "4", "5", "6"] }],
      [{ size: [] }],
      ["bold", "italic", "underline", "blockquote"],
      [{ list: "ordered" }, { list: "bullet" }],
      ["link", "image"],
      [{ align: [] }],
      [{ color: [] }],
    ],
  };
  
  Comment.formats = [
    "header",
    "font",
    "size",
    "bold",
    "italic",
    "underline",
    "blockquote",
    "list",
    "bullet",
    "link",
    "image",
    "align",
    "color",
  ];

export default Comment