"use client";
import { useGetStatisticsQuery } from "@/stores/slices/api/cart.slice.api";
import { Card, CardBody } from "@nextui-org/react";
import { Bar, Doughnut } from "react-chartjs-2";
import {
  Chart as ChartJS, CategoryScale, LinearScale, BarElement,
  Title, Tooltip, Legend, ArcElement,
} from "chart.js";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement);

const formatVND = (v) => Number(v).toLocaleString("vi-VN") + "đ";

export default function StatsDashboard() {
  const { data, isLoading } = useGetStatisticsQuery();

  if (isLoading) return <div className="p-10 text-center text-gray-400">Đang tải...</div>;

  const stats = data?.data;
  if (!stats) return <div className="p-10 text-center text-gray-400">Không có dữ liệu</div>;

  const statusMap = { pending: "Chờ xử lý", done: "Hoàn thành", confirm: "Xác nhận" };
  const colorMap = { pending: "#f59e0b", done: "#10b981", confirm: "#3b82f6" };

  const barData = {
    labels: stats.revenueByMonth.map((item) =>
      new Date(item.month).toLocaleDateString("vi-VN", { month: "short", year: "numeric" })
    ),
    datasets: [
      {
        label: "Doanh thu (đ)",
        data: stats.revenueByMonth.map((item) => Number(item.revenue)),
        backgroundColor: "#3b82f6",
        borderRadius: 6,
      },
      {
        label: "Số đơn hàng",
        data: stats.revenueByMonth.map((item) => Number(item.orders)),
        backgroundColor: "#10b981",
        borderRadius: 6,
        yAxisID: "y1",
      },
    ],
  };

  const barOptions = {
    responsive: true,
    plugins: {
      legend: { labels: { color: "#9ca3af" } },
      tooltip: {
        callbacks: {
          label: (ctx) =>
            ctx.dataset.label === "Doanh thu (đ)"
              ? formatVND(ctx.raw)
              : `${ctx.raw} đơn`,
        },
      },
    },
    scales: {
      x: { ticks: { color: "#9ca3af" }, grid: { color: "#1f2937" } },
      y: {
        ticks: { color: "#9ca3af", callback: (v) => (v / 1000) + "k" },
        grid: { color: "#1f2937" },
      },
      y1: {
        position: "right",
        ticks: { color: "#9ca3af" },
        grid: { drawOnChartArea: false },
      },
    },
  };

  const doughnutData = {
    labels: stats.ordersByStatus.map((s) => statusMap[s.status] || s.status),
    datasets: [{
      data: stats.ordersByStatus.map((s) => Number(s.count)),
      backgroundColor: stats.ordersByStatus.map((s) => colorMap[s.status] || "#6b7280"),
      borderWidth: 0,
    }],
  };

  const doughnutOptions = {
    responsive: true,
    plugins: {
      legend: { position: "bottom", labels: { color: "#9ca3af", padding: 16 } },
    },
  };

  return (
    <div className="flex flex-col gap-6 px-4 pb-6">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-blue-950 border border-blue-800 rounded-xl p-4">
          <p className="text-xs text-blue-400 font-semibold">Tổng doanh thu</p>
          <p className="text-lg font-bold text-blue-300 mt-1">{formatVND(stats.totalRevenue)}</p>
        </div>
        {stats.ordersByStatus.map((s) => (
          <div key={s.status} className="bg-[#1a1a2e] border border-gray-700 rounded-xl p-4">
            <p className="text-xs font-semibold" style={{ color: colorMap[s.status] || "#fff" }}>
              {statusMap[s.status] || s.status}
            </p>
            <p className="text-lg font-bold mt-1 text-white">{s.count} đơn</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2 bg-[#1a1a2e] border border-gray-700 rounded-xl p-4">
          <p className="font-bold text-lg mb-4 text-white">Doanh thu theo tháng</p>
          {stats.revenueByMonth.length === 0 ? (
            <p className="text-gray-400 text-center py-10">Chưa có dữ liệu</p>
          ) : (
            <Bar data={barData} options={barOptions} />
          )}
        </div>
        <div className="bg-[#1a1a2e] border border-gray-700 rounded-xl p-4">
          <p className="font-bold text-lg mb-4 text-white">Trạng thái đơn hàng</p>
          {stats.ordersByStatus.length === 0 ? (
            <p className="text-gray-400 text-center py-10">Chưa có dữ liệu</p>
          ) : (
            <Doughnut data={doughnutData} options={doughnutOptions} />
          )}
        </div>
      </div>

      <div className="bg-[#1a1a2e] border border-gray-700 rounded-xl p-4">
        <p className="font-bold text-lg mb-4 text-white">Top 5 thuốc bán chạy</p>
        {stats.topMedicines.length === 0 ? (
          <p className="text-gray-400 text-center py-6">Chưa có dữ liệu</p>
        ) : (
          <div className="flex flex-col gap-3">
            {stats.topMedicines.map((item, index) => (
              <div key={item.product_id} className="flex items-center gap-3">
                <div className="w-7 h-7 rounded-full bg-blue-900 flex items-center justify-center text-blue-300 font-bold text-sm flex-shrink-0">
                  {index + 1}
                </div>
                <img
                  src={item.image || "https://via.placeholder.com/40"}
                  alt={item.name}
                  className="w-10 h-10 rounded-lg object-contain bg-gray-800 border border-gray-700"
                />
                <div className="flex-1">
                  <p className="font-semibold text-sm text-white">{item.name}</p>
                  <p className="text-xs text-gray-400">Đã bán: {item.totalSold} sản phẩm</p>
                </div>
                <p className="font-bold text-sm text-green-400">{formatVND(item.totalRevenue)}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}