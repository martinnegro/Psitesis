import {React,useState} from "react"
import { Link } from 'react-router-dom'
import { Avatar, Typography, makeStyles, Box,Container,Divider,Button } from '@material-ui/core'
import ReportTwoToneIcon from '@material-ui/icons/ReportTwoTone';
import EditIcon from '@material-ui/icons/Edit';
import ReplyTwoToneIcon from '@material-ui/icons/ReplyTwoTone';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import { useDispatch, useSelector } from "react-redux";
import EditComment from "./EditComment";
import { deleteComment } from "../../../utils/auth";

const useStyle = makeStyles({
    root: {
        margin: "60px auto 0 auto",
        width: "1000px"
      
    },
    header: {
      fontSize: "1rem",
      display: "flex",
      justifyContent: "space-between"
    },
    link: {
        textDecoration: "none"
    },
    title: {
        fontSize: "1.5rem",
        textAlign: "start",
    },
    footer: {
        margin: "5px 0 0 0",
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between"
    },
    user: {
        display: "flex",
        alignItems: "center"
    },
    avatar: {
        margin: "0 5px 0 5px",
        width: "2rem",
        height: "2rem"
    },
    info: {
        margin: "10px 0 10px 0",
        display: "flex",
        alignItems: "center",
        justifyContent: "start"
    },
    iconsContainer:{
        display: "flex",
        justifyContent :"center",
        margin: "20px"
    },
    iconContainer:{
        margin: "10px",

    },
    contentContainer : {
        margin: "15px"
    },
    links:{
        color: "inherit",
        styles: "none",
        textDecoration: "none"
    },
    buttonContainer:{
       height: "2px"
    }
});

const CommentCard = ({id,date,likes,views,userName,image,content,userId,handleCommentComponent,response_to_comment_id,fetchPostData}) =>{
    const classes = useStyle();
    const loggedUserId =  useSelector((state) => state.authReducer.user.user_id)
    const [edit,setEdit] = useState(false)
    const handleEdit = () => {
        setEdit(true)
    }
    const cancellEdit = () => {
        setEdit(false)
    }

    const handleDelete = async () => {
        await deleteComment(id)
        await fetchPostData()
    }
    
    return(
        <Container className = {classes.root} >
            <Link className = {classes.links} to = {`/user/${userId}`}>
                <Box className={classes.user} >
                    <Avatar className={classes.avatar} alt={userName} src={image}/> 
                    <div>
                        <Typography color="textSecondary">
                            {date}
                        </Typography>
                        <Typography className={classes.autor} color="textSecondary">
                            <span> {userName}</span>
                        </Typography>
                    </div> 
                </Box>
            </Link>
                    <Box>
                        </Box>
                        <Box className = {classes.contentContainer}>
                        <Typography>
                        <span
                            dangerouslySetInnerHTML={{
                              __html: `${content}`,
                            }}
                        />
                        </Typography>
                    </Box>

                    <Box className = {classes.iconsContainer}>
                    <Box className = {classes.iconContainer}>
                    <Typography>
                    <Button className = {classes.button}> <ReportTwoToneIcon  /> Reportar </Button>         
                            </Typography>
                            </Box>
                            <Box className = {classes.iconContainer}>
                            <Typography color="textSecondary">
                            <Button onClick =  {(e) => handleCommentComponent(e,id)}> <ReplyTwoToneIcon/> Responder</Button>
                            </Typography>
                            </Box>
                            <Box className = {classes.iconContainer}>
                            <Typography color="textSecondary">
                                    <Button onClick = {handleEdit}>
                                        Editar
                                       <EditIcon /> 
                                    </Button> 
                                    <Button onClick = {handleDelete}>
                                        <DeleteForeverIcon/>Eliminar</Button> 
                                {edit ? <EditComment id = {id} content = {content} cancellEdit = {cancellEdit} fetchPostData = {fetchPostData}></EditComment> : null}
                            </Typography>
                            
                            
                            </Box>
                            </Box>
                            <Divider/>
        </Container>
    )
}

export default CommentCard