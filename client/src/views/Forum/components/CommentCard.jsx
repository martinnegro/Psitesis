import {React,useState} from "react"
import { Link } from 'react-router-dom'
import { Avatar, Typography, makeStyles, Box,Paper,Divider,Button, Container } from '@material-ui/core'
import ReportTwoToneIcon from '@material-ui/icons/ReportTwoTone';
import EditIcon from '@material-ui/icons/Edit';
import ReplyTwoToneIcon from '@material-ui/icons/ReplyTwoTone';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import { useDispatch, useSelector } from "react-redux";
import EditComment from "./EditComment"
import { deleteComment } from "../../../redux/API";
import { getDateTime } from "../../../utils/auth";
import Report from "./Report";
import QuoteCard from "./QuoteCard";

const useStyle = makeStyles({
    root: {
        margin: "5px auto 0 auto",
        padding: "5px",
        display: "flex"
    },

    link: {
        textDecoration: "none"
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
    commentInfo: {
        padding: 0
    },
    iconsContainer:{
        display: "flex",
        flexDirection: "column",
        justifyContent :"center",

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
    button:{
        fontSize: "7px"
    }
});
const CommentCard = ({comment,handleCommentComponent,fetchPostData,respondedComment}) =>{
    const classes = useStyle();
    const loggedUserId =  useSelector((state) => state.authReducer.user.user_id)
    const [edit,setEdit] = useState(false)
    const [report,setReport] = useState(false)
    const handleEdit = () => {
        setEdit(true)
    }
    const cancellEdit = () => {
        setEdit(false)
    }
    const handleDelete = async () => {
        await deleteComment(comment.comment_id)
        await fetchPostData()
    }

    const handleReport = () =>{
        setReport(true)
    }

    const cancellReport = () =>{
        setReport(false)
    }
    return(
        <Paper 
            variant="outlined"
            key={comment.comment_id}
            id={comment.comment_id}
            className = {classes.root}
        >
            <Container className={classes.commentInfo}>
                <Box className={classes.user} >
                    <Link 
                        className={classes.links}
                        to={`/user/${comment.user.user_id}`}
                    >
                        <Avatar className={classes.avatar} alt={comment.user.user_name} src={comment.user.user_img_profile}/> 
                    </Link>
                    <div>
                        <Typography color="textSecondary">
                            {getDateTime(comment.createdAt)}
                        </Typography>
                        <Link 
                            className={classes.links}
                            to={`/user/${comment.user.user_id}`}
                        >
                            <Typography 
                                fontWeight={500}
                                className={classes.autor}
                                color="textSecondary"
                                variant = "body2"
                            >
                                <span fontWeight = {500} > Por {comment.user.user_name}</span>
                            </Typography>
                        </Link>
                    </div> 
                </Box>

                {
                    comment.response_to_comment_id ?
                    <QuoteCard 
                        userName={respondedComment.user.user_name}
                        commentContent={respondedComment.comment_contents}
                        commentId={respondedComment.comment_id}
                    /> : null
                }
                <Box>
                    </Box>
                    <Box className = {classes.contentContainer}>
                    <Typography variant = "body1">
                    <span
                        dangerouslySetInnerHTML={{
                          __html: `${comment.comment_contents}`,
                        }}
                    />
                    </Typography>
                </Box>
            </Container>
            {
                comment.deleted === false ? 
                <Box className = {classes.iconsContainer}>
                    <Typography>
                        <Button className = {classes.button} onClick = {handleReport}>
                            <ReportTwoToneIcon style={{ fontSize: 15 }}  />
                            Reportar 
                        </Button>
                        {
                            report ? 
                            <Report cancellReport = {cancellReport} commentId = {comment.comment_id}/>
                            : null
                        }         
                    </Typography>
                    <Typography color="textSecondary">
                        <Button
                            className={classes.button}
                            onClick={(e) => handleCommentComponent(e,comment.comment_id)}
                        >
                            <ReplyTwoToneIcon style={{ fontSize: 15 }}/> 
                            Responder
                        </Button>
                    </Typography> 
                            <Typography color="textSecondary">
                                <Button 
                                    className={classes.button}
                                    onClick={handleEdit}
                                >
                                    <EditIcon style={{ fontSize: 15 }} /> 
                                        Editar
                                </Button> 
                                <Button 
                                    className={classes.button}
                                    onClick = {handleDelete}
                                >
                                    <DeleteForeverIcon  style={{ fontSize: 15 }}/>
                                    Eliminar
                                </Button> 
                                {
                                    edit ? 
                                    <EditComment 
                                        id={comment.comment_id}
                                        content={comment.comment_contents}
                                        cancellEdit={cancellEdit}
                                        fetchPostData={fetchPostData}
                                    ></EditComment>
                                    : null
                                }
                            </Typography>     
                        </Box>

                    : null
                }
        </Paper>
    )
}

export default CommentCard