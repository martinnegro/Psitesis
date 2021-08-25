import {React,useState} from "react"
import {Container,Button, Dialog}  from '@material-ui/core'
import ReactQuill from "react-quill";
import CheckIcon from '@material-ui/icons/Check';
import CancelOutlinedIcon from '@material-ui/icons/CancelOutlined';
import "./EditComment.css"
/* import { editComment } from "../../../utils/auth"; */
import { editComment } from "../../../redux/API";

 const EditComment =   ({id,content,cancellEdit,fetchPostData,open}) => {

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
        cancellEdit()
        setComment(content)
    }
    return(
        <Dialog open={open}>
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
        </Dialog>
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