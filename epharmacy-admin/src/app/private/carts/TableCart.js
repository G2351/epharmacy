"use client";
import React, { useCallback, useState } from "react";
import {
  Modal, ModalContent, ModalHeader, ModalBody, ModalFooter,
  Button, useDisclosure, Chip,
} from "@nextui-org/react";
import {
  useGetAllOrdersQuery, useUpdateOrderStatusMutation,
} from "@/stores/slices/api/cart.slice.api";
import {
  Table, TableHeader, TableColumn, TableBody, TableRow, TableCell,
  Tooltip, Pagination,
} from "@nextui-org/react";
import { FaRegEye } from "react-icons/fa6";
import { MdOutlineDownloadDone } from "react-icons/md";
import { toast } from "sonner";

const formatVND = (v) => Number(v).toLocaleString("vi-VN") + " đ";

const STATUS_LABELS = {
  pending: "Chờ xử lý",
  processing: "Đang xử lý",
  done: "Hoàn thành",
  cancelled: "Đã hủy",
};

const statusColorMap = {
  done: "success",
  pending: "warning",
  processing: "primary",
  cancelled: "danger",
};

function TableCart() {
  const queryInit = { page: 1, limit: 10 };
  const [orderDetail, setOrderDetail] = useState(null);
  const [orderUpdate, setOrderUpdate] = useState(null);
  const [typeAction, setTypeAction] = useState(null);
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [updateOrderStatus, { isLoading: loadingUpdate }] = useUpdateOrderStatusMutation();

  const [query, setQuery] = useState(queryInit);
  const { data, isLoading } = useGetAllOrdersQuery(query);

  const handleOpenDetail = (order, type) => {
    setOrderDetail(order);
    setTypeAction(type);
    onOpen();
  };

  const handleOpenConfirm = (order, type) => {
    setTypeAction(type);
    setOrderUpdate(order);
    onOpen();
  };

  const renderCell = useCallback((order, columnKey) => {
    switch (columnKey) {
      case "order_code":
        return <div className="text-sm font-semibold">{order.order_code}</div>;
      case "customer":
        return (
          <div className="text-sm">
            <p className="font-medium">{order.recipient_name || order.user?.name}</p>
            <p className="text-gray-400 text-xs">{order.user?.email}</p>
          </div>
        );
      case "items_count":
        return <div className="text-sm">{order.items?.length || 0} SP</div>;
      case "total_amount":
        return <div className="text-sm font-semibold text-green-500">{formatVND(order.total_amount)}</div>;
      case "created_at":
        return (
          <div className="text-sm text-gray-400">
            {new Date(order.created_at).toLocaleDateString("vi-VN", {
              day: "2-digit", month: "2-digit", year: "numeric",
              hour: "2-digit", minute: "2-digit",
            })}
          </div>
        );
      case "status":
        return (
          <Chip className="capitalize" color={statusColorMap[order.status]} size="sm" variant="flat">
            {STATUS_LABELS[order.status] || order.status}
          </Chip>
        );
      case "actions":
        return (
          <div className="relative flex items-center justify-center gap-2">
            <Tooltip content="Chi tiết">
              <span className="text-lg cursor-pointer text-default-400 active:opacity-50">
                <FaRegEye onClick={() => handleOpenDetail(order, "view")} />
              </span>
            </Tooltip>
            {order.status !== "done" && order.status !== "cancelled" && (
              <Tooltip content="Hoàn thành đơn">
                <span className="text-lg cursor-pointer text-default-400 active:opacity-50">
                  <MdOutlineDownloadDone onClick={() => handleOpenConfirm(order, "markDone")} />
                </span>
              </Tooltip>
            )}
          </div>
        );
      default:
        return order[columnKey];
    }
  }, []);

  const columns = [
    { name: "MÃ ĐƠN", uid: "order_code" },
    { name: "KHÁCH HÀNG", uid: "customer" },
    { name: "SẢN PHẨM", uid: "items_count" },
    { name: "TỔNG TIỀN", uid: "total_amount" },
    { name: "NGÀY ĐẶT", uid: "created_at" },
    { name: "TRẠNG THÁI", uid: "status" },
    { name: "THAO TÁC", uid: "actions" },
  ];

  if (isLoading) return <div className="p-6 text-center text-gray-400">Đang tải...</div>;

  const rowsPerPage = query.limit;
  const pages = Math.ceil((data?.data?.count || 0) / rowsPerPage) || 1;
  const allOrders = data?.data?.orders || [];

  const handleChangePagination = (page) => setQuery({ ...query, page });

  const handleMarkAsDone = async (onClose) => {
    const resUpdate = await updateOrderStatus({
      id: orderUpdate.id,
      status: "done",
    }).unwrap();
    if (resUpdate.status === 200) {
      toast.success("Cập nhật đơn hàng thành công!");
      onClose();
    }
  };

  const getBodyModal = () => {
    if (typeAction === "markDone") {
      return (
        <div>
          Xác nhận hoàn thành đơn <strong>{orderUpdate?.order_code}</strong>?
        </div>
      );
    }
    if (typeAction === "view" && orderDetail) {
      return (
        <div className="flex flex-col gap-3">
          <div className="grid grid-cols-2 gap-2 text-sm">
            <div><span className="text-gray-400">Mã đơn:</span> {orderDetail.order_code}</div>
            <div>
              <span className="text-gray-400">Trạng thái:</span>{" "}
              <Chip color={statusColorMap[orderDetail.status]} size="sm" variant="flat">
                {STATUS_LABELS[orderDetail.status]}
              </Chip>
            </div>
            <div><span className="text-gray-400">Khách hàng:</span> {orderDetail.recipient_name}</div>
            <div><span className="text-gray-400">Email:</span> {orderDetail.email}</div>
            <div><span className="text-gray-400">SĐT:</span> {orderDetail.phone}</div>
            <div><span className="text-gray-400">Địa chỉ:</span> {orderDetail.address}</div>
            {orderDetail.note && (
              <div className="col-span-2"><span className="text-gray-400">Ghi chú:</span> {orderDetail.note}</div>
            )}
          </div>
          <div className="border-t border-gray-700 pt-3">
            <p className="font-semibold mb-2">Sản phẩm ({orderDetail.items?.length || 0})</p>
            {orderDetail.items?.map((item) => (
              <div key={item.id} className="flex items-center gap-3 py-2 border-b border-gray-800 last:border-0">
                <img
                  src={item.image || "https://via.placeholder.com/40"}
                  alt={item.name}
                  className="w-10 h-10 rounded object-contain bg-gray-800"
                />
                <div className="flex-1">
                  <p className="text-sm font-medium">{item.name}</p>
                  <p className="text-xs text-gray-400">x{item.quantity} • {formatVND(item.new_price)}</p>
                </div>
                <p className="text-sm font-semibold text-green-400">
                  {formatVND(item.new_price * item.quantity)}
                </p>
              </div>
            ))}
          </div>
          <div className="flex justify-between font-bold text-base border-t border-gray-700 pt-3">
            <span>Tổng cộng</span>
            <span className="text-green-400">{formatVND(orderDetail.total_amount)}</span>
          </div>
        </div>
      );
    }
    return null;
  };

  return (
    <>
      <Table
        aria-label="Bảng lịch sử đơn hàng"
        bottomContent={
          pages > 0 ? (
            <div className="flex justify-center w-full">
              <Pagination
                isCompact showControls showShadow
                color="primary"
                page={query.page}
                total={pages}
                onChange={(page) => handleChangePagination(page)}
              />
            </div>
          ) : null
        }
      >
        <TableHeader columns={columns}>
          {(column) => (
            <TableColumn key={column.uid} align={column.uid === "actions" ? "center" : "start"}>
              {column.name}
            </TableColumn>
          )}
        </TableHeader>
        <TableBody items={allOrders} emptyContent="Chưa có đơn hàng nào">
          {(item) => (
            <TableRow key={item.id}>
              {(columnKey) => <TableCell>{renderCell(item, columnKey)}</TableCell>}
            </TableRow>
          )}
        </TableBody>
      </Table>
      <Modal
        size={typeAction === "markDone" ? "md" : "3xl"}
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        shouldBlockScroll
        scrollBehavior="inside"
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader>
                {typeAction === "view" ? "Chi tiết đơn hàng" : "Xác nhận hoàn thành"}
              </ModalHeader>
              <ModalBody>{getBodyModal()}</ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Đóng
                </Button>
                {typeAction === "markDone" && (
                  <Button color="primary" isLoading={loadingUpdate} onPress={() => handleMarkAsDone(onClose)}>
                    Hoàn thành
                  </Button>
                )}
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}

export default TableCart;
