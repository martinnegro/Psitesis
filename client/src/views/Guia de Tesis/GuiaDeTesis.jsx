import React, { useEffect } from 'react';
import Nav from "../../components/Nav/Nav";
import Container from "@material-ui/core/Container";
import { makeStyles, Typography } from "@material-ui/core";
import { getAllCatSub,  } from '../../redux/actions/actions';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import TabPanel from '../../components/TabPanel/TabPanel'
  
TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `scrollable-auto-tab-${index}`,
    'aria-controls': `scrollable-auto-tabpanel-${index}`,
  };
}

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

export default function GuiaDeTesis() {

    const dispatch = useDispatch();
    const classes = useStyles();
    const [value, setValue] = React.useState(0);
    const categories = useSelector((state) => state.rootReducer.cat_sub?.cats);

    useEffect(() => {
    dispatch(getAllCatSub())
    }, [dispatch]);
    
    const handleChange = (event, newValue) => {
        console.log('newValue: ',newValue)
      setValue(newValue);
    };
      
    return (
        <Container>
            <div className={classes.offset}></div>
            <Nav/>
                <Container className={classes.title}>
                    <Typography variant='h2' >Guía de Tesis</Typography>
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
                    {
                        categories?.length > 0 ?
                        categories.map(c => (
                            <Tab label={c.cat_name} key={c.cat_id} id={c.cat_id} {...a11yProps(0)} />
                        )): null
                    }
                  </Tabs>
                </AppBar>
                {
                    categories?.length > 0 ?
                    categories.map((c, i) => (
                        <TabPanel value={value} id={c.cat_id} index={i}/>
                    )): null
                }
            </div>
        </Container> 
    )
}

