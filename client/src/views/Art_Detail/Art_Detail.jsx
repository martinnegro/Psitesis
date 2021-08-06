import React, { useState, useEffect } from "react";
import Nav from "../../components/Nav/Nav";
import { useSelector, useDispatch } from "react-redux";

import {
  getArticleDetail,
  clearDetail,
  getAllUsers,
} from "../../redux/actions/actions";
import { useParams } from "react-router-dom";
import { Container, makeStyles, Typography } from "@material-ui/core";
import s from "./Art_Detail.module.css";

const useStyles = makeStyles((theme) => ({
  offset: theme.mixins.toolbar,
  Home: {
    // marginLeft: theme.spacing(15),
    margin: theme.spacing(5),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
}));

const Art_Detail = () => {
  const { id } = useParams();

  const dispatch = useDispatch();
  const articlesDetail = useSelector((state) => state.articlesDetail);
  const users = useSelector((state) => state.users);
  const [idUser, setIdUser] = useState([]);

  const classes = useStyles();

  const subCats = [
    { name: "Metodologia de investigación", id: 1 },
    { name: "Elección de tema", id: 2 },
    { name: "Citado en el texto", id: 3 },
    { name: "Referencias bibliográficas", id: 4 },
  ];

  useEffect(() => {
    dispatch(getArticleDetail(id));
    return () => dispatch(clearDetail());
  }, [id, dispatch]);

  useEffect(() => {
    dispatch(getAllUsers());
  }, [dispatch]);

  useEffect(() => {
    setIdUser(users?.filter((u) => u.user_id === articlesDetail?.user_id));
  }, [articlesDetail?.user_id, users]);

  const [section, setSection] = useState([]);

  useEffect(() => {
    setSection(subCats.filter((c) => c.id === articlesDetail?.sub_cat_id));
  }, [articlesDetail?.sub_cat_id]);

  return (
    <Container>
      <div className={classes.offset}></div>
      <Nav />
      {articlesDetail !== undefined ? (
        <Container className={classes.Home}>
          <div className={s.perfil}>
            <div>
              <Typography variant="body2">
                Sección: {section[0]?.name}
              </Typography>
            </div>
            <div className={s.perfil2}>
              <Typography variant="body2">{idUser[0]?.user_name}</Typography>
              &nbsp;
              <Typography variant="body2">el {articlesDetail?.art_date}</Typography>
            </div>
          </div>

          <Typography variant="h2" color="initial">
            {articlesDetail.art_title}
          </Typography>
          <br/>
          <Typography align='justify' variant="body2" component="p">
            <span
              dangerouslySetInnerHTML={{
                __html: articlesDetail.art_contents,
              }}
            />
          </Typography>
          <br></br>
          {/* <div className={s.perfil}>
            <Typography variant="body2">Sección: {section[0]?.name}</Typography>
          </div> */}
        </Container>
      ) : (
        <div className={`${s.lds_ring} ${s.centrar}`}>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </div>
      )}
    </Container>
  );
};

export default Art_Detail;
