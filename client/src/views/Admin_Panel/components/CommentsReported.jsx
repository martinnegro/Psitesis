import {React,useEffect,useState} from 'react'
import { useDispatch,useSelector } from 'react-redux';

import CommentReportedCard from './CommentReportedCard';
import axios from "axios";
import {makeStyles,Container}
 from '@material-ui/core/'
const { REACT_APP_URL_API } = process.env;

const useStyles = makeStyles({
    root: {
      minWidth: 275,
    },
    bullet: {
      display: 'inline-block',
      margin: '0 2px',
      transform: 'scale(0.8)',
    },
    title: {
      fontSize: 14,
    },
    pos: {
      marginBottom: 12,
    },
    link:{
        textDecoration: "none",
        color: "inherit"
    },
    table: {
      minWidth: 650,
    },
    
  });

const CommentsReported = () =>{
    const classes = useStyles();
    const [data,setData] = useState()
    useEffect(async()=>{
        await fetchData("rep_resolved","false")
    },[])

    async function fetchData(prop,value){
        const fetchedData = await axios.get(`${REACT_APP_URL_API}/report?prop=${prop}&value=${value}`)
        setData(fetchedData.data)
    }
    return(
        <Container>
            {console.log(data)}
            
            {data ? data.comments.map((comment)=>{
                return(
                    <CommentReportedCard reports = {comment.reports} fetchData = {fetchData} commentContent = {comment.comment_contents} postId = {comment.post_id} ></CommentReportedCard>
                )
            }) : null}
            {data ? data.posts.map((post)=>{
                return(
                    <CommentReportedCard reports = {post.reports} fetchData = {fetchData} postContent = {post.post_contents} reports = {post.reports} postId = {post.post_id}></CommentReportedCard>
                )
            }): null}
        </Container>
    )
}

export default CommentsReported