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

const CommentReportedCard = ({content,postId,reports}) =>{
  const [details,setDetails] = useState(false)
  const classes = useStyles();
  function handleDetails(){
      details ? setDetails(false) : setDetails(true)
  }
  function handleResolve(id){
    editReport(id);
    getReports();
    
    
  }

  function handleDelete(id){
    deleteReport(id);
    getReports();
    
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
            {details ?  <TableContainer component={Paper}>
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
          {reports.map((row) => (
            <TableRow key={row.name}>
            <TableCell component="th" scope="row">
              {row.user.user_name}
            </TableCell>
            <TableCell align="right">{row.rep_reason}</TableCell>
            <TableCell align="right"><Button onClick = {handleResolve(row.rep_id)}><CheckIcon/></Button></TableCell>
            <TableCell align="right"><Button onClick = {handleDelete(row.rep_id)}><DeleteForeverIcon/></Button></TableCell>
          </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer> : null}
        </Container>
    )
}

export default CommentReportedCard