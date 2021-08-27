import {React,useState} from 'react'
import {
    Box,
    IconButton,
    Link,
    Table,
    TableCell,
    TableRow,
    TableFooter,
    Input,
    Button
  } from "@material-ui/core";
  import AddCircleOutlineIcon from "@material-ui/icons/AddCircleOutline";
  import DoneIcon from "@material-ui/icons/Done";
  import CloseIcon from "@material-ui/icons/Close";
  import { purple, red, green } from "@material-ui/core/colors";
  import { editUserName } from '../../../redux/API';
  import {useSelector} from "react-redux";


const ChangeNickName = () =>{
  const userId = useSelector((state) => state.authReducer.user.user_id);
  const [isCreating, setIsCreating] = useState(false);
  const [userInf,setUserInf] = useState({
    userName : ''
  })
  function handleOnChange(e){
   setUserInf({
     userName : e.target.value
   })
   console.log(userInf)
  }

  function handleSubmit(){
    editUserName(userId,userInf)
    setUserInf({
      userName : ''
    })
  }
    return(
            <TableFooter align="center">
              <TableCell align="center">
                Cambiar Nick
                <IconButton
                  align="center"
                   onClick={() => setIsCreating(true)} 
                  style={{ color: purple[500], height: "42px", width: "42px" }}
                >
                  <AddCircleOutlineIcon />
                </IconButton>
              </TableCell>
              {isCreating ?  <TableCell>
                <Input
                  align="center"
                  value = {userInf.userName}
                  name= "userName"
                  onChange={(e) => handleOnChange(e)}
                />
                <Button onClick = {handleSubmit} style={{ color: green[500] }}><DoneIcon/></Button>
                <Button onClick = {() => setIsCreating(false)} style={{ color: red[500] }}><CloseIcon/></Button>
              </TableCell> : null}
            </TableFooter>
    )
}

export default ChangeNickName