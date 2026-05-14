import Link from "next/link";
import Image from "next/image";

export default function Footer() {
  return (
    <div className="bg-[#181821] text-[#a9b3bb] pt-16 pb-10 px-6"> {}
      <section className="max-w-[1000px] w-full mx-auto flex flex-wrap justify-start gap-16 md:gap-24">
        {/* 
            
        */}

        {/* Khối Thông tin */}
        <section className="max-w-[300px] w-full">
          <div>
            <Link className="flex items-center gap-2" href="/">
              <Image
                className="rounded-lg"
                src="https://res.cloudinary.com/db7qyis4q/image/upload/v1777673788/rypnkqgnfai8h0lfoosl_tbxk26.png"
                width={40}
                height={40}
                alt="logo"
              />
              <h2 className="text-[#fff] font-black text-xl tracking-tight">E-pharmacy</h2>
            </Link>
          </div>
          <div className="text-[14px] leading-[22px] my-[20px]">
            <p className="mb-2">
              <span className="text-[#fff] font-semibold">Điện thoại: </span>
              02438224524
            </p>
            <p className="mb-2">
              <span className="text-[#fff] font-semibold">Email: </span>
              <Link href="mailto:epharmacy@gmail.com" className="hover:text-white transition">
                epharmacy626@gmail.com
              </Link>
            </p>
            <p className="mb-2">
              <span className="text-[#fff] font-semibold">Đội ngũ phát triển: </span>
              Sinh viên Học Viện Kỹ Thuật Mật Mã
            </p>
            <p>Nguyễn Trà Giang</p>
          </div>
          <div>
            <Link href="https://www.dmca.com/Protection/Status.aspx?id=1b325c69-aeb7-4e32-8784-a0009613323a">
              <Image
                className="mt-[10px] opacity-80 hover:opacity-100 transition"
                src="https://res.cloudinary.com/db7qyis4q/image/upload/v1777691247/qqcfpb8pbggrmqkodeko_xp89bt.png"
                width={121}
                height={24}
                alt="DMCA Protected"
              />
            </Link>
          </div>
        </section>

        {/* Khối Liên kết */}
        {/* Khối Liên kết */}
      <section className="min-w-[180px]">
        <h2 className="text-[#fff] text-[20px] mb-6 font-bold">
          Về chúng tôi
        </h2>

        <ul className="space-y-4">
          <li className="text-[16px]">
            <Link href="#" className="hover:text-white transition">
              Giới thiệu
            </Link>
          </li>
          <li className="text-[16px]">
            <Link href="#" className="hover:text-white transition">
              Liên hệ
            </Link>
          </li>
          <li className="text-[16px]">
            <Link href="#" className="hover:text-white transition">
              Điều khoản
            </Link>
          </li>
          <li className="text-[16px]">
            <Link href="#" className="hover:text-white transition">
              Bảo mật
            </Link>
          </li>
        </ul>
      </section>

      </section>

      {/* Copyright */}
      <div className="max-w-[1000px] mx-auto mt-12 pt-6 border-t border-[#2a2a3a] text-center text-[13px] opacity-60">
        © 2026 E-pharmacy — Sinh viên Học Viện Kỹ Thuật Mật Mã
      </div>
    </div>
  );
}