"use client";
import { usePathname } from 'next/navigation';
import Link from "next/link";
import { menu } from "../utils/menuData";

export default function SideBar() {
  const pathname = usePathname();

  return (
    <aside className="flex-shrink-0 w-[96px] border-r border-[#e8ebed]">
      <div className="sticky top-[66px] px-2 py-4">
        <ul className="flex flex-col gap-1">
          {menu.map(({ title, icon, path }, index) => (
            <li key={index}>
              <Link
                href={path}
                className={`flex flex-col items-center justify-center w-[72px] h-[72px] rounded-2xl cursor-pointer transition hover:bg-[#f0f0f0] ${
                  pathname === path ? "bg-[#e8ebed]" : ""
                }`}
              >
                {icon}
                <span className="text-[11px] text-[#404040] mt-1 font-semibold text-center">
                  {title}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </aside>
  );
}