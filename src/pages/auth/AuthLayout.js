import Container from '@mui/material/Container'
import CssBaseline from '@mui/material/CssBaseline'
import Link from '@mui/material/Link'
import { createTheme, ThemeProvider } from '@mui/material/styles'
import Typography from '@mui/material/Typography'
import * as React from 'react'
import { Outlet } from 'react-router-dom'


function Copyright(props) {
  return (
    <Typography variant='body2' color='text.secondary' align='center' {...props}>
      <Link color='inherit' href='https://www.linkedin.com/in/nlavr/'>
        Nikita's Lavrenko
      </Link>&nbsp;
      Code Challenge for&nbsp;
      <Link color='inherit' href='https://www.exodus.com/'>
        EXODUS
      </Link>&nbsp;
    </Typography>
  )
}

const theme = createTheme()

export default function AuthLayout() {
  return (
    <ThemeProvider theme={theme}>
      <Container component='main' maxWidth='xs'>
        <CssBaseline />
        <Outlet />
        <Copyright sx={{ mt: 8, mb: 4 }} />
      </Container>
    </ThemeProvider>
  )
}
