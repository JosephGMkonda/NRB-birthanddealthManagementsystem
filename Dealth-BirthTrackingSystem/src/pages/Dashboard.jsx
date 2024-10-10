import React, { useEffect, useState } from 'react';
import Sidebar from '../components/Sidebar';
import { Box, Typography } from '@mui/material';
import BarChart from './BarChart';
import DeathPieChart from './DeathPieChart';

const Dashboard = () => {
  const [deathStats, setDeathStats] = useState({ Male: 0, Female: 0 });
  const [birthStats, setBirthStats] = useState({ Male: 0, Female: 0 });

  // Fetch the death and birth stats when the component mounts
  useEffect(() => {
    // Fetch death statistics
    fetch('http://127.0.0.1:8000/api/death-stats/')
      .then(response => response.json())
      .then(data => {
        const processedDeathStats = processStats(data);
        setDeathStats(processedDeathStats);
      })
      .catch(error => console.error('Error fetching death stats:', error));

    // Fetch birth statistics
    fetch('http://127.0.0.1:8000/api/birth-stats/')
      .then(response => response.json())
      .then(data => {
        const processedBirthStats = processStats(data);
        setBirthStats(processedBirthStats);
      })
      .catch(error => console.error('Error fetching birth stats:', error));
  }, []);

  // Helper function to process the stats and calculate totals
  const processStats = (apiData) => {
    const totals = { Male: 0, Female: 0 };
    Object.keys(apiData).forEach(month => {
      totals.Male += apiData[month].Male;
      totals.Female += apiData[month].Female;
    });
    return totals;
  };

  return (
    <>
      <Box sx={{ display: 'flex' }}>
        <Sidebar />

        <Box component="main" sx={{ flexGrow: 1, p: 3, marginTop: "65px" }}>
          <Typography>
            <div className='max-w-7xl mx-auto'>
              {/* Dashboard banner */}
              <div className="mt-5 p-5 bg-gray-100 rounded shadow">
                <h1 className="text-2xl font-bold text-blue-600">Dashboard</h1>
              </div>

              {/* Cards area */}
              <div className="pt-5 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 mb-8">

                {/* Death certificates (Male) */}
                <div className='bg-red-500 shadow-lg rounded-lg p-6 text-center text-white cursor-pointer transition-transform duration-200 transform hover:scale-105 active:scale-95'>
                  <h2 className='text-lg font-semibold'>Death Certificates</h2>
                  <p>Male</p>
                  <p className='text-3xl font-bold mt-4'>{deathStats.Male}</p>
                </div>

                {/* Death certificates (Female) */}
                <div className='bg-red-500 shadow-lg rounded-lg p-6 text-center text-white cursor-pointer transition-transform duration-200 transform hover:scale-105 active:scale-95'>
                  <h2 className='text-lg font-semibold'>Death Certificates</h2>
                  <p>Female</p>
                  <p className='text-3xl font-bold mt-4'>{deathStats.Female}</p>
                </div>

                {/* Birth certificates (Male) */}
                <div className='bg-blue-500 shadow-lg rounded-lg p-6 text-center text-white cursor-pointer transition-transform duration-200 transform hover:scale-105 active:scale-95'>
                  <h2 className='text-lg font-semibold'>Birth Certificates</h2>
                  <p>Male</p>
                  <p className='text-3xl font-bold mt-4'>{birthStats.Male}</p>
                </div>

                {/* Birth certificates (Female) */}
                <div className='bg-blue-500 shadow-lg rounded-lg p-6 text-center text-white cursor-pointer transition-transform duration-200 transform hover:scale-105 active:scale-95'>
                  <h2 className='text-lg font-semibold'>Birth Certificates</h2>
                  <p>Female</p>
                  <p className='text-3xl font-bold mt-4'>{birthStats.Female}</p>
                </div>
              </div>

              {/* Chart sections */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Chart 1 */}
                <div className="bg-white shadow-lg rounded-lg p-6">
                  <h3 className='text-lg font-semibold text-gray-700 mb-4'>Birth Certificate</h3>
                  <div className='h-64 bg-gray-100 flex items-center justify-center'>
                    {/* Bar chart here */}
                    <BarChart />
                  </div>
                </div>

                {/* Chart 2 */}
                <div className="bg-white shadow-lg rounded-lg p-6">
                  <h3 className='text-lg font-semibold text-gray-700 mb-4'>Death Certificate</h3>
                  <div className='h-64 bg-gray-100 flex items-center justify-center'>
                    {/* Pie chart here */}
                    <DeathPieChart />
                  </div>
                </div>
              </div>
            </div>
          </Typography>
        </Box>
      </Box>
    </>
  );
};

export default Dashboard;
