import {React,useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {Card,CardActions,CardContent,Button,Typography,Container} from '@material-ui/core/'
import {Link} from 'react-router-dom'
import ReportDetailCard from './ReportsDetailCard';

const useStyles = makeStyles({
  root: {
    minWidth: 275,
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
  link:{
      textDecoration: "none",
      color: "inherit"
  }
});

const CommentReportedCard = ({content,postId,reports}) =>{
    const [details,setDetails] = useState(false)
    const classes = useStyles();
    function handleDetails(){
        details ? setDetails(false) : setDetails(true)
    }
    return(
        <Container>
            <Card className = {classes.root}>
            <CardContent>
        <Typography variant="h5" component="h2">
            <Link className = {classes.link} to = {`/forum/post/${postId}`}>
          {content}
          </Link>
        </Typography>
        
      </CardContent>
      <CardActions>
        <Button onClick = {handleDetails} size="small">{details ? "No mostrar" : "Mostrar reportes"}</Button>
      </CardActions>
            </Card>
            {details ? reports.map((report)=>{
                return(
                    <ReportDetailCard userReporting = {report.user.user_name} reason = {report.rep_reason}></ReportDetailCard>
                )
            }) : null}
        </Container>
    )
}

export default CommentReportedCard