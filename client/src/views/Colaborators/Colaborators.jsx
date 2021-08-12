
import React from "react";
import Container from "@material-ui/core/Container";
import { useEffect,useState } from "react";
import { getUsersByRoles,getInstitutions } from "../../redux/actions/actions";
import { useDispatch, useSelector } from "react-redux";
import BiosContainer from "../../components/Bios/BiosContainer";
import Institutions from '../../components/Institutions/Institutions'
import Nav from "../../components/Nav/Nav";
import PropTypes from 'prop-types';
import { makeStyles,createTheme } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import { ThemeProvider } from "@material-ui/core/styles";
import { purple,azul } from "@material-ui/core/colors";
const theme = createTheme({
    palette: {
      primary: {
        main: '#031927',
        light: "#ffc4ff",
        dark: "#9c64a6",
        contrastText: "#fff",
      },
      secondary: {
        main: "#FCFCFF",
        light: "#ffc4ff",
        dark: "#9c64a6",
        contrastText: "#fff",
      },
    },
  });






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
      alignItems: "center",
      width: "85%",
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


function TabPanel(props) {
    const { children, value, index, ...other } = props;
  
    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
        {...other}
      >
        {value === index && (
          <Box p={3}>
            <Typography>{children}</Typography>
          </Box>
        )}
      </div>
    );
  }
  
  TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.any.isRequired,
    value: PropTypes.any.isRequired,
  };

  function a11yProps(index) {
    return {
      id: `simple-tab-${index}`,
      'aria-controls': `simple-tabpanel-${index}`,
    };
  }
  
  

export default function Colaborators(){
    
    const dispatch = useDispatch();
    const usersByRoles = useSelector((state) => state.rootReducer.usersByRoles)
    const institutions = useSelector((state) => state.rootReducer.institutions)
   
   useEffect(()=>{
        dispatch(getUsersByRoles('rol_mALahPQjTe8Re7vf'))
   },[dispatch])

   useEffect(()=>{
    dispatch(getInstitutions())
},[dispatch])

const classes = useStyles();
const [value, setValue] = React.useState(0);

const handleChange = (event, newValue) => {
  setValue(newValue);
};

return (
    <div>
        <div className={classes.offset}></div>
    <Nav/>
    <ThemeProvider theme={theme}>
    <Container className={classes.Home}>
    <div className={classes.root2}>
      <AppBar position="static">
        <Tabs value={value} onChange={handleChange} aria-label="simple tabs example">
          <Tab label="Bios" {...a11yProps(0)} />
          <Tab label="Institutions" {...a11yProps(1)} />
        </Tabs>
      </AppBar>
      <TabPanel value={value} index={0}>
        {usersByRoles ? usersByRoles.map(user =>{
            return(
                <BiosContainer id = {user.user_id_A0}key = {user.user_id} userName = {user.user_name} biography = {user.biography} imgProfile = {user.user_img_profile}></BiosContainer>
            )
        }) : null}
      </TabPanel>
      <TabPanel value={value} index={1}>
       {institutions ? institutions.map(x =>{
           return(
               <Institutions id = {x.inst_id} key = {x.inst_id} instName = {x.inst_name} imgProfile = {x.imgProfile} ></Institutions>
           )
       }) : null}
      </TabPanel>
      {console.log(institutions)}
      
    </div>
   </Container>
   </ThemeProvider>
    </div>
  );

}