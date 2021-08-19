import {React,useState} from "react"
import { Link } from 'react-router-dom'
import {Container}  from '@material-ui/core'
import ReportTwoToneIcon from '@material-ui/icons/ReportTwoTone';
import EditIcon from '@material-ui/icons/Edit';
import ReplyTwoToneIcon from '@material-ui/icons/ReplyTwoTone';
import { useDispatch, useSelector } from "react-redux";
import ReactQuill from "react-quill";
import { spacing } from '@material-ui/system';

const EditComment = () => {

    const [comment,setComment] = useState("")

    const handleOnChange = () =>{
        setComment(comment)
        console.log(comment)
    }
    return(
        <Container>
            <h3>Editing</h3>
            <ReactQuill placeholder="Escribe aqui ...."
            modules={EditComment.modules}
            formats={EditComment.formats}
             onChange={handleOnChange}
             value={comment} 
            name = "comment_contents"
            m = {50}>
                
            </ReactQuill>
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