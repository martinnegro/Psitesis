import React from 'react';
import Nav from "../../components/Nav/Nav";
import { Container, makeStyles, Typography } from "@material-ui/core";
import { NavLink,useParams } from 'react-router-dom';
import CloudDoneOutlinedIcon from '@material-ui/icons/CloudDoneOutlined';

const useStyles = makeStyles(theme => ({
    offset: theme.mixins.toolbar,
    Home: {
        // marginLeft: theme.spacing(15),
        margin: theme.spacing(5),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center'
    },
}))

const PostOk = () => {
    const {accion} = useParams();

    const classes = useStyles();

    return ( 
    
        <Container>
            <div className={classes.offset}></div>
            <Nav />
           
                    <Container className={classes.Home}>
                        <CloudDoneOutlinedIcon fontSize='large' />                       
                            <Typography variant="h2">{accion} con éxito</Typography>&nbsp; 
                            <Typography variant="overline">
                                <NavLink to='/home'>
                                    Ir al home
                                </NavLink>
                            </Typography>                        
                    </Container>
                
        
        </Container> 
        );
}
 
export default PostOk;