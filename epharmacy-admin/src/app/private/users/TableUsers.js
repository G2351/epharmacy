"use client";
import React, { useCallback, useState } from "react";
import {
  Modal, ModalContent, ModalHeader, ModalBody, ModalFooter,
  Button, useDisclosure, Chip, Select, SelectItem,
} from "@nextui-org/react";
import {
  useGetAllUsersQuery, useUpdateUserMutation, useDeleteUserMutation,
} from "@/stores/slices/api/user.slice.api";
import {
  Table, TableHeader, TableColumn, TableBody, TableRow, TableCell,
  Tooltip, Pagination,
} from "@nextui-org/react";
import { FaRegEye } from "react-icons/fa6";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { IoWarningOutline } from "react-icons/io5";
import { toast } from "sonner";

const statusColorMap = { active: "success", inactive: "danger" };

function TableUsers() {
  const [query, setQuery] = useState({ page: 1, limit: 10 });
  const [userDetail, setUserDetail] = useState(null);
  const [typeAction, setTypeAction] = useState(null);
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const { data, isLoading } = useGetAllUsersQuery(query);
  const [updateUser, { isLoading: loadingUpdate }] = useUpdateUserMutation();
  const [deleteUser, { isLoading: loadingDelete }] = useDeleteUserMutation();

  const handleOpenModal = (user, type) => {
    setUserDetail({ ...user });
    setTypeAction(type);
    onOpen();
  };

  const handleUpdate = async (onClose) => {
    try {
      const res = await updateUser({ 
        id: userDetail.id, 
        status: userDetail.status,
        role: userDetail.role,
      }).unwrap();
      if (res.status === 200) { toast.success("Cập nhật thành công!"); onClose(); }
    } catch { toast.error("Cập nhật thất bại!"); }
  };

  const handleDelete = async (onClose) => {
    try {
      const res = await deleteUser(userDetail.id).unwrap();
      if (res.status === 200) { toast.success("Xóa thành công!"); onClose(); }
    } catch { toast.error("Xóa thất bại!"); }
  };

  const columns = [
    { name: "TÊN", uid: "name" },
    { name: "EMAIL", uid: "email" },
    { name: "TRẠNG THÁI", uid: "status" },
    { name: "VAI TRÒ", uid: "role"},
    { name: "THAO TÁC", uid: "actions" },
  ];

  const renderCell = useCallback((user, columnKey) => {
    switch (columnKey) {
      case "name":
        return <p className="text-sm font-semibold">{user.name}</p>;
      case "email":
        return <p className="text-sm">{user.email}</p>;
      case "status":
        return (
          <Chip className="capitalize" color={statusColorMap[user.status] || "default"} size="sm" variant="flat">
            {user.status}
          </Chip>
        );
      case "role":
        return (
          <Chip
            size="sm"
            variant="flat"
            color={user.role === "admin" ? "secondary" : "default"}
          >
            {user.role || "user"}
          </Chip>
        );
      case "actions":
        return (
          <div className="flex items-center justify-center gap-3">
            <Tooltip content="Chi tiết">
              <span className="text-lg cursor-pointer text-blue-400 hover:text-blue-600">
                <FaRegEye onClick={() => handleOpenModal(user, "view")} />
              </span>
            </Tooltip>
            <Tooltip content="Chỉnh sửa">
              <span className="text-lg cursor-pointer text-yellow-400 hover:text-yellow-600">
                <FaEdit onClick={() => handleOpenModal(user, "edit")} />
              </span>
            </Tooltip>
            <Tooltip color="danger" content="Xóa">
              <span className="text-lg cursor-pointer text-red-400 hover:text-red-600">
                <MdDelete onClick={() => handleOpenModal(user, "delete")} />
              </span>
            </Tooltip>
          </div>
        );
      default:
        return user[columnKey];
    }
  }, []);

  const getBodyModal = () => {
    switch (typeAction) {
      case "view":
        return (
          <div className="flex flex-col gap-3 p-2">
            <div><p className="text-xs text-gray-400">Tên</p><p className="font-semibold">{userDetail?.name}</p></div>
            <div><p className="text-xs text-gray-400">Email</p><p>{userDetail?.email}</p></div>
            <div>
              <p className="text-xs text-gray-400">Trạng thái</p>
              <Chip className="capitalize mt-1" color={statusColorMap[userDetail?.status] || "default"} size="sm" variant="flat">
                {userDetail?.status}
              </Chip>
            </div>
            <div><p className="text-xs text-gray-400">Role</p><p>{userDetail?.role}</p></div>
          </div>
        );
      case "edit":
        return (
          <div className="flex flex-col gap-3">
            <div>
              <p className="text-sm text-gray-400 mb-1">Tên: <span className="text-white">{userDetail?.name}</span></p>
              <p className="text-sm text-gray-400">Email: <span className="text-white">{userDetail?.email}</span></p>
            </div>
            <Select
              label="Trạng thái"
              defaultSelectedKeys={[userDetail?.status]}
              onChange={(e) => setUserDetail({ ...userDetail, status: e.target.value })}
            >
              <SelectItem key="active">Active</SelectItem>
              <SelectItem key="inactive">Inactive</SelectItem>
            </Select>
            <Select
              label="Role"
              defaultSelectedKeys={[userDetail?.role || "user"]}
              onChange={(e) => setUserDetail({ ...userDetail, role: e.target.value })}
            >
              <SelectItem key="user">User</SelectItem>
              <SelectItem key="admin">Admin</SelectItem>
            </Select>
          </div>
        );
      case "delete":
        return (
          <div className="flex items-center gap-3 p-2">
            <IoWarningOutline className="text-yellow-500 text-3xl flex-shrink-0" />
            <div>
              <p className="font-semibold">Bạn có chắc muốn xóa tài khoản này?</p>
              <p className="text-sm text-gray-400">{userDetail?.name} — {userDetail?.email}</p>
            </div>
          </div>
        );
      default: return null;
    }
  };

  const getTitleModal = () => {
    switch (typeAction) {
      case "view": return "Chi tiết người dùng";
      case "edit": return "Cập nhật trạng thái";
      case "delete": return <div className="flex items-center gap-2"><IoWarningOutline className="text-yellow-500" /> Xác nhận xóa</div>;
      default: return "";
    }
  };

  if (isLoading) return <div className="p-10 text-center text-gray-400">Đang tải...</div>;

  const pages = Math.ceil((data?.data?.count || 0) / query.limit) || 1;
  const allUsers = data?.data?.users || [];

  return (
    <>
      <Table
        aria-label="Danh sách người dùng"
        bottomContent={
          pages > 1 ? (
            <div className="flex justify-center w-full">
              <Pagination isCompact showControls showShadow color="primary" page={query.page} total={pages} onChange={(page) => setQuery({ ...query, page })} />
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
        <TableBody items={allUsers} emptyContent="Không có người dùng nào">
          {(item) => (
            <TableRow key={item.id}>
              {(columnKey) => <TableCell>{renderCell(item, columnKey)}</TableCell>}
            </TableRow>
          )}
        </TableBody>
      </Table>

      <Modal size={typeAction === "delete" ? "md" : "lg"} isOpen={isOpen} onOpenChange={onOpenChange} scrollBehavior="inside">
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader>{getTitleModal()}</ModalHeader>
              <ModalBody>{getBodyModal()}</ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>Đóng</Button>
                {typeAction === "edit" && (
                  <Button color="primary" isLoading={loadingUpdate} onPress={() => handleUpdate(onClose)}>
                    Lưu thay đổi
                  </Button>
                )}
                {typeAction === "delete" && (
                  <Button color="danger" isLoading={loadingDelete} onPress={() => handleDelete(onClose)}>
                    Xác nhận xóa
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

export default TableUsers;