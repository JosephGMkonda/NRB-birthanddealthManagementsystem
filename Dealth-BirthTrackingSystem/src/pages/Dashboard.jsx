import React from 'react'
import Sidebar from '../components/Sidebar'
import { Box,Typography } from '@mui/material'
import BarChart from './BarChart'
import DeathPieChart from './DeathPieChart'
const Dashboard = () => {
  return (
    <>
    <Box sx={{display:'flex'}}>
      <Sidebar/>

      <Box component="main" sx={{ flexGrow:1, p:3, marginTop:"65px"}}>

        <Typography>
          <div className='max-w-7xl mx-auto'>
            {/* dashboard  banner */}
            <div className="mt-5 p-5 bg-gray-100 rounded shadow">
              <h1 className="text-2xl font-bold text-blue-600">Dashboard</h1>
        </div>

        
              {/* Cards area here  */}
              <div className="pt-5 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 mb-8">

                {/* card ---1  */}

                <div className='bg-red-500 shadow-lg rounded-lg p-6 text-center text-white cursor-pointer transition-transform duration-200 transform hover:scale-105 active:scale-95'>
                  <h2 className='text-lg font-semibold'>Death Certificates</h2>
                  <p className=''>Male</p>
                  <p className='text-3xl font-bold  mt-4'>5</p>
                  

                </div>


                                {/* card ---2  */}

                  <div className='bg-red-500 shadow-lg rounded-lg p-6 text-center text-white cursor-pointer transition-transform duration-200 transform hover:scale-105 active:scale-95'>
                  <h2 className='text-lg font-semibold'>Death Certificates</h2>
                  <p className=''>Female</p>
                  <p className='text-3xl font-bold  mt-4'>5</p>
                  

                </div>


                
                                {/* card ---3  */}

                  <div className='bg-blue-500 shadow-lg rounded-lg p-6 text-center text-white cursor-pointer transition-transform duration-200 transform hover:scale-105 active:scale-95'>
                  <h2 className='text-lg font-semibold'>Birth Certificates</h2>
                  <p className=''>Male</p>
                  <p className='text-3xl font-bold  mt-4'>5</p>
                  

                </div>

                
                   {/* card ---2  */}

                  <div className='bg-blue-500 shadow-lg rounded-lg p-6 text-center text-white cursor-pointer transition-transform duration-200 transform hover:scale-105 active:scale-95'>
                  <h2 className='text-lg font-semibold'>Birth Certificates</h2>
                  <p className=''>Female</p>
                  <p className='text-3xl font-bold  mt-4'>5</p>
                  

                </div>
                </div>


                {/* Chart sections */}

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                  {/* chart 1 here  */}
                  <div className="bg-white shadow-lg rounded-lg p-6">
                    <h3 className='text-lg font-semibold text-gray-700 mb-4'>Birth Certificate</h3>
                    <div className='h-64 bg-gray-100 flex items-center justify-center'>
                      {/* Bar chart here */}
                      <BarChart/>

                    </div>


               </div>



                                 {/* chart 2 here  */}
                                 <div className="bg-white shadow-lg rounded-lg p-6">
                    <h3 className='text-lg font-semibold text-gray-700 mb-4'>Death Certificate</h3>
                    <div className='h-64 bg-gray-100 flex items-center justify-center'>
                      {/* Bar chart here */}
                      <DeathPieChart/>

                    </div>


               </div>




                </div>
          </div>
    
          </Typography>

      </Box>
    </Box>
    </>
  )
}

export default Dashboard