import { Container } from '@material-ui/core';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios';

const { REACT_APP_URL_API } = process.env

function Forum_Post() {
    const { post_id } = useParams();
    const [ post, setPost ] = useState();
    
    useEffect(async()=>{
        const fetchedPost = await axios.get(`${REACT_APP_URL_API}/forumposts/${post_id}`);
        console.log(fetchedPost.data);
    },[]);
    

    return (
        <Container>

        </Container>
    )
}

export default Forum_Post
