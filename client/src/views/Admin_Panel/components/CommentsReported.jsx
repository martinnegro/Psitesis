import {React,useEffect} from 'react'
import { useDispatch,useSelector } from 'react-redux';
import { getReports } from '../../../redux/API';
import {Container} from '@material-ui/core/'
import CommentReportedCard from './CommentReportedCard';
const CommentsReported = () =>{
    const commentsReported = useSelector((state) => state.forumReducer.reports.comments)
    const postsReported = useSelector((state) => state.forumReducer.reports.posts)
    const dispatch = useDispatch();
    useEffect(()=>{
        dispatch(getReports("rep_resolved","false"))
    },[])
    return(
        <Container>
            {commentsReported ? commentsReported.map((comment)=>{
                return(
                    <CommentReportedCard getReports = {getReports} content = {comment.comment_contents} postId = {comment.post_id} reports = {comment.reports}></CommentReportedCard>
                )
            }) : null}
            {postsReported ? postsReported.map((post)=>{
                return(
                    <CommentReportedCard content = {post.post_contents} reports = {post.reports}></CommentReportedCard>
                )
            }): null}
        </Container>
    )
}

export default CommentsReported