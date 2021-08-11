import axios from "axios";
import React from 'react'
import { useEffect } from "react";
import { getUsersByRoles } from "../../redux/actions/actions";
import { useDispatch, useSelector } from "react-redux";

export default function BiosContainer({userName,biography,imgProfile}){
    
  /*   useEffect(()=>{
        const dispatch = useDispatch();
        useEffect(()=>{
             dispatch(getUsersByRoles(1))
        },[dispatch])
    }) */
    return(
        <div>
            <h3>{userName}</h3>
            <h4>{imgProfile}</h4>
            <h4>{biography}</h4>
        </div>
    )
}