import React, { useEffect } from 'react'
import { getInstitutionBio } from '../../redux/actions/actions'
import CardPost from '../Card/Card'
import { Container } from '@material-ui/core'
import { useDispatch,useSelector } from "react-redux"
import Nav from '../Nav/Nav'
import { makeStyles } from '@material-ui/core/styles';
import { Typography } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
    offset: theme.mixins.toolbar,
    Home: {
      // marginLeft: theme.spacing(15),
      marginTop: theme.spacing(5),
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
    },
  
    root: {
      padding: "2px 4px",
      display: "flex",
      alignItems: "left",
      width: "100%",
      marginTop: "20px",
      marginBottom: "30px",
    },
    root2: {
        flexGrow: 1,
        backgroundColor: theme.palette.background.paper,
        width: "100%"
      },
    input: {
      marginLeft: theme.spacing(1),
      flex: 1,
    },
    iconButton: {
      padding: 10,
    },
  }));

export default function InstitutionBio(props){
    const classes = useStyles();
    const institutionBio = useSelector((state) => state.rootReducer.institutionBio)
    const dispatch = useDispatch();
    useEffect(()=>{
        dispatch(getInstitutionBio(props.match.params.id));
    },[])
    const {articles,institution} = institutionBio

    
    
   return(
       <div>
           <div className={classes.offset}></div>
           <Nav />
           <Container className={classes.Home}>
           <Typography variant="h2" color="initial">
            Institucion bio
          </Typography>
           {institution ? <div>
            <h1>{institution.inst_name}</h1>
            <Typography variant="h4" color="initial">
            Los autores de esta institucion escribieron:
          </Typography>
            {console.log(articles)}
            {articles ? articles[0].map((article)=>{
                
                return(
                    
                    <CardPost key = {article.art_id} title = {article.art_title} body = {article.art_contents} id = {article.user_id} articleId = {article.art_id} articleAbstract = {article.art_abstract}></CardPost>
                )
            }) : null}
           </div>
           : null}

</Container>
           
       </div>
   )
}