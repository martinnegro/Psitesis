import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { Link } from 'react-router-dom'
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableFooter from '@material-ui/core/TableFooter';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import IconButton from '@material-ui/core/IconButton';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import FirstPageIcon from '@material-ui/icons/FirstPage';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import DoneIcon from '@material-ui/icons/Done';
import CloseIcon from '@material-ui/icons/Close';
import LastPageIcon from '@material-ui/icons/LastPage';
import { Container, TableHead } from '@material-ui/core';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import { getAllUsers } from '../../../redux/actions/usersActions'
import { changeUserRole, changeUserColab } from '../../../redux/API'; 

import './AdminUsers.css'
const { REACT_APP_URL_API } = process.env;
const useStyles1 = makeStyles((theme) => ({
  root: {
    flexShrink: 0,
    marginLeft: theme.spacing(2.5),
  },
}));

function TablePaginationActions(props) {
  const classes = useStyles1();
  const theme = useTheme();
  const { count, page, rowsPerPage, onPageChange } = props;

  const handleFirstPageButtonClick = (event) => {
    onPageChange(event, 0);
  };

  const handleBackButtonClick = (event) => {
    onPageChange(event, page - 1);
  };

  const handleNextButtonClick = (event) => {
    onPageChange(event, page + 1);
  };

  const handleLastPageButtonClick = (event) => {
    onPageChange(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
  };

  return (
    <div className={classes.root}>
      <IconButton
        onClick={handleFirstPageButtonClick}
        disabled={page === 0}
        aria-label="first page"
      >
        {theme.direction === 'rtl' ? <LastPageIcon /> : <FirstPageIcon />}
      </IconButton>
      <IconButton onClick={handleBackButtonClick} disabled={page === 0} aria-label="previous page">
        {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
      </IconButton>
      <IconButton
        onClick={handleNextButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="next page"
      >
        {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
      </IconButton>
      <IconButton
        onClick={handleLastPageButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="last page"
      >
        {theme.direction === 'rtl' ? <FirstPageIcon /> : <LastPageIcon />}
      </IconButton>
    </div>
  );
}

TablePaginationActions.propTypes = {
  count: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
  page: PropTypes.number.isRequired,
  rowsPerPage: PropTypes.number.isRequired,
};

const useStyles2 = makeStyles({
  table: {
    minWidth: 500,
  },
});

export default function AdminUsers() {
  const classes = useStyles2();
  const usersNoFilter = useSelector(state => state.usersReducer.users)
  const [ page, setPage ] = React.useState(0);
  const [usersPerPage, setUsersPerPage] = React.useState(5);
  const [ roles, setRoles ] = React.useState([]);
  const [ wantChangeRole, setWantChangeRol ] = React.useState({});
  const [ selects, setSelects ] = React.useState({});
  const [ input, setInput ] = React.useState('');
  const [ users, setUsers ] = React.useState([]);
  const dispatch = useDispatch();

  const emptyusers = usersPerPage - Math.min(usersPerPage, users.length - page * usersPerPage);

  useEffect(()=>{
    if (input.length > 0) {
      const auxFilter = usersNoFilter.filter(u => u.user_name.toLowerCase().includes(input.toLowerCase()));
      setUsers(auxFilter)
    } else setUsers(usersNoFilter)
  },[input,usersNoFilter])

  useEffect(()=>{
    dispatch(getAllUsers())
  },[dispatch]);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeUsersPerPage = (event) => {
    setUsersPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  useEffect(async ()=>{
    const response = await axios.get(`${REACT_APP_URL_API}/users/get_roles`);
    setRoles(response.data)
  },[])
  useEffect(()=>{
      if(users.length > 0 ){
        const aux = {};
        const aux2 = {};
        users.forEach(u => {aux[u.user_id] = false; aux2[u.user_id] = u.user_rol_id })
        setWantChangeRol(aux);
        setSelects(aux2)
      }
  },[users]);

  const getRoleName = (id) => {
    if (roles.length > 0){
        const aux = roles.find(r => r.id === id)
        return aux.name
    }
  }

  const onWantChangeRol = (user_id) => {
    setWantChangeRol({
        ...wantChangeRole,
        [user_id]: true
    })
  }
  const cancelWantChange = (user_id) => {
    setWantChangeRol({
        ...wantChangeRole,
        [user_id]: false
    })
  };

  const confirmChangeRole = async (idUser, oldRoleId, newRolId) => {
    try {
    const response = await changeUserRole(idUser, oldRoleId, newRolId);
    dispatch(getAllUsers())
    } catch(err) { alert('No update') }
  };

  const onChangeColab = async (user_id_A0) => {
    try {
      const response = await changeUserColab(user_id_A0);
      dispatch(getAllUsers())
    } catch(err) { alert('No update') }
  };

  return (
    <Container>
    <form>
      <TextField id="outlined-basic" label="Filtrar por nombre" variant="outlined"
        margin="dense"
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />
    </form>
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="custom pagination table">
        <TableHead>
            <TableCell>Foto</TableCell>
            <TableCell>Nombre</TableCell>
            <TableCell>Rol</TableCell>
            <TableCell>Colaborador</TableCell>
        </TableHead>
        <TableBody>
          {(usersPerPage > 0
            ? users.slice(page * usersPerPage, page * usersPerPage + usersPerPage)
            : users
          ).map((row) => (
            <TableRow key={row.name}>
              <TableCell component="th" scope="row">
                <Avatar alt={row.user_name} src={row.user_img_profile}/>
              </TableCell>
                <TableCell /*style={{ width: 160 }}*/ align="left">
              <Link to={`/user/${row.user_id_A0}`} style={{ textDecoration: "none" }}>
                  {row.user_name}
              </Link>
                </TableCell>  
              <TableCell /*style={{ width: 160 }}*/ align="left">
                {getRoleName(row.user_rol_id)}
                {
                    !wantChangeRole[row.user_id] ?
                    <Button onClick={()=>onWantChangeRol(row.user_id)}>CAMBIAR</Button> :
                    <>
                    <FormControl className={classes.formControl}>
                      <InputLabel id="demo-simple-select-label">Age</InputLabel>
                      <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={selects[row.user_id]}
                        onChange={(e)=>setSelects({...selects,[row.user_id]: e.target.value})}
                      >
                          {
                          roles.map(r => <MenuItem value={r.id}>{r.name}</MenuItem>)
                          }   
                      </Select>
                    </FormControl>
                    {
                        selects[row.user_id] === row.user_rol_id ? <></> :
                        <IconButton onClick={()=>confirmChangeRole(row.user_id_A0,row.user_rol_id,selects[row.user_id])}>
                            <DoneIcon />
                        </IconButton>   

                    }
                    <IconButton onClick={()=>cancelWantChange(row.user_id)}>
                        <CloseIcon/>
                        </IconButton>
                    </>
                }
              </TableCell>
              <TableCell>
                { row.user_colab ? 'SI' : 'NO'  }
                <Button onClick={()=>onChangeColab(row.user_id_A0)}>CAMBIAR</Button>
              </TableCell>
            </TableRow>
          ))}

          {emptyusers > 0 && (
            <TableRow style={{ height: 53 * emptyusers }}>
              <TableCell colSpan={6} />
            </TableRow>
          )}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TablePagination
              usersPerPageOptions={[5, 10, 25, { label: 'All', value: -1 }]}
              colSpan={3}
              count={users.length}
              usersPerPage={usersPerPage}
              page={page}
              SelectProps={{
                inputProps: { 'aria-label': 'rows per page' },
                native: true,
              }}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeUsersPerPage}
              ActionsComponent={TablePaginationActions}
            />
          </TableRow>
        </TableFooter>
      </Table>
    </TableContainer>
    </Container>
  );
}

