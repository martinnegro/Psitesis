import React from 'react'
import {Link} from 'react-router-dom'
export default function Institutions({id,instName,imageProfile,bio}){
    return(
        <div>
            <img src = {imageProfile} ></img>
            <Link to = {`/institution/${id}`}>     
            <h3>{instName}</h3>
            </Link>
           
        </div>
    )
}