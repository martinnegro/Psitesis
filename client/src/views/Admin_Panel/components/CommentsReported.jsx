import {React,useEffect} from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { getCommentsReports } from '../../../redux/API';

const CommentsReported = () =>{
    
    const dispatch = useDispatch();
    useEffect(()=>{
        dispatch(getCommentsReports("rep_resolved","false"))
    },[dispatch])
    return(
        <div>
            <h2>Comments Reported</h2>
        </div>
    )
}

export default CommentsReported