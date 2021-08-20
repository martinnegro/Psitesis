import React from 'react';
import { getForumSubtopic } from '../../redux/actions/forumActions';
import { useParams } from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import { useEffect, useState } from 'react';
import { Container, Typography, makeStyles, createTheme } from '@material-ui/core'
import PostCard from '../Forum/components/PostCard'
import Nav from '../../components/Nav/Nav'
import styles from './GetForumSubtopic.module.css'
import { highlightPost } from '../../redux/API';
import {Link} from 'react-router-dom'
import {  Button } from '@material-ui/core';
import { ThemeProvider } from '@material-ui/core/styles';
import { purple } from '@material-ui/core/colors';

const theme = createTheme({
	palette: {
		primary: {
			main: purple[500],
			light: '#ffc4ff',
			dark: '#9c64a6',
			contrastText: '#fff',
		},
		secondary: {
			main: purple[500],
			light: '#ffc4ff',
			dark: '#9c64a6',
			contrastText: '#fff',
		},
	},
});

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
        display: 'flex',
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between"
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
    },
    stylebtn:{
        backgroundColor: "purple"
    }

});

export default function GetForumSubTopic(){
    const classes = useStyle();
    const dispatch = useDispatch();
    const { sub_topic_id } = useParams();
    const forum = useSelector((state) => state.forumReducer.forumSubtopics);
    const [ orderedPost, setOrderedPost ] = useState([]);
    useEffect(()=>{
        if (forum) {
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
            <ThemeProvider theme={theme}>

            
            {
                forum ?
                <>
                    <Container className={classes.title}>
                        <Typography variant='h2' >FORO / {forum.topic.topic_name} / {forum.sub_topic_name}</Typography>
                        <Link to='/forum/crearpost' style={{textDecoration:'none'}}>
                            <Button variant="contained" size="medium" className={styles.stylebtn} color="primary" >Crear Post Foro</Button>
                        </Link>
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
            </ThemeProvider>
        </Container>
    )
}