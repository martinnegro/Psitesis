import { Container, Typography, Box, Avatar, makeStyles } from '@material-ui/core';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Nav from '../../components/Nav/Nav'
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
    }
});

function Forum_Post() {
    const { post_id } = useParams();
    const [ post, setPost ] = useState();
    const classes = useStyle()
    
    useEffect(async()=>{
        const fetchedPost = await axios.get(`${REACT_APP_URL_API}/forumposts/${post_id}`);
        console.log(fetchedPost.data)
        setPost(fetchedPost.data);
    },[]);
    

    return (
        <Container>
            <Nav></Nav>
            {
                post ?            
                <Container className={classes.root}>
                    <Box className={classes.header}>
                        <Typography variant="h3" color="initial">
                            {post.post_title}
                        </Typography>
                        <Typography color="textSecondary">
                            en {post.subtopic.topic.topic_name.toUpperCase()} / {post.subtopic.sub_topic_name.toUpperCase()}
                        </Typography>
                    </Box>
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
                        <Typography>
                            {post.post_contents}
                        </Typography>
                    </Box>
                </Container>
                : <div className={classes.root}>CARGANDO</div>
            }
        </Container>
    )
}

export default Forum_Post
