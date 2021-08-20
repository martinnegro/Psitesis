import {React,useState} from "react"
import { Link } from 'react-router-dom'
import {Container,Button}  from '@material-ui/core'
import { useDispatch, useSelector } from "react-redux";
import ReactQuill from "react-quill";
import { spacing } from '@material-ui/system';
import CheckIcon from '@material-ui/icons/Check';
import "./EditComment.css"
import { editComment } from "../../../utils/auth";

const EditComment = ({id,content}) => {

    const [comment,setComment] = useState(content)

    const handleOnChange = (e) =>{
        setComment(e)
        console.log(e)
    }
    let obj = {
        comment_contents : comment,
        comment_id: id
    }

    const handleSubmit = () =>{
       
        editComment(id,{obj})
    }
    return(
        <Container>
            <h3>Editing</h3>
            <ReactQuill 
            modules={EditComment.modules}
            formats={EditComment.formats}
             onChange={handleOnChange}
            value={comment} 
            name = "comment_contents"
            m = {50}>
            </ReactQuill>
            <Button onClick = {handleSubmit}><CheckIcon/></Button>
        </Container>
    )

}

EditComment.modules = {
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
  
  EditComment.formats = [
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

export default EditComment