import {
  Container,
  Typography,
  Box,
  Avatar,
  Input,
  makeStyles,
  IconButton,
  Paper,
  Button,
  Divider,
} from "@material-ui/core";
import EditIcon from "@material-ui/icons/Edit";
import DoneIcon from "@material-ui/icons/Done";
import CloseIcon from "@material-ui/icons/Close";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";
import ReportTwoToneIcon from "@material-ui/icons/ReportTwoTone";
import ReplyIcon from "@material-ui/icons/Reply";
import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Nav from "../../components/Nav/Nav";
import CommentCard from "../Forum/components/CommentCard";
import ConfirmDeleteAlert from "./components/ConfirmDeleteAlert";
import Comment from "../Forum/components/Comment";
import { purple } from "@material-ui/core/colors";
import { getUserDetail } from "../../redux/actions/usersActions";
import { highlightPost } from "../../redux/API";
import axios from "axios";
import ReactQuill from "react-quill";
import ReactPaginate from "react-paginate";
import s from "./Forum_Post.module.css";
import Report from "../Forum/components/Report";
import { userHasPermission } from "../../utils/roles";
import Link from "react-router-dom";
import NavBottom from "../../components/NavBottom/NavBottom";


const { REACT_APP_URL_API } = process.env;

const useStyle = makeStyles((theme) =>({
  offset: theme.mixins.toolbar,
  root: {
    padding: 0,
    margin: "0 auto",
    width: "1000px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    "@media (max-width: 601px)": {
      maxWidth: "100vw",
      margin: 0,
    },
  },
  main: {
    padding: 0,
  },
  buttonGroup: {
    width: "50%",
    margin: "0 auto 10px auto",
    display: "flex",
    justifyContent: "space-evenly",
    "@media (max-width: 601px)": {
      maxWidth: "100vw",
      display: "flex",
      flexDirection: "row",
      justifyContent: "space-around",
    },
  },
  margin5: {
    "@media (max-width: 601px)": {
      fontSize: 8,
      padding: 2,
      margin: 3,
      color: "#ffffff",
      backgroundColor: '#031927',
    },
  },
  postContainer: {
    padding: "10px",
    "@media (max-width: 601px)": {
      padding: 0
    },
  },
  header: {
    width: "100%",
    margin: "10px 0 10px 0",
    display: "flex",
    alignItems: "baseline",
    justifyContent: "space-evenly",
    "@media (max-width: 601px)": {
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      margin: '0 auto',
      alignItems: 'center',
      paddingTop: '10px',
    },
  },
  info: {
    margin: "10px 0 10px 0",
    display: "flex",
    alignSelf: "start",
    alignItems: "center",
    justifyContent: "start",
    "@media (max-width: 601px)": {
     paddingLeft: 10,
    },
  },
  avatar: {
    margin: "0 5px 0 5px",
    width: "3rem",
    height: "3rem",
  },
  textField: {
    width: "100%",
  },
  commentsArea: {
    width: "1000px",
    margin: "20px auto 0 auto",
    padding: "5px",
    "@media (max-width: 601px)": {
      width: "100vw",
    },
  },
  commentsContainer: {
    width: "100%",
  },

  hide: {
    display: "none",
  },
  respondAndPaginate: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    "@media (max-width: 601px)": {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
  },
  replyButton: {
    color: "#ffffff",
    backgroundColor: '#031927',
    width: '20vw',
    "&:hover": {
      backgroundColor: '#031927',
    },
    "@media (max-width: 601px)": {
      fontSize: 10,
      width: '60vw',
    },
  },
  paginate: {
    marginTop: "0px",
    width: "25%",
  },
  buttonContainer: {
    display: "flex",
    justifyContent: "center",
    margin: "5px",
    "@media (max-width: 601px)": {
      width: "100vw",
      margin: 0,
      padding: 0,
    },
  },
  btnRepotar: {
    margin: "5px",
    backgroundColor: 'transparent',
    "&:hover": {
      backgroundColor: 'transparent',
      color: purple[500],
    },
    color: purple[700],
    "@media (max-width: 601px)": {     
      margin: '10 auto',
      padding: 5,
    },
  },
  btnText: {
    fontSize: "15px",
    "@media (max-width: 601px)": {
      fontSize: 10,
      margin: "5 0",
      padding: 5,
    },
  },
  letra10: {
    "@media (max-width: 601px)": {
      fontSize: 10,
    },
  },
  editado10: {
    "@media (max-width: 601px)": {
      fontSize: 10,
      margin: '0 auto',
      alignItems: 'center',
      textAlign: 'center',
    },
  },
  letra15: {
    "@media (max-width: 601px)": {
      fontSize: 15,
    },
  },
}));

function Forum_Post() {
  const classes = useStyle();
  const userId = useSelector((state) => state.authReducer.user.user_id);
  const user = useSelector((state) => state.authReducer.user);
  const dispatch = useDispatch();
  const { post_id } = useParams();
  const history = useHistory();
  const [post, setPost] = useState();
  const [editing, setEditing] = useState({ isEditing: false });
  const [previous, setPrevious] = useState();
  const [openAlertDelete, setOpenAlertDelete] = useState(false);
  const [okDelete, setOkDelete] = useState(false);
  const [commentIdForResponse, setCommentIdForResponse] = useState();
  const [commentComponent, setCommentComponent] = useState(false);
  const [orderedComments, setOrderedComments] = useState([]);
  const [pageNumber, setPageNumber] = useState(0);
  const postsByPage = 9;
  const pagesVisited = pageNumber * postsByPage;
  const pageCount = Math.ceil(orderedComments.length / postsByPage);
  const [report, setReport] = useState(false);

  useEffect(async () => {
    fetchPostData();
  }, []);

  const fetchPostData = async (data) => {
    if (!data) {
      const fetchedPost = await axios.get(
        `${REACT_APP_URL_API}/forumposts/${post_id}`
      );
      data = fetchedPost.data;
    }
    if (!data) return;
    const highlighted = data.comments.filter((c) => c.comment_highlight);
    const unHighlight = data.comments.filter((c) => !c.comment_highlight);
    highlighted.sort((a, b) => (a.createdAt < b.createdAt ? -1 : 1));
    unHighlight.sort((a, b) => (a.createdAt < b.createdAt ? -1 : 1));
    setOrderedComments([...highlighted, ...unHighlight]);
    setPost(data);
    setEditing({
      isEditing: false,
      post_contents: data.post_contents,
      post_title: data.post_title,
    });
    console.log(data);
  };

  useEffect(() => {
    if (userId) {
      dispatch(getUserDetail(userId));
    }
  }, [dispatch, userId]);

  // LOGICA PARA EDITAR TÍTULO y CONTENIDO
  const handleWantEdit = () => {
    setPrevious({
      post_contents: editing.post_contents,
      post_title: editing.post_title,
    });
    setEditing((state) => {
      return { ...state, isEditing: true };
    });
  };
  const handleOnChange = (e) => {
    const state = editing;
    setEditing({
      ...state,
      post_contents: e,
    });
  };
  const handleCancelEditing = () => {
    setEditing({
      isEditing: false,
      post_title: previous.post_title,
      post_contents: previous.post_contents,
    });
    setPrevious({});
  };
  const handleConfirmEditing = async () => {
    try {
      const response = await axios.put(
        `${REACT_APP_URL_API}/forumposts/edit/${post.post_id}`,
        editing
      );
      alert(response.message);
      fetchPostData();
    } catch (err) {
      alert(err.message);
      handleCancelEditing();
    }
  };

  // FIND RESPONDING TO USER NAME

  const handleCommentComponent = (_e, response_to_comment_id) => {
    commentComponent ? setCommentComponent(false) : setCommentComponent(true);
    setCommentComponent(true);
    setCommentIdForResponse(response_to_comment_id);
  };
  // LOGICA PARA ABRIR Y CERRAR THREAD
  const handleStatusThread = async () => {
    try {
      const response = await axios.put(
        `${REACT_APP_URL_API}/forumposts/thread_status/${post.post_id}`
      );
      fetchPostData();
    } catch (err) {
      alert(err.message);
    }
  };

  // LOGICA PARA BORRAR POST Y MANEJAR ALERTAS
  const handleConfirmDeletePost = async () => {
    try {
      const response = await axios.delete(
        `${REACT_APP_URL_API}/forumposts/delete/${post.post_id}`
      );
      setOpenAlertDelete(false);
      setOkDelete(true);
      setTimeout(() => {
        history.push("/forum");
      }, 3000);
    } catch (err) {
      alert("No delete");
    }
  };

  // HANDLE COMMENT COMPONENT

  const respondingToComment = (postId, arr) => {
    return arr.find((post) => post.comment_id === postId);
  };
  const handleCancellComment = () => {
    setCommentComponent(false);
  };

  // HANDLE HIGHLIGHT POST
  const handleHighlightPost = async () => {
    try {
      await highlightPost(post_id);
      fetchPostData();
    } catch (err) {
      alert("No update!");
    }
  };

  // PAGINATION
  const changePage = ({ selected }) => {
    setPageNumber(selected);
  };

  const handleReport = () => {
    setReport(true);
  };

  const cancellReport = () => {
    setReport(false);
  };

  return (
    <>
    <div className={classes.offset}></div>
      <Nav />
      <br />
      <Container className={classes.root}>
        {/*-/////////////////////////////////////////////////////////////-*/}
        {/*-/////////////////----ACCIONES DE POST ---////////////////////-*/}
        {post ? (
          <Container className={classes.main}>
            <Box className={classes.buttonGroup}>
              {/*-/////////////////////////////------EDICION------////////////////////////////////-*/}
              {editing.isEditing ? (
                <>
                  <IconButton>
                    <DoneIcon onClick={handleConfirmEditing} />
                  </IconButton>
                  <IconButton onClick={handleCancelEditing}>
                    <CloseIcon />
                  </IconButton>
                </>
              ) : userHasPermission(
                  user.roles[0],
                  ["superadmin", "admin"],
                  post.user.user_id_A0,
                  userId
                ) ? (
                <IconButton onClick={handleWantEdit}>
                  <EditIcon />
                </IconButton>
              ) : null}
              {/*-//////////////////------ABRIR Y CERRAR THREAD------////////////////////-*/}
              {userHasPermission(
                user.roles[0],
                ["superadmin", "admin"],
                true,
                false
              ) ? (
                <Button
                  onClick={handleStatusThread}
                  variant="contained"
                  disableElevation
                  className={classes.margin5}
                >
                  {post.post_open ? "Cerrar Thread" : "Abrir Thread"}
                </Button>
              ) : null}
              {/*-//////////////////------DESTACAR POST------////////////////////-*/}
              {userHasPermission(
                user.roles[0],
                ["superadmin", "admin"],
                true,
                false
              ) ? (
                <Button
                  onClick={handleHighlightPost}
                  variant="contained"
                  disableElevation
                  className={classes.margin5}
                >
                  {post.post_highlight ? "Eliminar Destacado" : "Destacar Post"}
                </Button>
              ) : null}
              {/*-//////////////////------ELIMINAR POST------////////////////////-*/}
              {userHasPermission(
                user.roles[0],
                ["superadmin", "admin"],
                post.user.user_id_A0,
                userId
              ) ? (
                <IconButton
                  color="secondary"
                  onClick={() => setOpenAlertDelete(true)}
                >
                  <DeleteForeverIcon />
                </IconButton>
              ) : null}
              <ConfirmDeleteAlert
                open={openAlertDelete}
                openOkDelete={okDelete}
                handleConfirm={handleConfirmDeletePost}
                handleCancel={() => setOpenAlertDelete(false)}
                post_title={post.post_title}
              />
            </Box>
            {/*-//////////////////------CONTENEDOR DEL POST------////////////////////-*/}
            <Paper className={classes.postContainer}>
              <Box className={classes.header}>
                {editing.isEditing ? (
                  <Input
                    value={editing.post_title}
                    name="post_title"
                    onChange={handleOnChange}
                  />
                ) : (
                  <Typography
                    variant="h3"
                    color="initial"
                    className={classes.letra15}
                  >
                    {editing.post_title}
                  </Typography>
                )}
                <Typography color="textSecondary" className={classes.letra10}>
                  en {post.subtopic.topic.topic_name.toUpperCase()} /{" "}
                  {post.subtopic.sub_topic_name.toUpperCase()}
                </Typography>
              </Box>
              {post.post_edited ? (
                <Typography color="textSecondary" className={classes.editado10}>(EDITADO)</Typography>
              ) : (
                <></>
              )}
              {/*-//////////////////------USER INFO------////////////////////-*/}
              <Box className={classes.info}>
                <Avatar
                  className={classes.avatar}
                  alt={post.user.user_name}
                  src={post.user.user_img_profile}
                />
                <Box>
                  <Typography color="textSecondary" className={classes.letra10}>
                    {post.post_date}
                  </Typography>
                  <Typography
                    variant="body2"
                    color="textSecondary"
                    className={classes.letra10}
                  >
                    Por {post.user.user_name}
                  </Typography>
                </Box>
              </Box>
              <Box>
                {editing.isEditing ? (
                  <ReactQuill
                    value={editing.post_contents}
                    name="post_contents"
                    onChange={handleOnChange}
                    modules={Forum_Post.modules}
                    formats={Forum_Post.formats}
                  />
                ) : (
                  <Paper variant="outlined" style={{ padding: 5 }}>
                    <Typography>
                      <span
                        dangerouslySetInnerHTML={{
                          __html: `${editing.post_contents}`,
                        }}
                      />
                    </Typography>
                  </Paper>
                )}
              </Box>
              {/*-//////////////////------REPORTAR POST------////////////////////-*/}
              <Container className={classes.buttonContainer}>
                <Button
                  onClick={handleReport}
                  variant="contained"
                  disableElevation
                  className={classes.btnRepotar}
                >
                  <ReportTwoToneIcon />
                  <span className={classes.btnText}>Reportar</span>
                </Button>
                <Report
                  open={report}
                  postId={post_id}
                  cancellReport={cancellReport}
                  content={post.post_contents}
                />
              </Container>

              {post.post_open ? (
                <></>
              ) : (
                <Typography color="textSecondary">
                  La sección de comentarios ha sido cerrada.
                </Typography>
              )}
            </Paper>
          </Container>
        ) : (
          <div className={classes.root}>CARGANDO</div>
        )}

        {/*-//////////////////------BOTON POST Y PAGINADO------////////////////////-*/}
        <Paper className={classes.commentsArea}>
          <Box className={classes.respondAndPaginate}>
            {post?.post_open && (
              <Button
                className={commentComponent ? classes.hide : null}
                onClick={(e) => handleCommentComponent(e, null)}
                startIcon={<ReplyIcon />}
                className={classes.replyButton}
              >
                Responder Post
              </Button>
            )}

            <ReactPaginate
              className={classes.paginate}
              previousLabel={"<"}
              nextLabel={">"}
              pageCount={pageCount}
              onPageChange={changePage}
              containerClassName={s.paginationBttns}
              previousLinkClassName={s.previousBttn}
              nextLinkClassName={s.nextBttn}
              disabledClassName={s.paginationDisabled}
              activeClassName={s.paginationActive}
            />
          </Box>
          {/*//////////////////////////////////////////////////////////////////////*/}
          {/*//////////////////////////////////////////////////////////////////////*/}
          {/* --------- COMMENTS ----------*/}
          <Container className={classes.commentsContainer}>
            {post ? (
              orderedComments
                ?.slice(pagesVisited, pagesVisited + postsByPage)
                .map((comment) => {
                  return (
                    <CommentCard
                      fetchPostData={fetchPostData}
                      comment={comment}
                      handleCommentComponent={handleCommentComponent}
                      respondedComment={respondingToComment(
                        comment.response_to_comment_id,
                        post.comments
                      )}
                    />
                  );
                })
            ) : (
              <div className={classes.root}>CARGANDO</div>
            )}
            {/*//////////////////////////////////////////////////////////////////////*/}
          </Container>
          {commentComponent ? (
            <Comment
              fetchPostData={fetchPostData}
              handleCancellComment={handleCancellComment}
              response_to_comment_id={commentIdForResponse}
            />
          ) : null}
          {/*//////////////////////////////////////////////////////////////////////*/}
          {/*//////////////////////////////////////////////////////////////////////*/}
          {/*-//////////////////------PAGINADO Y COMENTAR------////////////////////-*/}
          <Box className={classes.respondAndPaginate}>
            {post?.post_open && (
              <Button
                id="comments"
                className={commentComponent ? classes.hide : null}
                onClick={(e) => handleCommentComponent(e, null)}
                startIcon={<ReplyIcon />}
                className={classes.replyButton}
              >
                Responder Post
              </Button>
            )}

            <ReactPaginate
              className={classes.paginate}
              previousLabel={"<"}
              nextLabel={">"}
              pageCount={pageCount}
              onPageChange={changePage}
              containerClassName={s.paginationBttns}
              previousLinkClassName={s.previousBttn}
              nextLinkClassName={s.nextBttn}
              disabledClassName={s.paginationDisabled}
              activeClassName={s.paginationActive}
            />
          </Box>
        </Paper>
      </Container>
      <br />
      <br />
      <br />
      <br />
      <NavBottom />
    </>
  );
}

Forum_Post.modules = {
  toolbar: [
    [{ header: "1" }, { header: ["2", "3", "4", "5", "6"] }],
    [{ size: [] }],
    ["bold", "italic", "underline", "blockquote"],
    [{ list: "ordered" }, { list: "bullet" }],
    ["link", "image"],
    [{ align: [] }],
    [{ color: [] }],
  ],
};

Forum_Post.formats = [
  "header",
  "font",
  "size",
  "bold",
  "italic",
  "underline",
  "blockquote",
  "list",
  "bullet",
  "link",
  "image",
  "align",
  "color",
];

export default Forum_Post;
