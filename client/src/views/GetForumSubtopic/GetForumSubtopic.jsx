import {getForumSubtopic} from '../../redux/actions/forumActions'
import {useParams} from 'react-router'
import {useDispatch, useSelector} from 'react-redux'
import { useEffect } from 'react'
import PostCard from '../Forum/components/PostCard'
export default function GetForumSubTopic(){
    const dispatch = useDispatch()
    const {id} = useParams()
    const forum = useSelector((state) => state.rootReducer.forumSubtopics)
    console.log(forum)
    
    useEffect(() => {
        dispatch(getForumSubtopic(id))
    },[dispatch, id])
  
    return(
        <div>
            {forum?.length > 0?
            forum?.map((f)=>(
                <PostCard post={f}/> 
           )):<div>Sin Posts </div>    
        }
        </div>
    )
}