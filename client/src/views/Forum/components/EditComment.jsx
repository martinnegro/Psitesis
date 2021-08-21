import {React,useState} from "react"
import {Container,Button}  from '@material-ui/core'
import ReactQuill from "react-quill";
import CheckIcon from '@material-ui/icons/Check';
import CancelOutlinedIcon from '@material-ui/icons/CancelOutlined';
import "./EditComment.css"
import { editComment } from "../../../utils/auth";

 const EditComment =   ({id,content,cancellEdit,fetchPostData}) => {

    const [comment,setComment] = useState(content)

    const handleOnChange = (e) =>{
        setComment(e)
    }

    const handleSubmit = async () =>{
        try{
           
             await editComment(id,{comment_contents : comment }) 
             await fetchPostData()
        }
        catch(error){
            console.error(error)
        }
        console.log("termino editing comment")
        console.log("termino fetch data")
        cancellEdit()
        console.log("cancelando la edicion")
        setComment(content)
        console.log("reseteando el content")
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
            <Button onClick = {cancellEdit}> <CancelOutlinedIcon/></Button>
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