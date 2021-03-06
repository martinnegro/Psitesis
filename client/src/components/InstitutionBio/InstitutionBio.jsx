import React, { useEffect } from "react";
import { getInstitutionBio } from "../../redux/actions/actionsInstitutions";
import CardPost from "../Card/CardHome";
import { useDispatch, useSelector } from "react-redux";
import Nav from "../Nav/Nav";
import { makeStyles } from "@material-ui/core/styles";
import { Typography } from "@material-ui/core";
import Avatar from "@material-ui/core/Avatar";
import { deepOrange, green } from "@material-ui/core/colors";
import Divider from "@material-ui/core/Divider";
import Container from "@material-ui/core/Container";
import user from "../../assets/user.jpg";
import NavBottom from "../NavBottom/NavBottom";

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
    width: "100%",
  },
  input: {
    marginLeft: theme.spacing(1),
    flex: 1,
  },
  iconButton: {
    padding: 10,
  },
  square: {
    color: theme.palette.getContrastText(deepOrange[500]),
    backgroundColor: deepOrange[500],
    width: theme.spacing(15),
    height: theme.spacing(15),
  },
  estiloH4: {
    "@media (max-width: 601px)": {
      fontSize: "1rem",
    },
  },
  spanTipography: {
    "@media (max-width: 601px)": {
      display: 'flex', 
      flexDirection: 'row', 
      justifyContent: 'center', 
      marginTop: 10,
    },
  }
}));

export default function InstitutionBio(props) {
  const classes = useStyles();
  const institutionBio = useSelector(
    (state) => state.institutionsReducer.institutionBio
  );
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getInstitutionBio(props.match.params.id));
  }, []);

  return (
    <>
      {institutionBio ? (
        <div>
          <div className={classes.offset}></div>
          <Nav />
          <Container className={classes.Home}>
            <Avatar
              variant="square"
              src={institutionBio.institution?.inst_logo || user}
              className={classes.square}
            ></Avatar>
            <Typography variant="h2" color="initial">
              {institutionBio.institution?.inst_name}
            </Typography>
            <Divider />
            <Typography variant="h4" color="initial">
              {/* Bio */}
            </Typography>
            <Typography variant="p" color="initial">
              {institutionBio.institution?.inst_descriptions}
            </Typography>
            <Divider />
            {institutionBio.institution ? (
              <div>
                <span className={classes.spanTipography}>
                  <Typography
                    variant="h4"
                    color="initial"
                    className={classes.estiloH4}
                  >
                    Los autores de esta institucion escribieron:
                  </Typography>
                </span>

                <Container
                  style={{
                    display: "flex",
                    flexWrap: "wrap",
                    marginTop: "20px",
                  }}
                >
                  {institutionBio.articles
                    ? institutionBio.articles[0]?.map((article) => {
                        return (
                          <CardPost
                            key={article.art_id}
                            title={article.art_title}
                            body={article.art_contents}
                            id={article.user_id}
                            articleId={article.art_id}
                            articleAbstract={article.art_abstract}
                          ></CardPost>
                        );
                      })
                    : null}
                </Container>
              </div>
            ) : null}
            <br />
            <br />
            <br />
           <NavBottom />
          </Container>
        </div>
      ) : (
        <div>CARGANDO</div>
      )}

    </>
  );
}
