import React from "react";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import { useDispatch } from "react-redux";
//import { getAllUsers } from '../../redux/actions/actions';
import { lime, } from "@material-ui/core/colors";
import { deleteFile } from "../../redux/actions/fileActions";
//var fileDownload = require("js-file-download");
import DeleteIcon from '@material-ui/icons/Delete';
import GetAppOutlinedIcon from '@material-ui/icons/GetAppOutlined';
import { useSelector } from "react-redux";
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';


const useStyles = makeStyles({
  root: {
    display: "flex",
    flexWrap: "wrap",
    width: "30%",
    flexDirection: "row",
    margin: "10px",
    maxHeight: "205px",
    borderRadius: "3%",
    "@media (max-width: 601px)": {
      width: "100%",
    },
  },
  bullet: {
    display: "inline-block",
    margin: "0 2px",
    transform: "scale(0.8)",
  },
  title: {
    fontSize: 16,
    textTransform: "uppercase",
    color: "#031927",
  },
  pos: {
    marginBottom: 12,
  },
  cardContents: {
    display: "flex",
    width: "100%",
    justifyContent: "space-between",
    backgroundColor: "white",
    "@media (max-width: 601px)": {
    },
  },
  content: {
    color: lime[800],
    color: "#93827F",
  },
  text2: {
    color: lime[800],
    color: "#93827F",
    textTransform: "uppercase",
    fontSize: 10,
  },
});

const ColorButton = withStyles((theme) => ({
  root: {
    color: theme.palette.getContrastText(lime[900]),
    fontSize: "10px",
    backgroundColor: lime[600],
    backgroundColor: "#031927",
    "&:hover": {
      backgroundColor: lime[800],
      backgroundColor: "#010b12",
    },
  },
}))(Button);



export default function CardLibrary(props) {
  const { user } = useSelector((state) => state.authReducer);
  const dispatch = useDispatch();

  const classes = useStyles();

  const { name, desc, id, url } = props;

  const subname = name;
  const nombre = subname.split(".");
  const typo = nombre.pop();
  const name2 = nombre.join(" ");

  const deletef = async () => {
    dispatch(deleteFile(id, url));
  };

  const handleClickDownload = () => {
    var link = document.createElement("a");
    if (link.download !== undefined) {
        link.setAttribute("href", url);
        link.setAttribute("target", "_blank");
        link.style.visibility = 'hidden';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    }
  };

  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Card className={classes.root} variant="outlined">
      <CardContent>
        <Typography className={classes.title} variant='p' gutterBottom>
          {name2}
        </Typography>
        <Typography
          variant="body2"
          component="p"
          style={{ height: "85px" }}
          className={classes.content}
        >
          {desc}
        </Typography>
      </CardContent>
      <CardActions className={classes.cardContents}>
        <ColorButton
          size="small"
          onClick={handleClickDownload}
          endIcon={<GetAppOutlinedIcon />}
          variant="contained"
        >
          VER {typo}
        </ColorButton>

      {
        user?.roles?.includes("admin") ||
        user?.roles?.includes("superadmin") ? (
          <>
            <ColorButton
            size="small"
            onClick={handleClickOpen}
            endIcon={<DeleteIcon />}
            variant="contained"
          >
            Eliminar {typo}
            </ColorButton>
            <Dialog
              open={open}
              onClose={handleClose}
              aria-labelledby="alert-dialog-title"
              aria-describedby="alert-dialog-description"
              >
          <DialogTitle id="alert-dialog-title">Confirme eliminar</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              ¿Estas segurx de eliminar este archivo?
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color="primary">
              NO
            </Button>
            <Button onClick={deletef} color="primary" autoFocus>
              SI
            </Button>
            </DialogActions>
            </Dialog>
        </>
        ) : null
      }      
      </CardActions>
    </Card>
  );
}
