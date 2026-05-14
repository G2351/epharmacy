'use client'
import React from 'react'
import { MdMedication, MdShoppingCart, MdArticle, MdPeople } from 'react-icons/md'
import StatsDashboard from "./StatsDashboard";

const DashboardPage = () => {
  return (
    <div className='p-6'>
      <h1 className='text-2xl font-bold mb-6 text-white'>Dashboard</h1>
      <div className='grid grid-cols-2 gap-4 lg:grid-cols-4 mb-6'>
        <div className='bg-[#1a1a2e] rounded-xl p-5 flex items-center gap-4'>
          <MdMedication size={40} color='#00b4d8' />
          <div>
            <p className='text-gray-400 text-sm'>Sản phẩm</p>
            <p className='text-white text-xl font-bold'>Thuốc</p>
          </div>
        </div>
        <div className='bg-[#1a1a2e] rounded-xl p-5 flex items-center gap-4'>
          <MdShoppingCart size={40} color='#f77f00' />
          <div>
            <p className='text-gray-400 text-sm'>Quản lý</p>
            <p className='text-white text-xl font-bold'>Đơn hàng</p>
          </div>
        </div>
        <div className='bg-[#1a1a2e] rounded-xl p-5 flex items-center gap-4'>
          <MdArticle size={40} color='#06d6a0' />
          <div>
            <p className='text-gray-400 text-sm'>Nội dung</p>
            <p className='text-white text-xl font-bold'>Bài viết</p>
          </div>
        </div>
        <div className='bg-[#1a1a2e] rounded-xl p-5 flex items-center gap-4'>
          <MdPeople size={40} color='#ef476f' />
          <div>
            <p className='text-gray-400 text-sm'>Tài khoản</p>
            <p className='text-white text-xl font-bold'>Người dùng</p>
          </div>
        </div>
      </div>
      <StatsDashboard />
    </div>
  )
}

export default DashboardPage;