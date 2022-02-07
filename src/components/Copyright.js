import Link from '@mui/material/Link'
import Typography from '@mui/material/Typography'
import * as React from 'react'


export function Copyright(props) {
  return (
    <Typography variant='body2' color='text.secondary' align='center' { ...props }>
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
