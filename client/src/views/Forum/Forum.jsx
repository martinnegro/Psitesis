import React, { useEffect, useState } from "react";
import Nav from "../../components/Nav/Nav";
import { makeStyles, createTheme } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import PropTypes from "prop-types";
import Container from "@material-ui/core/Container";
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import TopicCard from './components/TopicCard';
import SubTopicCard from './components/SubTopicCard';
import { getForumHomeInfo } from '../../redux/actions/forumActions';
import { useDispatch,useSelector } from "react-redux"
import PostCard from './components/PostCard';
import { ThemeProvider } from "@material-ui/core/styles";
import { grey } from '@material-ui/core/colors';
import {Link} from 'react-router-dom'
import { purple } from '@material-ui/core/colors';
import style from './Forum.module.css'


const theme = createTheme({
  palette: {
    primary: {
      main: grey[50],
      light: "#ffc4ff",
      dark: "#9c64a6",
      contrastText: "#fff",
    },
    secondary: {
      main: grey[500],
      light: "#ffc4ff",
      dark: "#9c64a6",
      contrastText: "#fff",
    },
  },
});


const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    width: "100%",
    backgroundColor: theme.palette.background.paper,
    justifyContent: "center",
  },
  tab: {
    backgroundColor: "#031927",
  },
  offset: theme.mixins.toolbar,
  title: {
    marginTop: "20px",
    backgroundColor: "purple",
    width: "100%",
    textAlign: "center",
    color: "white",
    display: 'flex',
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between"
  },
  tabsText: {
    color: "#93827F",
  },
  tabs: {
    "& .MuiTabs-flexContainer": {
      justifyContent: "space-around",
    },
    tab:{
      backgroundColor: "#031927"
    },
    offset: theme.mixins.toolbar,
    title:{
        marginTop: '20px',
        backgroundColor: 'purple',
        width: '100%',
        textAlign: 'center',
        color: 'white'
    },
    tabsText:{
      color: "#93827F",
      '&:focus': {
        color: 'white',
      }
    },
    tabs:{
      "& .MuiTabs-flexContainer":{
        justifyContent:'space-around',
      },
      '&:focus': {
        color: 'white',
      }, 
    },  
  },
  lastMssg: {
    width: "100%",
    
  }
}));

const useStyles2 = makeStyles({
	offset: theme.mixins.toolbar,
	root: {
		'color': '#ffffff',
		'backgroundColor': purple[500],
		'&:hover': {
			backgroundColor: purple[700],
		},
    
	},
	modal: {
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
	},
	paper: {
		backgroundColor: theme.palette.background.paper,
		border: '2px solid purple',
		boxShadow: theme.shadows[5],
		padding: theme.spacing(2, 4, 3),
		maxWidth: '80%',
	},
	paper2: {
		backgroundColor: theme.palette.background.paper,
		border: '2px solid purple',
		boxShadow: theme.shadows[5],
		padding: theme.spacing(2, 4, 3),
		maxWidth: '10%',
	},
	Home: {
		marginTop: theme.spacing(5),
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
		justifyContent: 'center',
	},
	tipoh2: {
		'@media (max-width: 601px)': {
			marginTop: 0,
			fontSize: '1.75rem',
			marginBottom: '10px',
		},
	},
	anchoInput: {
		'marginTop': 20,
		'width': '50vw',
		'@media (max-width: 601px)': {
			width: '80vw',
		},
	},
});

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
      styles={{ display: "flex" }}
    >
      {value === index && <Box p={3}>{children}</Box>}
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
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

const Forum = () => {
  const classes = useStyles();
  const classes2 = useStyles2()
  const [value, setValue] = React.useState(0);
  const topicsAndSubtopics = useSelector(
    (state) => state.forumReducer.topicsAndSubtopics
  );
  const last20Post = useSelector((state) => state.forumReducer.last20Post);
  const [ orderedPost, setOrderedPost ] = useState([]); 
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getForumHomeInfo());
  }, [dispatch]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

    useEffect(() => {
      dispatch(getForumHomeInfo());
    }, [dispatch])
    
    useEffect(()=>{
      if (last20Post) {
          const highlighted = last20Post.filter(p => p.post_highlight);
          const unHighlight = last20Post.filter(p => !p.post_highlight);
          highlighted.sort((a,b) => a.createdAt > b.createdAt ? 1 : -1 );
          unHighlight.sort((a,b) => a.createdAt > b.createdAt ? 1 : -1 );
          setOrderedPost([...highlighted,...unHighlight])
      };
  },[last20Post]);
    
    return (
        <Container>
          <ThemeProvider theme={theme}>
             <div className={classes.offset}></div>
        <Nav/>
        <Container className={classes.title}>
            <Typography variant='h2' >Foro</Typography>
      
        </Container>
        <div className={classes.root}>
          <AppBar className = {classes.tab} position="static" color="default" >
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
              <Tab 
                className = {classes.tabsText} 
                label="INICIO" {...a11yProps(0)} 
                />
              <Tab 
                className = {classes.tabsText} 
                label="ULTIMOS MENSAJES" {...a11yProps(1)} 
                />
            </Tabs>
          </AppBar>
         
          
          <TabPanel value={value} index={0}>
            <Container>
              {topicsAndSubtopics ? topicsAndSubtopics.map((topic)=>{
                return(
                  <div>
                    <TopicCard
                      id={topic.topic_id}
                      name={topic.topic_name}
                    ></TopicCard>
                    {topic.subtopics.map((subtopic) => {
                      return (
                        <SubTopicCard
                          id={subtopic.sub_topic_id}
                          name={subtopic.sub_topic_name}
                          description={subtopic.sub_topic_description}
                        ></SubTopicCard>
                      );
                    })}
                  </div>
                );
              })
             : (
              <div>Cargando</div>
            )}
          </Container>
        </TabPanel>
        <TabPanel value={value} index={1}>
          <Container className={classes.lastMssg}>
            {last20Post ? (
              orderedPost.map((p) => <PostCard post={p} />)
            ) : 
              <div>CARGANDO</div>
            }
            </Container>
          </TabPanel>
        </div>
        </ThemeProvider>
      </Container>
    )
}


export default Forum;
