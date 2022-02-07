import LockOutlinedIcon from '@mui/icons-material/LockOutlined'
import Avatar from '@mui/material/Avatar'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Checkbox from '@mui/material/Checkbox'
import FormControlLabel from '@mui/material/FormControlLabel'
import Grid from '@mui/material/Grid'
import Link from '@mui/material/Link'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import * as React from 'react'
import { Link as RouterLink } from 'react-router-dom'
import useAuth from '../../hooks/useAuth'
import { PATH_AUTH } from '../../routes/paths'
import {validateEmail} from '../../utils/regexps'


export default function SignUp() {
  const {signUp} = useAuth()
  const handleSubmit = async (event) => {
    event.preventDefault()
    const data = new FormData(event.currentTarget)
    const parsedData = {
      email: data.get('email'),
      firstName: data.get('firstName'),
      lastName: data.get('lastName'),
      password: data.get('password'),
    }
    if (!validateEmail(parsedData.email)) {
      alert('Email is invalid')
      return
    }
  
    if (!parsedData.email || !parsedData.password || !parsedData.firstName || !parsedData.lastName) {
      alert('Fill all fields, please')
      return
    }
    
    await signUp(parsedData);
  }
  
  return (
    
    <Box
      sx={ {
        marginTop: 8,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
      } }
    >
      <Avatar sx={ { m: 1, bgcolor: 'secondary.main' } }>
        <LockOutlinedIcon />
      </Avatar>
      <Typography component='h1' variant='h5'>
        Sign up
      </Typography>
      <Box component='form' noValidate onSubmit={ handleSubmit } sx={ { mt: 3 } }>
        <Grid container spacing={ 2 }>
          <Grid item xs={ 12 } sm={ 6 }>
            <TextField
              autoComplete='given-name'
              name='firstName'
              required
              fullWidth
              id='firstName'
              label='First Name'
              autoFocus
            />
          </Grid>
          <Grid item xs={ 12 } sm={ 6 }>
            <TextField
              required
              fullWidth
              id='lastName'
              label='Last Name'
              name='lastName'
              autoComplete='family-name'
            />
          </Grid>
          <Grid item xs={ 12 }>
            <TextField
              required
              fullWidth
              id='email'
              label='Email Address'
              name='email'
              type='email'
              autoComplete='email'
            />
          </Grid>
          <Grid item xs={ 12 }>
            <TextField
              required
              fullWidth
              name='password'
              label='Password'
              type='password'
              id='password'
              autoComplete='new-password'
            />
          </Grid>
        </Grid>
        <Button
          type='submit'
          fullWidth
          variant='contained'
          sx={ { mt: 3, mb: 2 } }
        >
          Sign Up
        </Button>
        <Grid container justifyContent='flex-end'>
          <Grid item>
            <Link href variant='body2' to={ PATH_AUTH.signin } component={ RouterLink }>
              Already have an account? Sign in
            </Link>
          </Grid>
        </Grid>
      </Box>
    </Box>
  )
}
