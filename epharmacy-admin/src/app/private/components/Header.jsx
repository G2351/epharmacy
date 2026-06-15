import Link from "next/link";
import Image from "next/image";
import clsx from "clsx";
import Search from "./Search";
import Action from "./Action";

export default function Header() {
  return (
    <div className="h-[66px] flex items-center justify-between bg-white px-6 border-b border-[#e8ebed] sticky top-0 z-50">

      {/* LEFT - LOGO */}
      <div className="flex items-center gap-3 min-w-[200px]">
        <Link href="/private/dashboard" className="flex items-center gap-2">
          <Image
            src="https://res.cloudinary.com/db7qyis4q/image/upload/v1777673788/rypnkqgnfai8h0lfoosl_tbxk26.png"
            width={40}
            height={40}
            alt="logo"
            className="rounded-lg"
          />
          <h2 className={clsx("text-[#242424] font-black text-lg", "logo")}>
            E-pharmacy
          </h2>
        </Link>
      </div>

      {/* RIGHT - ADMIN */}
      <div className="flex items-center justify-end min-w-[200px]">
        <Action />
      </div>

    </div>
  );
}