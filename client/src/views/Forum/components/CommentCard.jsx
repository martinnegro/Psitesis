import {React,useState} from "react"
import { Link } from 'react-router-dom'
import { Avatar, Typography, makeStyles, Box,Paper,Divider,Button, Container } from '@material-ui/core'
import ReportTwoToneIcon from '@material-ui/icons/ReportTwoTone';
import EditIcon from '@material-ui/icons/Edit';
import ReplyTwoToneIcon from '@material-ui/icons/ReplyTwoTone';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import StarBorderIcon from '@material-ui/icons/StarBorder';
import { useDispatch, useSelector } from "react-redux";
import EditComment from "./EditComment"
import { deleteComment, highlightComment } from "../../../redux/API";
import { getDateTime } from "../../../utils/auth";
import Report from "./Report";
import QuoteCard from "./QuoteCard";
import { HashLink } from 'react-router-hash-link';
import { userHasPermission } from "../../../utils/roles";

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
        margin: "3px",
        fontSize: "10px",
        display: "flex",
        justifyContent: "start"
    }
});
const CommentCard = ({comment,handleCommentComponent,fetchPostData,respondedComment}) =>{
    const classes = useStyle();
    const loggedUserId =  useSelector((state) => state.authReducer.user.user_id)
    const {user} = useSelector((state) => state.authReducer);
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

    const handleHighlight = async () => {
        try {
            const response = await highlightComment(comment.comment_id)
            fetchPostData()
        } catch(err) { alert('No update') }
    };
    const highlight = () => {
        if (comment.comment_highlight) return { border: "2px solid gold", backgroundColor: "#E9F089" };
        else return {}
    };
    return(
        <Paper 
            variant="outlined"
            key={comment.comment_id}
            id={comment.comment_id}
            className = {classes.root}
            style= {highlight()}
        >
            <Container className={classes.commentInfo}>
                <Box className={classes.user} >
                    {console.log(comment)}
                    <Link 
                        className={classes.links}
                        to={`/user/${comment.user.user_id_A0}`}
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
                    {
                        comment.comment_edited ?
                        <Typography color="textSecondary">
                            (EDITADO)
                        </Typography>
                        :null
                    }
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
                    <Button
                        className = {classes.button}
                        onClick = {handleReport}
                        startIcon={<ReportTwoToneIcon style={{ fontSize: 15 }}/>}
                        variant="contained"
                        disableElevation
                    >
                        Reportar 
                    </Button>
                    <Report
                        open={report}
                        cancellReport={cancellReport} 
                        content={comment.comment_contents}
                        commentId={comment.comment_id}
                    />
                    <HashLink className = {classes.links} to = "#comments">
                        <Button
                            className={classes.button}
                            onClick={(e) => handleCommentComponent(e,comment.comment_id)}
                            startIcon={<ReplyTwoToneIcon style={{ fontSize: 15 }}/> }
                            variant="contained"
                            disableElevation
                        >
                            Responder
                        </Button>
                    </HashLink>
                    {userHasPermission(user.roles[0],['superadmin','admin'],comment.user.user_id_A0,loggedUserId) ? <Button 
                        className={classes.button}
                        onClick={handleEdit}
                        startIcon={<EditIcon style={{ fontSize: 15 }} /> }
                        variant="contained"
                        disableElevation
                    >
                        
                        Editar
                    </Button> : null}
                    {userHasPermission(user.roles[0],['admin','superadmin'],comment.user.user_id_A0,loggedUserId) ? <Button 
                        className={classes.button}
                        onClick = {handleDelete}
                        startIcon={<DeleteForeverIcon  style={{ fontSize: 15 }}/>}
                        variant="contained"
                        disableElevation
                    >
                        Eliminar
                    </Button > : null}
                    <EditComment 
                        open={edit}
                        id={comment.comment_id}
                        content={comment.comment_contents}
                        cancellEdit={cancellEdit}
                        fetchPostData={fetchPostData}
                    />
                    {userHasPermission(user.roles[0],['admin','superAdmin']) ? <Button 
                        className={classes.button}
                        onClick = {handleHighlight}
                        startIcon={<StarBorderIcon  style={{ fontSize: 15 }}/>}
                        variant="contained"
                        disableElevation
                    >
                        {
                            comment.comment_highlight ?
                            'Unhighlight' 
                            : 'DESTACAR' 
                        }
                    </Button>  : null}
                </Box>
                : null
            }
        </Paper>
    )
}

export default CommentCard