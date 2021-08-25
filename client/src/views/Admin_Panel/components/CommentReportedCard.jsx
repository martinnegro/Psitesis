import {React,useState} from 'react';
import {makeStyles,Card,CardActions,CardContent,Button,Typography,Container,Table,TableBody,TableCell,TableContainer,TableHead,TableRow,Paper}
 from '@material-ui/core/'
import {Link} from 'react-router-dom'
import { editReport,deleteReport, getReports } from '../../../redux/API';
import CheckIcon from '@material-ui/icons/Check';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
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
  },
  table: {
    minWidth: 650,
  },
  
});

const CommentReportedCard = ({commentContent,postContent,postId,fetchData,reports,dataPosts}) =>{
  const [details,setDetails] = useState(false)
  const classes = useStyles();
  function handleDetails(){
      details ? setDetails(false) : setDetails(true)
  }
  async function handleResolve(id){
    await editReport(id);
     await fetchData("rep_resolved","false") 
    
  }
  async function handleDelete(id){
     await deleteReport(id);
      await fetchData("rep_resolved","false") 
  }
    return(
        <Container>
          
            <Card className = {classes.root}>
            <CardContent>
        <Typography variant="h5" component="h2">
            <Link className = {classes.link} to = {`/forum/post/${postId}`}>
          {commentContent ? commentContent : postContent}
          </Link>
        </Typography>

      </CardContent>
      <CardActions>
        <Button onClick = {handleDetails} size="small">{details ? "No mostrar" : "Mostrar reportes"}</Button>
      </CardActions>
            </Card>
            {details ? <TableContainer component={Paper}>
      <Table className={classes.table} size="small" aria-label="a dense table">
        <TableHead>
          <TableRow>
            <TableCell>Usuario reportando</TableCell>
            <TableCell align="right">Razon</TableCell>
            <TableCell align="right">Marcar Resuelto</TableCell>
            <TableCell align="right">Eliminar</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
        </TableBody>
        <TableBody>

         {/* COMMENTS */}
         
           {reports.map((report)=> (
        
            <TableRow key={report.rep_id}>
              {console.log(report)}
            <TableCell component="th" scope="row">
              {report.user.user_name}
            </TableCell>
            <TableCell align="right">{report.rep_reason}</TableCell>
            <TableCell align="right"><Button onClick =  {() => handleResolve(report.rep_id)}><CheckIcon/></Button></TableCell>
            <TableCell align="right"><Button onClick = {() => handleDelete(report.rep_id)}><DeleteForeverIcon/></Button></TableCell>
          </TableRow>
           ))
         }
        </TableBody>
      </Table>
    </TableContainer> : null}
        </Container>
    )
}

export default CommentReportedCard