import {React,useState} from 'react'
import { makeStyles,Button,TextField,Container } from '@material-ui/core/';
import CheckIcon from '@material-ui/icons/Check';
import CancelOutlinedIcon from '@material-ui/icons/CancelOutlined';
const useStyles = makeStyles((theme) => ({
    root: {
      '& > *': {
        margin: theme.spacing(1),
        width: '25ch',
      },
    },
  }));

const Report =  ({cancellReport,id}) =>{
    const classes = useStyles();
    const [report,setReport] = useState({
        rep_id : id,
        rep_motive: "",
    })

    const handleOnChange = (e) =>{
        setReport({
            ...report,
            rep_motive : e.target.value
        })
    }

    const handleSubmit = (e) =>{
        e.preventDefault();
        cancellReport()
    }
    return(
        <div>
            <form type = "submit" className = {classes.root} >
            <TextField id="standard-basic" label="Motivo" onChange = {handleOnChange} value = {report.rep_motive} />
            <Container>
            <Button onClick = {cancellReport}  > <CancelOutlinedIcon style={{ fontSize: 15 }}/></Button>
            <Button type = "submit" onClick = {handleSubmit}> <CheckIcon style={{ fontSize: 15 }}/></Button>
            </Container>
            </form>
        </div>
    )
}

export default Report