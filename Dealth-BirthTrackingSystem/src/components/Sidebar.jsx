
import React from 'react'
import { FiHome } from "react-icons/fi";
import { BsFillPeopleFill } from "react-icons/bs";
const Sidebar = () => {
  return (
    <div className='bg-[#4E73DF] h-screen px-[25px]'>
        <div className='px-[15px] py-[20px] flex items-center justify-center'>
            <h1 className='text-white text-[20px] font-bold cursor-pointer'>Certificate Issue</h1>
        </div>

        <a className='flex items-center gap-[15px] py-[20px] border-b-[1px] border-[#LDLDLD]/[0.1] cursor-pointer'>
        <FiHome color='white'/>
            <p className='text-[14px] leading-[20px] font-bold text-white'>Dashboard</p>
         
            </a>
            <div className='items-center py-[20px]'>

                <a className=' flex items-center gap-[15px] py-[20px] cursor-pointer'>
                <BsFillPeopleFill color='white'/>
                    <p className='text-[14px] leading-[20px] font-bold text-white'>Birth</p>
                </a>
                

                <a className=' flex items-center gap-[15px] py-[20px] cursor-pointer'>
                <BsFillPeopleFill color='white'/>
                    <p className='text-[14px] leading-[20px] font-bold text-white'>Death</p>
                </a>
                

            </div>
    </div>
  )
}

export default Sidebar