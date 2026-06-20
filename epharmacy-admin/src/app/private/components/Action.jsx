"use client";
import { Avatar, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger } from "@nextui-org/react";
import { useRouter } from 'next/navigation';
import Cookies from 'js-cookie';

export default function Action() {
  const router = useRouter();

  const handleLogout = () => {
    Cookies.remove('login');
    router.push('/public/auth/login');
  };

  return (
    <div className="flex gap-3 items-center">
      <span className="text-sm font-semibold text-[#242424]">Admin</span>
      <Dropdown>
        <DropdownTrigger>
          <Avatar
            showFallback
            name="A"
            className="cursor-pointer bg-[#ef476f] text-white font-bold"
          />
        </DropdownTrigger>
        <DropdownMenu aria-label="Actions">
          
          <DropdownItem key="logout" color="danger" onClick={handleLogout}>
            Đăng xuất
          </DropdownItem>
        </DropdownMenu>
      </Dropdown>
    </div>
  );
}