import {React,useEffect} from 'react'
import { useDispatch,useSelector } from 'react-redux';
import { getCommentsReports } from '../../../redux/API';
import {Container} from '@material-ui/core/'
import CommentReportedCard from '../../Forum/components/CommentReportedCard';
import {Link} from 'react-router-dom'
const CommentsReported = () =>{
    const commentsReported = useSelector((state) => state.forumReducer.commentsReports)
    
    const dispatch = useDispatch();
    useEffect(()=>{
        dispatch(getCommentsReports("rep_resolved","false"))
    },[dispatch])
    return(
        <Container>
            {commentsReported ? commentsReported.map((comment)=>{
                return(
                    <CommentReportedCard content = {comment.comment_contents} postId = {comment.post_id} reports = {comment.reports}></CommentReportedCard>
                )
            }) : null}
        </Container>
    )
}

export default CommentsReported