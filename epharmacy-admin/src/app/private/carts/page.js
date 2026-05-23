import React from "react";
import TableCart from "./TableCart";

const Carts = () => {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6 text-white">Lịch sử đơn hàng</h1>
      <TableCart />
    </div>
  );
};

export default Carts;
