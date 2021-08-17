import { Container, Typography, Box, Avatar, Input, makeStyles, IconButton, TextField, Button } from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit';
import DoneIcon from '@material-ui/icons/Done';
import CloseIcon from '@material-ui/icons/Close';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Nav from '../../components/Nav/Nav'
import CommentCard from '../Forum/components/CommentCard';
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
        
    }
});

function Forum_Post() {
    const { post_id } = useParams();
    const [ post, setPost ] = useState();
    const classes = useStyle()
    
    const [ editing, setEditing ] = useState({isEditing: false});
    const [ previous, setPrevious ] = useState()

    useEffect(async()=>{
        fetchPostData();
    },[]);

    const fetchPostData = async (data) => {
        if (!data){
            const fetchedPost = await axios.get(`${REACT_APP_URL_API}/forumposts/${post_id}`);
            data = fetchedPost.data
            console.log(data);
        }
        setPost(data);
        setEditing({ 
            isEditing: false,
            post_contents: data.post_contents,
            post_title: data.post_title,
         })
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

    // LOGICA PARA ABRIR Y CERRAR THREAD
    const handleStatusThread = async () => {
        try {
            const response = await axios.put(`${REACT_APP_URL_API}/forumposts/thread_status/${post.post_id}`);
            fetchPostData();
        } catch(err) {
            alert('No update')
        }
    };

 
   return (
        <Container>
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
                        <Button onClick={handleStatusThread}>
                        {
                            post.post_open ? 
                                'Cerrar Thread'
                           :
                                'Abrir Thread'
                        }
                        </Button>
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
                    {   
                        post.post_open ? <></> :
                        <Typography color="textSecondary">
                            La sección de comentarios ha sido cerrada.
                        </Typography>
                    }
                </Container>
                
                : <div className={classes.root}>CARGANDO</div>
            }
            
            <Container>
            {post ? post.comments.map((comment)=>{
                return(
                    <CommentCard id = {comment.comment_id} content = {comment.comment_contents} date = {comment.comment_date} userName = {comment.user.user_name} image = {comment.user.user_img_profile} userId = {comment.user.user_id_A0} ></CommentCard>
                )
            }) : <div className={classes.root}>CARGANDO</div> } 
            
            </Container>
        </Container>
    )
}

export default Forum_Post