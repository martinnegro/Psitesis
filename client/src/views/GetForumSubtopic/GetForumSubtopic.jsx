import React from 'react';
import { getForumSubtopic } from '../../redux/actions/forumActions';
import { useParams } from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import { useEffect, useState } from 'react';
import { Container, Typography, makeStyles } from '@material-ui/core'
import PostCard from '../Forum/components/PostCard'
import Nav from '../../components/Nav/Nav'
import styles from './GetForumSubtopic.module.css'
import { highlightPost } from '../../redux/API';

const useStyle = makeStyles({
    root: {
        margin: "100px auto 0 auto"
    },
    title: {
        marginTop: "20px",
        backgroundColor: "purple",
        width: "100%",
        textAlign: "center",
        color: "white",
    },
    subTitle: {
        marginTop: "0",
        padding: "5px 0 5px 0",
        backgroundColor: "#031927",
        width: "100%",
        textAlign: "center",
        color: "white",
    },
    cardsContainer: {
        width: "100%",
    }
});

export default function GetForumSubTopic(){
    const classes = useStyle();
    const dispatch = useDispatch();
    const { sub_topic_id } = useParams();
    const forum = useSelector((state) => state.forumReducer.forumSubtopics);
    const [ orderedPost, setOrderedPost ] = useState([]);
    useEffect(()=>{
        if (forum.forumposts.length > 0) {
            const highlighted = forum.forumposts.filter(p => p.post_highlight);
            const unHighlight = forum.forumposts.filter(p => !p.post_highlight);
            highlighted.sort((a,b) => a.createdAt > b.createdAt ? 1 : -1 );
            unHighlight.sort((a,b) => a.createdAt > b.createdAt ? 1 : -1 );
            setOrderedPost([...highlighted,...unHighlight])
        };
    },[forum]);

    useEffect(() => {
        dispatch(getForumSubtopic(sub_topic_id))
    },[dispatch, sub_topic_id])
  
    return(
        <Container className={classes.root}>
            <Nav/>
            {
                forum ?
                <>
                    <Container className={classes.title}>
                        <Typography variant='h3' >FORO / {forum.topic.topic_name} / {forum.sub_topic_name}</Typography>
                    </Container>
                    <Container className={classes.subTitle}>
                        <Typography variant='h5' >{forum.sub_topic_description}</Typography>
                    </Container>
                    <Container className={classes.cardsContainer}>
                    {
                        orderedPost.map((f)=>(<PostCard post={f} />))
                    }
                    </Container>
                </>
                :
                <div>Sin Posts </div>
            }
        </Container>
    )
}