import React from 'react'
import Nav from "../../components/Nav/Nav";
import { makeStyles,createTheme } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import PropTypes from 'prop-types';
import Container from "@material-ui/core/Container";
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Topics from '../../components/ForumComponents/Topics/Topics';
const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
      width: '100%',
      backgroundColor: theme.palette.background.paper,
      justifyContent: 'center'
    },
    offset: theme.mixins.toolbar,
    title:{
        marginTop: '20px',
        backgroundColor: 'purple',
        width: '100%',
        textAlign: 'center',
        color: 'white'
    },
    tabs:{
      "& .MuiTabs-flexContainer":{
        justifyContent:'space-around'
      }
    }
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
        styles = {{display: "flex"}}

      >
        {value === index && (
          <Box p={3}>
           {children}
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

 const Forum = () =>{

    const classes = useStyles();
const [value, setValue] = React.useState(0);
const handleChange = (event, newValue) => {
    setValue(newValue);
  };
    return (
        <Container>
             <div className={classes.offset}></div>
      <Nav/>
          <Container className={classes.title}>
              <Typography variant='h2' >Foro</Typography>
          </Container>
          <div className={classes.root}>
          <AppBar position="static" color="default" >
            <Tabs
              value={value}
              onChange={handleChange}
              indicatorColor="primary"
              textColor="primary"
              variant="scrollable"
              scrollButtons="auto"
              aria-label="scrollable auto tabs example"
              className={classes.tabs}
            >
              <Tab label="INICIO" {...a11yProps(0)} />
          <Tab label="ULTIMOS MENSAJES" {...a11yProps(1)} />
            </Tabs>
          </AppBar>
          <TabPanel value={value} index={0}>
              <Topics name = "Topic name example"></Topics>
       
      </TabPanel>
      <TabPanel value={value} index={1}>
      
      </TabPanel>
      </div>
        </Container>
    )
}

export default Forum