import Container from '@mui/material/Container'
import CssBaseline from '@mui/material/CssBaseline'
import { createTheme, ThemeProvider } from '@mui/material/styles'
import * as React from 'react'
import { Outlet } from 'react-router-dom'
import {Copyright} from '../../components/Copyright'


const theme = createTheme()

export default function AuthLayout() {
  return (
    <ThemeProvider theme={ theme }>
      <Container component='main' maxWidth='xs'>
        <CssBaseline />
        <Outlet />
        <Copyright sx={ { mt: 8, mb: 4 } } />
      </Container>
    </ThemeProvider>
  )
}
