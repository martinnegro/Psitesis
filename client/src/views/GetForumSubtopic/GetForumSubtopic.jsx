import React from "react";
import { getForumSubtopic } from "../../redux/actions/forumActions";
import { useParams, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import {
  Container,
  Typography,
  makeStyles,
  createTheme,
  Fab,
} from "@material-ui/core";
import PostCard from "../Forum/components/PostCard";
import Nav from "../../components/Nav/Nav";
import styles from "./GetForumSubtopic.module.css";
import { highlightPost } from "../../redux/API";
import { Link } from "react-router-dom";
import { Button } from "@material-ui/core";
import { ThemeProvider } from "@material-ui/core/styles";
import { purple } from "@material-ui/core/colors";
import NavBottom from "../../components/NavBottom/NavBottom";
import LibraryAddIcon from "@material-ui/icons/LibraryAdd";

const theme = createTheme({
  palette: {
    primary: {
      main: purple[500],
      light: "#ffc4ff",
      dark: "#9c64a6",
      contrastText: "#fff",
    },
    secondary: {
      main: purple[500],
      light: "#ffc4ff",
      dark: "#9c64a6",
      contrastText: "#fff",
    },
  },
});

const useStyle = makeStyles({
    offset: theme.mixins.toolbar,
  root: {
    margin: "100px auto 0 auto",
    '@media (max-width: 601px)': {
        marginTop: 0,
        padding: 0
    },
  },
  title: {
    marginTop: "20px",
    backgroundColor: "purple",
    width: "100%",
    textAlign: "center",
    color: "white",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    "@media (max-width: 601px)": {
        display: "none",
      },
  },
  subTitle: {
    marginTop: "0",
    padding: "5px 0 5px 0",
    backgroundColor: "#031927",
    width: "100%",
    textAlign: "center",
    color: "white",
    "@media (max-width: 601px)": {
        padding: "15px 0",
       '& .MuiTypography-h5':{
        fontSize: '1rem',
       }
      },
  },
  cardsContainer: {
    width: "100%",
    "@media (max-width: 601px)": {
      padding: 0
     }
  },
  stylebtn: {
    backgroundColor: "purple",
  },
  fab: {
    display: "none",
    "@media (max-width: 601px)": {
      display: "flex",
      margin: 0,
      top: "auto",
      right: "-10px",
      bottom: 59,
      left: "auto",
      position: "fixed",
      paddingBottom: "6px",
      paddingTop: "5px",
      justifyContent: "flex-end",
    },
  },
});

export default function GetForumSubTopic() {
  const classes = useStyle();
  const dispatch = useDispatch();
  const { sub_topic_id } = useParams();
  const forum = useSelector((state) => state.forumReducer.forumSubtopics);
  const [orderedPost, setOrderedPost] = useState([]);
  const history = useHistory();
  useEffect(() => {
    if (forum) {
      const highlighted = forum.forumposts.filter((p) => p.post_highlight);
      const unHighlight = forum.forumposts.filter((p) => !p.post_highlight);
      highlighted.sort((a, b) => (a.createdAt < b.createdAt ? 1 : -1));
      unHighlight.sort((a, b) => (a.createdAt < b.createdAt ? 1 : -1));
      setOrderedPost([...highlighted, ...unHighlight]);
    }
  }, [forum]);

  useEffect(() => {
    dispatch(getForumSubtopic(sub_topic_id));
  }, [dispatch, sub_topic_id]);

  return (
    <Container className={classes.root}>
     
      <ThemeProvider theme={theme}>
      <div className={classes.offset}></div> 
      <Nav />
        {forum ? (
          <>
            <Container className={classes.title}>
              <Typography variant="h2" >
                FORO / {forum.topic.topic_name} / {forum.sub_topic_name}
              </Typography>
              <Link to="/forum/crearpost" style={{ textDecoration: "none" }}>
                <Button
                  variant="contained"
                  size="medium"
                  className={styles.stylebtn}
                  color="primary"
                >
                  Crear Post Foro
                </Button>
              </Link>
            </Container>
            <Container className={classes.subTitle}>
              <Typography variant="h5">
                {forum.sub_topic_description}
              </Typography>
            </Container>
            <Container className={classes.cardsContainer}>
              {orderedPost.map((f) => (
                <PostCard post={f} />
              ))}
            </Container>
          </>
        ) : (
          <div>Sin Posts </div>
        )}
        <Container className={classes.fab}>
          <Fab
            style={{ backgroundColor: "#031927", color: "white" }}
            aria-label="add"
          >
            <LibraryAddIcon onClick={() => history.push("/forum/crearpost")} />
          </Fab>
        </Container>
      </ThemeProvider>
      <br />
      <br />
      <br />
      <br />
      <NavBottom />
    </Container>
  );
}
