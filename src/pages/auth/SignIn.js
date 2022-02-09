import LockOutlinedIcon from '@mui/icons-material/LockOutlined'
import Avatar from '@mui/material/Avatar'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Grid from '@mui/material/Grid'
import Link from '@mui/material/Link'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import {useSnackbar} from 'notistack'
import * as React from 'react'
import {Fragment} from 'react'
import {Link as RouterLink} from 'react-router-dom'
import useAuth from '../../hooks/useAuth'
import {PATH_AUTH} from '../../routes/paths'


export default function SignIn() {
  const {signIn} = useAuth()
  const {enqueueSnackbar, closeSnackbar} = useSnackbar()
  
  const handleSubmit = async (event) => {
    event.preventDefault()
    const data = new FormData(event.currentTarget)
    const email = data.get('email')
    const password = data.get('password')
    if (!email || !password) {
      enqueueSnackbar('Fill all fields, please', {variant: 'error'})
      return
    }
    const {success, message} = await signIn(data.get('email'), data.get('password'))
    if (success) {
      enqueueSnackbar('Sign In: success', {
        variant: 'success',
        action: (key) => (
          <Fragment>
            <Button onClick={ () => closeSnackbar(key) }>
              <span className={ 'white' }>CLOSE</span>
            </Button>
          </Fragment>
        )
      })
    } else {
      enqueueSnackbar(message, {variant: 'error'})
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
        Sign in
      </Typography>
      <Box component='form' onSubmit={ handleSubmit } noValidate sx={ {mt: 1} }>
        <TextField
          margin='normal'
          required
          fullWidth
          id='email'
          label='Email Address'
          name='email'
          autoComplete='email'
          autoFocus
        />
        <TextField
          margin='normal'
          required
          fullWidth
          name='password'
          label='Password'
          type='password'
          id='password'
          autoComplete='current-password'
        />
        <Button
          type='submit'
          fullWidth
          variant='contained'
          sx={ {mt: 3, mb: 2} }
        >
          Sign In
        </Button>
        <Grid container>
          <Grid item xs>
            <Link href='#' variant='body2'>
              Forgot password?
            </Link>
          </Grid>
          <Grid item>
            <Link href variant='body2' to={ PATH_AUTH.signup } component={ RouterLink }>
              { 'Don\'t have an account? Sign Up' }
            </Link>
          </Grid>
        </Grid>
      </Box>
    </Box>
  )
}
