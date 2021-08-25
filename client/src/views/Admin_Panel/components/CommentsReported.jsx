import {React,useEffect,useState} from 'react'
import CommentReportedCard from './CommentReportedCard';
import axios from "axios";
import {makeStyles,Container} from '@material-ui/core/'
 import ToggleButton from '@material-ui/lab/ToggleButton';
import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup';
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
  const [resolve, setResolve] = useState('unresolved');

  const handleResolve = (event, newAlignment) => {
    setResolve(newAlignment);
  };

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
          {console.log(resolve)}
           <ToggleButtonGroup
      value={resolve}
      exclusive
      onChange={handleResolve}
      aria-label="text alignment"
    >
      <ToggleButton  className = {classes.button} onClick = {() => {fetchData("rep_resolved","false")}} value = {false} aria-label="left aligned">
       <p>Sin resolver</p>
      </ToggleButton>
      <ToggleButton onClick = {() => {fetchData("rep_resolved","true")}} value = {true} aria-label="centered">
        Resueltos
      </ToggleButton>
    </ToggleButtonGroup>
  
            {data ? data.comments.map((comment)=>{
                return(
                    <CommentReportedCard resolve = {resolve} reports = {comment.reports} fetchData = {fetchData} commentContent = {comment.comment_contents} postId = {comment.post_id} ></CommentReportedCard>
                )
            }) : null}
            {data ? data.posts.map((post)=>{
                return(
                    <CommentReportedCard resolve = {resolve} reports = {post.reports} fetchData = {fetchData} postContent = {post.post_contents} reports = {post.reports} postId = {post.post_id}></CommentReportedCard>
                )
            }): null}
        </Container>
    )
}

export default CommentsReported