'use client'
import React from 'react'
import { MdMedication, MdShoppingCart, MdArticle, MdPeople } from 'react-icons/md'
import StatsDashboard from "./StatsDashboard";
import { useRouter } from 'next/navigation';

const DashboardPage = () => {
  const router = useRouter();

  const cards = [
    {
      icon: <MdMedication size={40} color='#00b4d8' />,
      label: 'Sản phẩm', title: 'Thuốc',
      href: '/private/medicines',
    },
    {
      icon: <MdShoppingCart size={40} color='#f77f00' />,
      label: 'Quản lý', title: 'Đơn hàng',
      href: '/private/carts',
    },
    {
      icon: <MdArticle size={40} color='#06d6a0' />,
      label: 'Nội dung', title: 'Bài viết',
      href: '/private/articles',
    },
    {
      icon: <MdPeople size={40} color='#ef476f' />,
      label: 'Tài khoản', title: 'Người dùng',
      href: '/private/users',
    },
  ];

  return (
    <div className='p-6'>
      <h1 className='text-2xl font-bold mb-6 text-white'>Dashboard</h1>
      <div className='grid grid-cols-2 gap-4 lg:grid-cols-4 mb-6'>
        {cards.map((card) => (
          <div
            key={card.href}
            onClick={() => router.push(card.href)}
            className='bg-[#1a1a2e] rounded-xl p-5 flex items-center gap-4 cursor-pointer hover:bg-[#252545] hover:scale-[1.02] transition-all duration-200 active:scale-100'
          >
            {card.icon}
            <div>
              <p className='text-gray-400 text-sm'>{card.label}</p>
              <p className='text-white text-xl font-bold'>{card.title}</p>
            </div>
          </div>
        ))}
      </div>
      <StatsDashboard />
    </div>
  );
};

export default DashboardPage;