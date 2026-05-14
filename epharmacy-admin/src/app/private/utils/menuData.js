import { MdDashboard, MdMedication, MdShoppingCart, MdArticle, MdPeople, MdLocalOffer, MdLocationOn } from 'react-icons/md';
import React from 'react';

export const menu = [
     {
          title: 'Dashboard',
          icon: React.createElement(MdDashboard, { size: 24, color: '#404040' }),
          path: '/private/dashboard',
     },
     {
          title: 'Thuốc',
          icon: React.createElement(MdMedication, { size: 24, color: '#404040' }),
          path: '/private/medicines',
     },
     {
          title: 'Đơn hàng',
          icon: React.createElement(MdShoppingCart, { size: 24, color: '#404040' }),
          path: '/private/carts',
     },
     {
          title: 'Bài viết',
          icon: React.createElement(MdArticle, { size: 24, color: '#404040' }),
          path: '/private/articles',
     },
     {
          title: 'Người dùng',
          icon: React.createElement(MdPeople, { size: 24, color: '#404040' }),
          path: '/private/users',
     },
     {
          title: 'Voucher',
          icon: React.createElement(MdLocalOffer, { size: 24, color: '#404040' }),
          path: '/private/vouchers',
     },
];