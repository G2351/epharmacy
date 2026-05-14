import React from "react";
import Header from "./components/Header";
import SideBar from "./components/SideBar";
import Footer from "./components/Footer";

export default function PrivateLayout({ children }) {
  return (
    <div className="min-h-screen flex flex-col bg-[#f5f6fa]">
      <Header />
      <main className="flex flex-1">
        <SideBar />
        <div className="flex-1 p-6 overflow-auto">
          {children}
        </div>
      </main>
      <Footer />
    </div>
  );
}