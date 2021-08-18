import {getForumPost} from '../../redux/actions/forumActions'
import {useParams} from 'react-router'
import {useDispatch, useSelector} from 'react-redux'
import { useEffect } from 'react'


export default function ForumPostInfo(){
    const dispatch = useDispatch()
    const {id} = useParams()
    const info = useSelector((state)=> state.forumReducer.forumPosts)
    console.log(info.data)
    useEffect(() => {
        dispatch(getForumPost(id))
    },[dispatch,id])
    return(
        <div>OKKKKKKKKKK</div>
    )
}