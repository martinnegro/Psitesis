import { Grid,TextField,makeStyles } from '@material-ui/core'
import React, {useState, useEffect} from 'react'
import ButtonForm from './ButtonForm/ButtonForm'

const initialValues = {
    user_id:0,
    user_name:'',
    user_email:'',
    user_img_profile:'',
    user_password:'',
    institution_id:0,
    biography:'',
}

const useStyles = makeStyles(theme => ({
    root: {
        '& .MuiFormControl-root':{
            width:'80%',
            margin:theme.spacing(1),
           
        },
        background: 'white',
    },
  }));

export default function Form() {

    const [values, setValues] = useState(initialValues)
    const classes = useStyles();

    const handleInputChange = e => {
        const {name, value} = e.target
        setValues({
            ...values,
            [name]: value,
        })
    }



    return (
        <form className={classes.root}>
            <Grid container>
            <Grid item xs={6}
          >
                <TextField 
                variant='outlined'
                label='name'
                name='user_name'
                value={values.user_name}
                onChange={handleInputChange}
                ></TextField>
                <TextField 
                variant='outlined'
                label='Email'
                name='user_email'
                value={values.user_email}
                onChange={handleInputChange}
                ></TextField>
            </Grid>

            <Grid item xs={6} 
            >
                <TextField 
                variant='outlined'
                label='password'
                name='user_password'
                value={values.user_password}
                onChange={handleInputChange}
                ></TextField>
                <TextField 
                variant='outlined'
                label='biography'
                name='biography'
                value={values.biography}
                onChange={handleInputChange}
                ></TextField>
                <div>
                <ButtonForm 
                variant='contained'
                color='primary'
                size='large'
                text='Submit'
                ></ButtonForm>

                <ButtonForm 
                variant='contained'
                color='default'
                size='large'
                text='Reset'
                ></ButtonForm>
            </div>
            </Grid>

            </Grid>

        </form>

    )
}
