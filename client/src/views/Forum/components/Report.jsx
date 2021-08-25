import {React,useState} from 'react'
import { makeStyles,Button,TextField,Container, Dialog, DialogTitle, DialogContent, Typography, DialogActions, Box } from '@material-ui/core/';
import CheckIcon from '@material-ui/icons/Check';
import CancelOutlinedIcon from '@material-ui/icons/CancelOutlined';
import { postReport } from '../../../redux/API';
import {useSelector } from "react-redux";
const useStyles = makeStyles((theme) => ({
    root: {
        padding: "10px",
        display: "flex",
        flexDirection: "column"  
    },
    title: {
        padding: "10px 0 0 10px"
    },
    input: {
        width: "80%",
        margin: "10px"
        
    }
  }));

const Report =  ({cancellReport,commentId,postId,open,content}) =>{
    const userId = useSelector((state) => state.authReducer.user.user_id)
    const classes = useStyles();
    const [report,setReport] = useState({
        rep_reason: "",
        comment_id : commentId,
        post_id : postId,
        user: userId
    })

    const handleOnChange = (e) =>{
        setReport({
            ...report,
            rep_reason : e.target.value
        })
    }

    const handleSubmit = (e) =>{
        e.preventDefault();
        postReport(report)
        cancellReport()
        setReport({
            rep_reason: "",
        })
    }
    return(
        <Dialog open={open} >
            <Box className={classes.root}>
            <DialogTitle className={classes.title}>
                Reportar
            </DialogTitle>
            <DialogContent>
                <Typography>
                    {content}
                </Typography>
            </DialogContent>
            
            <form type = "submit"  >
                <TextField
                    id="standard-basic"
                    label="Motivo"
                    onChange={handleOnChange}
                    value={report.rep_reason}
                    className={classes.input}
                />
                    <Container>
                        <Button 
                            onClick={cancellReport}
                        >
                            <CancelOutlinedIcon/>
                        </Button>
            <Button 
                type="submit"
                onClick = {handleSubmit}
            >
                <CheckIcon/>
            </Button>
            </Container>
            </form>
            </Box>
        </Dialog>
    )
}

export default Report