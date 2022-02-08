import {CircularProgress} from '@mui/material'
import Box from '@mui/material/Box'
import * as React from 'react'


export function LoadingScreen() {
  return (
    <Box className={'loading-screen'}>
        <CircularProgress size={100}/>
    </Box>
  )
}
