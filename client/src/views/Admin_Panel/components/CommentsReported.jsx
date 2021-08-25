import {React,useEffect,useState} from 'react'
import { useDispatch,useSelector } from 'react-redux';
import { getReports } from '../../../redux/API';
import {Container} from '@material-ui/core/'
import CommentReportedCard from './CommentReportedCard';
import axios from "axios";
const { REACT_APP_URL_API } = process.env;
const CommentsReported = () =>{
    const [data,setData] = useState()
    /* const commentsReported = useSelector((state) => state.forumReducer.reports.comments)
    const postsReported = useSelector((state) => state.forumReducer.reports.posts) */
    const dispatch = useDispatch();
    

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
                    <CommentReportedCard dataPosts = {post.reports} fetchData = {fetchData} postContent = {post.post_contents} reports = {post.reports} postId = {post.post_id}></CommentReportedCard>
                )
            }): null}
        </Container>
    )
}

export default CommentsReported