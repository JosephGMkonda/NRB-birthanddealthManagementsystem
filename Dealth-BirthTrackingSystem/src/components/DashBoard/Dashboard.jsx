import React from 'react'
import ProfilePic from '../../assets/ProfilePc.png'
const Dashboard = () => {
  return (
    <div  className='flex items-center justify-between h-[70px] shadow-lg px-[25px]'>
        <div>
            <div>
            </div>
            </div>
        <div className='flex items-center p-[10px]'>
            <p className='px-[10px]'>Joseph Mkonda</p>
            <div className='rounded-full bg-[#4E73DF] cursor-pointer'>
            <img src={ProfilePic} alt='' className='w-[40px]'/>
            </div>
        </div>
    </div>
  )
}

export default Dashboard