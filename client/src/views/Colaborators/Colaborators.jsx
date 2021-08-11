import axios from "axios";
import React from "react";
import Container from "@material-ui/core/Container";
import { useEffect } from "react";
import { getUsersByRoles } from "../../redux/actions/actions";
import { useDispatch, useSelector } from "react-redux";
import BiosContainer from "../../components/Bios/BiosContainer";
import Nav from "../../components/Nav/Nav";
import { useAuth0 } from "@auth0/auth0-react";
export default function Colaborators(){
    const dispatch = useDispatch();
    const usersByRoles = useSelector((state) => state.rootReducer.usersByRoles)
   
   useEffect(()=>{
        dispatch(getUsersByRoles('rol_mALahPQjTe8Re7vf'))
   },[dispatch])
  

    return <Container>
        <h1>Colaborators</h1>

        <button><h2>Bios</h2></button>
        <button><h2>Instituciones</h2></button>
        {usersByRoles?.length > 0 ? usersByRoles.map(x =>{
            return(
                <BiosContainer key = {x.user_name} userName = {x.user_name} biography = {x.biography} imgProfile = {x.user_img_profile}></BiosContainer>
            )
        }) : null}
    </Container>
}