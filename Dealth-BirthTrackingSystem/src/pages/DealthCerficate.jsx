import React from 'react'
import Sidebar from '../components/Sidebar'
import { Box,Typography } from '@mui/material'
const DealthCerficate = () => {
  return (
    <>
    <Box sx={{display:'flex'}}>
      <Sidebar/>

      <Box component="main" sx={{ flexGrow:1, p:3, marginTop:"65px"}}>

        <Typography variant='h4'>
               DealthCertificate
          </Typography>

      </Box>
    </Box>
    </>
  )
}

export default DealthCerficate