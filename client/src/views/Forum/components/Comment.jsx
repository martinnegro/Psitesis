import React from "react"
import { useState } from "react"
import { postComment } from "../../../utils/auth"
import { useParams, useHistory } from 'react-router-dom'
import { makeStyles, Container,Button} from "@material-ui/core";
import ReplyIcon from '@material-ui/icons/Reply';
import CancelOutlinedIcon from '@material-ui/icons/CancelOutlined';
import { useSelector } from "react-redux";
import ReactQuill from "react-quill";
import { spacing } from '@material-ui/system';

const useStyle = makeStyles({
    disableButton : {
        disabled : true,
    },
    button:{
        color: "#ff99bb"
    }
})

const Comment = ({response_to_comment_id,fetchPostData,handleCancellComment}) =>{
    const userId = useSelector((state) => state.usersReducer.userDetail.user_id); 
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
        console.log(commentInf.response_to_comment_id)
         setCommentInf({
             ...commentInf,
            comment_contents : "",
            response_to_comment_id : null
        })
        await postComment(commentInf)
         await fetchPostData();
         handleCancellComment();
    }

    function handleOnChange(e){
        
            setCommentInf({
                ...commentInf,
                  response_to_comment_id,  
                comment_contents : e,
            })
    }
    return(
        <Container>
            <ReactQuill
            placeholder="Escribe aqui ...."
            modules={Comment.modules}
            formats={Comment.formats}
            onChange={handleOnChange}
            value={commentInf.comment_contents}
            name = "comment_contents"
            m = {50}
          />
          <Button onClick={handleCancellComment}><CancelOutlinedIcon/></Button>
          {commentInf.comment_contents !== "" ? <Button  type = "submit" onClick = {handleSubmit} >
            <ReplyIcon/> </Button> : <Button disabled> <ReplyIcon/></Button> }
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