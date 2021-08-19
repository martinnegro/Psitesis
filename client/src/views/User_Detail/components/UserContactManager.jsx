import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  Box,
  IconButton,
  Link,
  Table,
  TableCell,
  TableRow,
  TableFooter,
} from "@material-ui/core";
import AddCircleOutlineIcon from "@material-ui/icons/AddCircleOutline";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";
import CustomIcon from "./CustomIcon";
import { purple, red, green } from "@material-ui/core/colors";
import DoneIcon from "@material-ui/icons/Done";
import CloseIcon from "@material-ui/icons/Close";
import Input from "@material-ui/core/Input";
import ConfirmDeleteContact from "./ConfirmDeleteContact";
import {
  getUserMetadata,
  createNewLinkInMetadata,
  deleteLinkInMetadata,
  clearUserMetadata,
} from "../../../redux/actions/actionsMetadata";
import { makeStyles } from "@material-ui/core/styles";
import { Typography } from "@material-ui/core";

const useStyles = makeStyles({
  contentBox: {
    "@media (max-width: 601px)": {
      width: "80vw",
    },
  },
  tipoh2: {
    "@media (max-width: 601px)": {
      marginLeft: 10,
      fontSize: "1.75rem",
    },
  },
  tamLinks: {
	  width: '42px',
	  height: '42px',
	  "@media (max-width: 601px)": {
		width: '10px',
		height: '10px',
	  },
  },
  table2: {
	"@media (max-width: 601px)": {
	display: 'block',
	overflowX: 'auto',
	  },
  },
});

const UserContactManager = ({ user }) => {
  const [isCreating, setIsCreating] = useState(false);
  const [open, setOpen] = useState({});
  const [newLink, setNewLink] = useState("");
  const myUser = useSelector((state) => state.authReducer.user);
  const metadata = useSelector((state) => state.metadataReducer.metadata);
  const dispatch = useDispatch();
  const classes = useStyles();

  useEffect(() => {
    if (user?.user_id_A0) {
      dispatch(getUserMetadata(user.user_id_A0));
    }
    return () => dispatch(clearUserMetadata());
  }, [dispatch, user]);

  const handleOnChangeNewLink = (e) => {
    setNewLink(e.target.value);
  };

  const cancelNewLink = () => {
    setIsCreating(false);
    setNewLink("");
  };

  const confirmNewLink = async (newLink) => {
    if (newLink !== "") {
      if (metadata?.links) {
        if (!metadata?.links?.includes(newLink)) {
          dispatch(createNewLinkInMetadata(newLink, user.user_id_A0));
        }
      } else {
        dispatch(createNewLinkInMetadata(newLink, user.user_id_A0));
      }
    }
    setIsCreating(false);
    setNewLink("");
  };

  const handleClickOpen = (link) => {
    setOpen({
      ...open,
      [link]: true,
    });
  };

  const handleClose = (link) => {
    setOpen({
      ...open,
      [link]: false,
    });
  };

  const handleConfirm = async (link) => {
    setOpen(false);
    dispatch(deleteLinkInMetadata(link, user.user_id_A0));
  };

  return (
    <Box className={classes.contentBox}>
      {/* <Box style={{ color: '#861C55', fontSize: '30px' }}>Contacto</Box> */}
      <Typography variant="h2" color="initial" className={classes.tipoh2}>
        Contacto
      </Typography>
      <Table className={classes.table2}>
        {metadata?.links?.map((link) => (
          <TableRow >
            <TableCell>
              <CustomIcon link={link}  className={classes.tamLinks} />
            </TableCell>
            <TableCell >
              <Link href={link} target="_blank" style={{ color: '#000000' }}>
                {link}
              </Link>
            </TableCell>
            {user?.user_id_A0 === myUser?.user_id_A0 ||
            myUser?.roles?.includes("admin") ||
            myUser?.roles?.includes("superadmin") ? (
              <TableCell>
                <IconButton>
                  <DeleteForeverIcon
                    onClick={() => {
                      handleClickOpen(link);
                    }}
                    style={{ color: purple[500] }}
                  />
                  <ConfirmDeleteContact
                    open={open[link]}
                    handleClose={handleClose}
                    handleConfirm={handleConfirm}
                    link={link}
                  />
                </IconButton>
              </TableCell>
            ) : null}
          </TableRow>
        ))}
      </Table>
      {myUser.user_id_A0 === user.user_id_A0 ||
      myUser?.roles?.includes("admin") ||
      myUser?.roles?.includes("superadmin") ? (
        <Table>
          {isCreating ? (
            <TableRow>
              <TableCell>
                <CustomIcon link={newLink}  height={"42px"} width={"42px"} />
              </TableCell>
              <TableCell>
                <Input
                  align="center"
                  value={newLink}
                  name={"link"}
                  onChange={(e) => handleOnChangeNewLink(e)}
                />
              </TableCell>
              <TableCell align="right">
                <IconButton
                  onClick={() => {
                    confirmNewLink(newLink);
                  }}
                  style={{ color: green[500] }}
                >
                  <DoneIcon />
                </IconButton>
              </TableCell>
              <TableCell>
                <IconButton onClick={cancelNewLink} style={{ color: red[500] }}>
                  <CloseIcon />
                </IconButton>
              </TableCell>
            </TableRow>
          ) : (
            <TableFooter align="center">
              <TableCell align="center">
                Agregar forma de contacto
                <IconButton
                  align="center"
                  onClick={() => setIsCreating(true)}
                  style={{ color: purple[500], height: "42px", width: "42px" }}
                >
                  <AddCircleOutlineIcon />
                </IconButton>
              </TableCell>
            </TableFooter>
          )}
        </Table>
      ) : (
        <></>
      )}
    </Box>
  );
};

export default UserContactManager;
