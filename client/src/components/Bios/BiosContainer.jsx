
import React from 'react'
import {Link} from 'react-router-dom'
export default function BiosContainer({id,userName,biography,imgProfile}){
    
    return(
        <div>
            <Link to = {`'/user/${id}`}><h3>{userName}</h3></Link>
            <img src = {imgProfile} ></img>
            
        </div>
    )
}