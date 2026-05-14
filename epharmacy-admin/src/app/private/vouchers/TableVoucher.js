"use client";
import React, { useCallback, useState } from "react";
import { nanoid } from "nanoid";
import DatePicker from "react-datepicker";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
  Input,
  Chip,
} from "@nextui-org/react";
import {
  useGetAllVouchersQuery,
  useCreateVoucherMutation,
  useUpdateVoucherMutation,
  useDeleteVoucherMutation,
} from "@/stores/slices/api/voucher.slice.api";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Tooltip,
  Pagination,
} from "@nextui-org/react";
import { FaRegEye } from "react-icons/fa6";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { IoMdAddCircleOutline } from "react-icons/io";
import { IoWarningOutline } from "react-icons/io5";
import _ from "lodash";
import { toast } from "sonner";
import moment from "moment";
export const SERVER_URL = process.env.SERVER_URL;

function TableVoucher() {
  const queryInit = {
    page: 1,
    limit: 2,
  };

  const [voucherDetail, setVoucherDetail] = useState({
    expired_at: new Date(),
  });
  const [voucherDelete, setVoucherDelete] = useState(null);
  const [voucherClone, setVoucherClone] = useState(null);
  const isChange = _.isEqual(voucherClone, voucherDetail);
  const [typeAction, setTypeAction] = useState(null);
  const [errors, setErrors] = useState({});
  const isError = _.some(errors, (value) => value !== null);
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [createVoucher, { isLoading: loadingCreate }] =
    useCreateVoucherMutation();
  const [updateVoucher, { isLoading: loadingUpdate }] =
    useUpdateVoucherMutation();
  const [deleteVoucher, { isLoading: loadingDelete }] =
    useDeleteVoucherMutation();

  // ✅ Cần đủ 4 fields: name, voucher_code, discount_amount, expired_at
  const handleCheckCreate = () => {
    if (voucherDetail) {
      const requiredFields = ["name", "voucher_code", "discount_amount", "expired_at"];
      const hasAllFields = requiredFields.every(
        (field) => voucherDetail[field] !== undefined && voucherDetail[field] !== ""
      );
      if (hasAllFields && !isError) {
        return true;
      }
    }
    return false;
  };

  const handleSave = async (onClose) => {
    try {
      const dataCreate = _.clone(voucherDetail);
      dataCreate.expired_at = moment(dataCreate.expired_at).format("YYYY-MM-DD");
      dataCreate.is_used = false;
      dataCreate.discount_amount = +dataCreate.discount_amount;
      delete dataCreate.created_at;
      delete dataCreate.update_at;
      console.log("dataCreate::", dataCreate);
      const resCreate = await createVoucher(dataCreate).unwrap();
      if (resCreate.status === 201) {
        toast.success("Tạo voucher thành công");
        onClose();
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleUpdateVoucher = async (onClose) => {
    const dataUpdate = { ...voucherDetail };
    delete dataUpdate.created_at;
    delete dataUpdate.update_at;
    const resUpdate = await updateVoucher(voucherDetail).unwrap();
    if (resUpdate.status === 200) {
      toast.success("Update voucher success!");
      onClose();
    }
  };

  const handleDeleteVoucher = async (onClose) => {
    const resDelete = await deleteVoucher(voucherDelete.id).unwrap();
    if (resDelete.status === 200) {
      toast.success("Delete voucher success!");
      onClose();
    }
  };

  const handleOpenDetail = (voucher, type) => {
    setVoucherDetail(voucher);
    setVoucherClone(voucher);
    setTypeAction(type);
    setErrors({});
    onOpen();
  };

  const handleOpenModalAddNew = (type) => {
    setTypeAction(type);
    setErrors({});
    setVoucherDetail({ expired_at: new Date() });
    onOpen();
  };

  const handleOpenModalDelete = (product, type) => {
    setVoucherDelete(product);
    setTypeAction(type);
    setErrors({});
    onOpen();
  };

  const handleChangeVoucher = (field, value) => {
    validate(field, value);
    setVoucherDetail({
      ...voucherDetail,
      [field]: value,
    });
  };

  const [query, setQuery] = useState(queryInit);
  const { data, isLoading } = useGetAllVouchersQuery(query);

  const renderCell = useCallback((voucher, columnKey) => {
    const cellValue = voucher[columnKey];
    switch (columnKey) {
      case "name":
        return <span>{voucher.name}</span>;
      case "voucher_code":
        return (
          <div className="flex flex-col">
            <span className="text-sm text-bold">{voucher.voucher_code}</span>
          </div>
        );
      case "discount_amount":
        return (
          <span>
            {Number(voucher.discount_amount).toLocaleString("vi-VN")}đ
          </span>
        );
      case "is_used":
        return (
          <span>
            {voucher.is_used ? (
              <Chip color="success">Đã sử dụng</Chip>
            ) : (
              <Chip color="warning">Chưa sử dụng</Chip>
            )}
          </span>
        );
      case "expired_at":
        return <span>{moment(voucher.expired_at).format("DD-MM-YYYY")}</span>;
      case "actions":
        return (
          <div className="relative flex items-end justify-center gap-2">
            <Tooltip content="Details">
              <span className="text-lg cursor-pointer text-default-400 active:opacity-50">
                <FaRegEye onClick={() => handleOpenDetail(voucher, "view")} />
              </span>
            </Tooltip>
            <Tooltip content="Edit">
              <span className="text-lg cursor-pointer text-default-400 active:opacity-50">
                <FaEdit onClick={() => handleOpenDetail(voucher, "edit")} />
              </span>
            </Tooltip>
            <Tooltip color="danger" content="Delete">
              <span className="text-lg cursor-pointer text-danger active:opacity-50">
                <MdDelete onClick={() => handleOpenModalDelete(voucher, "delete")} />
              </span>
            </Tooltip>
          </div>
        );
      default:
        return cellValue;
    }
  }, []);

  // ✅ Thêm cột DISCOUNT AMOUNT
  const columns = [
    { name: "NAME", uid: "name" },
    { name: "VOUCHER CODE", uid: "voucher_code" },
    { name: "GIẢM GIÁ", uid: "discount_amount" },
    { name: "TRẠNG THÁI", uid: "is_used" },
    { name: "NGÀY HẾT HẠN", uid: "expired_at" },
    { name: "ACTIONS", uid: "actions" },
  ];

  if (isLoading) return <div>Loading...</div>;
  const rowsPerPage = query.limit;
  const pages = Math.ceil((data?.data?.count || 0) / rowsPerPage) || 1;
  const allVouchers = data?.data?.vouchers || [];

  const validate = (field, value) => {
    const error = {};
    if (!value && value !== 0) {
      error[field] = "Not be empty!";
    } else {
      error[field] = null;
    }
    setErrors({ ...errors, ...error });
  };

  const handleChangePagination = (page) => {
    setQuery({ ...query, page });
  };

  const handleCloseModal = (onClose) => {
    onClose();
  };

  const handleOpenChange = () => {
    onOpenChange();
  };

  const handleGenerateVoucherCode = () => {
    const code = nanoid();
    setVoucherDetail({ ...voucherDetail, voucher_code: code });
  };

  const getBodyModal = () => {
    switch (typeAction) {
      case "view":
        return (
          <>
            <p>Tên voucher: {voucherDetail?.name}</p>
            <p>Voucher code: {voucherDetail?.voucher_code}</p>
            {/* ✅ Thêm discount_amount vào view */}
            <p>
              Giảm giá:{" "}
              {Number(voucherDetail?.discount_amount).toLocaleString("vi-VN")}đ
            </p>
            <p>
              Ngày hết hạn:{" "}
              {moment(voucherDetail?.expired_at).format("DD-MM-YYYY")}
            </p>
          </>
        );
      case "edit":
        return (
          <>
            <Input
              label="Tên voucher"
              isInvalid={errors?.["name"] ? true : false}
              errorMessage={errors?.["name"]}
              value={voucherDetail?.name}
              onChange={(e) => handleChangeVoucher("name", e.target.value)}
            />
            <Input
              label="Voucher code"
              isInvalid={errors?.["voucher_code"] ? true : false}
              errorMessage={errors?.["voucher_code"]}
              value={voucherDetail?.voucher_code}
              onChange={(e) =>
                handleChangeVoucher("voucher_code", e.target.value)
              }
            />
            {/* ✅ Thêm discount_amount vào edit */}
            <Input
              label="Giá trị giảm giá (đ)"
              type="number"
              isInvalid={errors?.["discount_amount"] ? true : false}
              errorMessage={errors?.["discount_amount"]}
              value={voucherDetail?.discount_amount?.toString() || ""}
              onChange={(e) =>
                handleChangeVoucher("discount_amount", +e.target.value)
              }
            />
            <p>Expired at: </p>
            <DatePicker
              selected={voucherDetail?.expired_at}
              onChange={(date) => handleChangeVoucher("expired_at", date)}
            />
          </>
        );
      case "create":
        return (
          <>
            {/* ✅ Fix: Input Tên voucher đúng field */}
            <Input
              label="Tên voucher"
              isInvalid={errors?.["name"] ? true : false}
              errorMessage={errors?.["name"]}
              value={voucherDetail?.name || ""}
              onChange={(e) => handleChangeVoucher("name", e.target.value)}
            />
            {/* ✅ Thêm discount_amount vào create */}
            <Input
              label="Giá trị giảm giá (đ)"
              type="number"
              isInvalid={errors?.["discount_amount"] ? true : false}
              errorMessage={errors?.["discount_amount"]}
              value={voucherDetail?.discount_amount?.toString() || ""}
              onChange={(e) =>
                handleChangeVoucher("discount_amount", +e.target.value)
              }
            />
            <p
              onClick={handleGenerateVoucherCode}
              className="mt-2 ml-auto hover:underline hover:cursor-pointer text-[#1B9CFC]"
            >
              Generate voucher code
            </p>
            <Input
              label="Voucher code"
              isInvalid={errors?.["voucher_code"] ? true : false}
              errorMessage={errors?.["voucher_code"]}
              value={voucherDetail?.voucher_code || ""}
              onChange={(e) =>
                handleChangeVoucher("voucher_code", e.target.value)
              }
            />
            {/* ✅ Bỏ Select user — voucher dùng cho tất cả */}
            <p>Expired at: </p>
            <DatePicker
              selected={voucherDetail?.expired_at}
              onChange={(date) => handleChangeVoucher("expired_at", date)}
            />
          </>
        );
      case "delete":
        return (
          <>
            <p>Bạn có chắc chắn muốn xóa voucher này không?</p>
          </>
        );
      default:
        break;
    }
  };

  const getTitleModal = () => {
    switch (typeAction) {
      case "view":
        return <>Chi tiết voucher</>;
      case "edit":
        return <>Chỉnh sửa voucher</>;
      case "create":
        return <>Tạo mới voucher</>;
      case "delete":
        return (
          <div className="flex items-start gap-2">
            <IoWarningOutline fontSize={"1.4rem"} /> Xác nhận
          </div>
        );
      default:
        break;
    }
  };

  return (
    <>
      <Button
        color="primary"
        className="mb-4"
        onClick={() => handleOpenModalAddNew("create")}
      >
        Tạo mới <IoMdAddCircleOutline fontSize={"1.2rem"} />
      </Button>
      <Table
        aria-label="Example table with custom cells"
        bottomContent={
          pages > 0 ? (
            <div className="flex justify-center w-full">
              <Pagination
                isCompact
                showControls
                showShadow
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
            <TableColumn
              key={column.uid}
              align={column.uid === "actions" ? "center" : "start"}
            >
              {column.name}
            </TableColumn>
          )}
        </TableHeader>
        <TableBody items={allVouchers || []}>
          {(item) => (
            <TableRow key={item.id}>
              {(columnKey) => (
                <TableCell>{renderCell(item, columnKey)}</TableCell>
              )}
            </TableRow>
          )}
        </TableBody>
      </Table>
      <Modal
        size={`${typeAction === "delete" ? "lg" : "3xl"}`}
        isOpen={isOpen}
        onOpenChange={handleOpenChange}
        shouldBlockScroll
        scrollBehavior="inside"
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                {getTitleModal()}
              </ModalHeader>
              <ModalBody>{getBodyModal()}</ModalBody>
              <ModalFooter>
                <Button
                  color="danger"
                  variant="light"
                  onPress={() => handleCloseModal(onClose)}
                >
                  Close
                </Button>
                {typeAction === "edit" && (
                  <Button
                    color="primary"
                    isLoading={loadingUpdate}
                    onPress={() => handleUpdateVoucher(onClose)}
                    isDisabled={isChange || isError}
                  >
                    Update
                  </Button>
                )}
                {typeAction === "create" && (
                  <Button
                    color="primary"
                    onPress={() => handleSave(onClose)}
                    isLoading={loadingCreate}
                    isDisabled={!handleCheckCreate()}
                  >
                    Create
                  </Button>
                )}
                {typeAction === "delete" && (
                  <Button
                    color="danger"
                    isLoading={loadingDelete}
                    onPress={() => handleDeleteVoucher(onClose)}
                  >
                    Delete
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

export default TableVoucher;