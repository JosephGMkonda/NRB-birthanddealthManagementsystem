import React from 'react'
import Sidebar from '../components/Sidebar'
import { Box,Typography } from '@mui/material'
const BirthCertificate = () => {
  return (
    <>
    <Box sx={{display:'flex'}}>
      <Sidebar/>

      <Box component="main" sx={{ flexGrow:1, p:3, marginTop:"65px"}}>

        <Typography variant='h4'>
               BirthCertificate
          </Typography>

      </Box>
    </Box>
    </>
  )
}

export default BirthCertificate