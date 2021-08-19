import { Container, Typography, Box, Avatar, Input, makeStyles, IconButton, TextField,Button } from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit';
import DoneIcon from '@material-ui/icons/Done';
import CloseIcon from '@material-ui/icons/Close';
import ReplyIcon from '@material-ui/icons/Reply';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from "react-redux";
import Nav from '../../components/Nav/Nav'
import CommentCard from '../Forum/components/CommentCard';
import Comment from '../Forum/components/Comment';
import {getUserDetail} from "../../redux/actions/usersActions";
import axios from 'axios';

const { REACT_APP_URL_API } = process.env

const useStyle = makeStyles({
    root: {
        margin: "150px auto 0 auto",
        width: "1000px"

    },
    header: {
        display: "flex",
        alignItems: "end",
        justifyContent: "space-evenly"
    },
    info: {
        margin: "10px 0 10px 0",
        display: "flex",
        alignItems: "center",
        justifyContent: "start"
    },
    avatar: {
        margin: "0 5px 0 5px",
        width: "3rem",
        height: "3rem"
    },
    textField: {
        width: "100%",
        
    },
    commentIcon :{
        width: "40px",
        display: "flex",
        justifyContent: "right",
        
    },
    hide:{
        display:"none"
    },
    replyButton:{
        fontSize:"80px",
        color: "#ff99bb"

    }
});

function Forum_Post() {
    const userId = useSelector((state) => state.authReducer.user.user_id)
    const dispatch = useDispatch();
    const { post_id } = useParams();
    const [ post, setPost ] = useState();
    const [commentComponent,setCommentComponent] = useState(false);
    const classes = useStyle()
    const [responseToComentId,setResponseToComentId] = useState(null) 
    const [ editing, setEditing ] = useState({isEditing: false});
    const [ previous, setPrevious ] = useState()
    
    useEffect(async()=>{
        fetchPostData();
    },[]);

    useEffect(() => {
		if (userId) {
			dispatch(getUserDetail(userId));
		}
	}, [dispatch, userId]);

    const fetchPostData = async () => {
        const fetchedPost = await axios.get(`${REACT_APP_URL_API}/forumposts/${post_id}`);
        setPost(fetchedPost.data);
        
        setEditing(state => { return { 
            isEditing: false,
            post_contents: fetchedPost.data.post_contents,
            post_title: fetchedPost.data.post_title,
         }})
    };
    
    // LOGICA PARA EDITAR TÍTULO y CONTENIDO
    const handleWantEdit = () => {
        setPrevious({
            post_contents: editing.post_contents,
            post_title: editing.post_title
        })
        setEditing(state => {return {...state, isEditing: true}})
    };
    const handleOnChange = (e) => {
        const state = editing
        setEditing({
            ...state,
            [e.target.name]: e.target.value
        })
    };
    const handleCancelEditing = () => {
        setEditing({
            isEditing: false,
            post_title: previous.post_title,
            post_contents: previous.post_contents,
        });
        setPrevious({});
    };
    const handleConfirmEditing = async () => {
        try {
            const response = await axios.put(`${REACT_APP_URL_API}/forumposts/edit/${post.post_id}`,editing);
            alert(response.data.message);
            fetchPostData();
        } catch(err) { 
            alert('No update')
            handleCancelEditing();
        }
    };

    // FIND RESPONDING TO USER NAME

    const respondingToUser = (postId,arr) =>{
        const postFound = arr.find(post => post.comment_id === postId)
        const user = postFound.user.user_name
        return user
    }

    const respondingToComment = (postId,arr) =>{
        const postFound = arr.find(post => post.comment_id === postId)
        const postContent = postFound.comment_contents;
        return postContent
    }

    // HANDLE COMMENT COMPONENT

    const handleCommentComponent = (response_to_comment_id) =>{
        commentComponent ? setCommentComponent(false) : setCommentComponent(true)
        if (response_to_comment_id){
            setCommentComponent(true)
            setResponseToComentId(response_to_comment_id)
            console.log(responseToComentId)
        }
    }

    const handleCancellComment = () =>{
        setCommentComponent(false)
    }


   return (
        <Container>
            {console.log(post?.comments)}
            <Nav></Nav>
            {
                post ?  
                
                <Container className={classes.root}>
                    <Box>
                        {
                            editing.isEditing ? 
                            <>
                                <IconButton>
                                    <DoneIcon onClick={handleConfirmEditing}/>
                                </IconButton>
                                <IconButton onClick={handleCancelEditing}>
                                    <CloseIcon/>
                                </IconButton>
                            </>
                            :
                            <IconButton onClick={handleWantEdit}>
                                <EditIcon/>
                            </IconButton>
                        }
                    </Box>
                    <Box className={classes.header}>
                        {
                            editing.isEditing ? 
                            <Input 
                                value={editing.post_title} 
                                name="post_title"
                                onChange={handleOnChange}    
                            />
                            :
                            <Typography variant="h3" color="initial">
                                {editing.post_title}
                            </Typography>
                        }
                        <Typography color="textSecondary">
                            en {post.subtopic.topic.topic_name.toUpperCase()} / {post.subtopic.sub_topic_name.toUpperCase()}
                        </Typography>
                    </Box>
                    {
                        post.post_edited ?
                        <Typography color="textSecondary">(EDITADO)</Typography>
                        : <></>
                    }
                    <Box className={classes.info}>
                        <Avatar className={classes.avatar} alt={post.user.user_name} src={post.user.user_img_profile}/>
                        <Box>
                            <Typography color="textSecondary">
                                {post.post_date}
                            </Typography>
                            <Typography color="textSecondary">
                                Por {post.user.user_name}
                            </Typography>
                        </Box>
                    </Box>
                    <Box>
                        {   
                            editing.isEditing ?
                            <TextField
                                value={editing.post_contents} 
                                name="post_contents"
                                onChange={handleOnChange}
                                className={classes.textField}
                                multiline rows={5}
                            />
                            :
                            <Typography>
                                {editing.post_contents}
                            </Typography>
                        }
                    </Box>
                </Container>
                
                : <div className={classes.root}>CARGANDO</div>
            }
            

            {/* --------- COMMENTS ----------*/}
            <Container>
            {post ? post.comments?.map((comment)=>{
                return(
                    <div>
                        <Container>
                        {comment.response_to_comment_id ? <h3>{respondingToUser(comment.response_to_comment_id,post.comments) } comento </h3> : null}
                        {comment.response_to_comment_id ? <h3>{respondingToComment(comment.response_to_comment_id,post.comments)}</h3> : null}
                        </Container>
                    <CommentCard
                     key = {comment.comment_id}  id = {comment.comment_id} content = {comment.comment_contents} date = {comment.comment_date}  userName = {comment.user.user_name} image = {comment.user.user_img_profile}   userId = {comment.user.user_id_A0}  handleCommentComponent = {handleCommentComponent} response_to_comment_id = {responseToComentId}
                    ></CommentCard>
                    </div>
                )
            }) : <div className={classes.root}>CARGANDO</div> } 
            
            </Container>
            {commentComponent ? <Comment response_to_comment_id = {responseToComentId} fetchPostData = {fetchPostData} handleCancellComment = {handleCancellComment} /> : null}
            <Container className = {classes.commentIcon}>
                
                <Button className = {commentComponent ? classes.hide : null} onClick = {handleCommentComponent}   ><ReplyIcon className = {classes.replyButton}/></Button>
                
            </Container>
            
        </Container>
    )
}

export default Forum_Post
