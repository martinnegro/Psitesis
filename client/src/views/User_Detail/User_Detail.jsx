import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import { Container, Box, Avatar, Paper } from "@material-ui/core";
import Nav from "../../components/Nav/Nav";
import UserInstitutions from "./components/UserInstitutions";
import UserContact from "./components/UserContact";
import UserArticles from "./components/UserArticles";
import { useSelector, useDispatch } from "react-redux";
import {
  getUserDetail,
  clearUserDetail,
} from "./../../redux/actions/usersActions";
import { useTheme } from "@material-ui/styles";
import NavBottom from "../../components/NavBottom/NavBottom";


const useStyles = makeStyles((theme) => ({
  offset: theme.mixins.toolbar,
  head: {
    margin: 10,
    padding: "20px 10px 10px 20px",
    display: "flex",
    alignItems: "center",
    "@media (max-width: 601px)": {
      padding: "10px 0px",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
    },
  },
  boxTop: {
    "@media (min-width: 601px)": {
      marginTop: 20,
    },
  },
  avatar: {
    height: "150px",
    width: "150px",
    margin: "0 20px 20px 0",
  },
}));

function User_Detail(props) {
  const classes = useStyles(props);
  const userDetail = useSelector((state) => state.usersReducer.userDetail);
  const { user_id_A0 } = useParams();
  const dispatch = useDispatch();
  
  useEffect(() => {
    if (user_id_A0) {
      dispatch(getUserDetail(user_id_A0));
    }
    return () => dispatch(clearUserDetail());
  }, [dispatch, user_id_A0]);

  return (
    <Container>
      <Nav></Nav>
     
      <div className={classes.offset}></div>
        {userDetail ? (
        <Box>
            <Paper className={classes.head}>
              <Avatar
                alt={userDetail.user_name}
                src={userDetail.user_img_profile}
                className={classes.avatar}
              />
              <UserContact user={userDetail} />
            </Paper>
            <UserInstitutions user={userDetail} />
            <UserArticles user={userDetail} />
          </Box>          
        ) : (
          <div>CARGANDO</div>
        )}
      {/* </Box> */}
      <br />
      <br />
      <br />
      <br />
      <NavBottom />
    </Container>
  );
}

export default User_Detail;
