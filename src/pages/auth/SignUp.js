import LockOutlinedIcon from '@mui/icons-material/LockOutlined'
import Avatar from '@mui/material/Avatar'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Grid from '@mui/material/Grid'
import Link from '@mui/material/Link'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import {Fragment} from 'react'
import * as React from 'react'
import {useSnackbar} from 'notistack'
import {Link as RouterLink} from 'react-router-dom'
import useAuth from '../../hooks/useAuth'
import {PATH_AUTH} from '../../routes/paths'
import {validateEmail} from '../../utils/regexps'


export default function SignUp() {
  const {signUp} = useAuth()
  const {enqueueSnackbar, closeSnackbar} = useSnackbar()
  
  const handleSubmit = async (event) => {
    event.preventDefault()
    const data = new FormData(event.currentTarget)
    const parsedData = {
      email: data.get('email'),
      firstName: data.get('firstName'),
      lastName: data.get('lastName'),
      password: data.get('password')
    }
    if (!validateEmail(parsedData.email)) {
      enqueueSnackbar('Email is invalid', { variant: 'error' })
      return
    }
    
    if (!parsedData.email || !parsedData.password || !parsedData.firstName || !parsedData.lastName) {
      enqueueSnackbar('Fill required fields, please', { variant: 'error' })
      return
    }
  
    const {success, message} = await signUp(parsedData)
    if (success) {
      enqueueSnackbar('Sign Up: success', {
        variant: 'success',
        action: (key) => (
          <Fragment>
            <Button onClick={ () => closeSnackbar(key) }>
              <span className={'white'}>CLOSE</span>
            </Button>
          </Fragment>
        )
      })
    }
    else {
      enqueueSnackbar(message, { variant: 'error' })
    }
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
      <Avatar sx={ {m: 1, bgcolor: 'secondary.main'} }>
        <LockOutlinedIcon />
      </Avatar>
      <Typography component='h1' variant='h5'>
        Sign up
      </Typography>
      <Box component='form' noValidate onSubmit={ handleSubmit } sx={ {mt: 3} }>
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
          sx={ {mt: 3, mb: 2} }
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
