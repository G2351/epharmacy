"use client";
import React, { useCallback, useState } from "react";
import {
  Modal, ModalContent, ModalHeader, ModalBody, ModalFooter,
  Button, useDisclosure, Input, Textarea, Select, SelectItem, Chip,
} from "@nextui-org/react";
import {
  useGetAllProductsQuery, useCreateProductMutation,
  useUpdateProductMutation, useDeleteProductMutation,
} from "@/stores/slices/api/product.slice.api";
import { useGetAllCategoryMedicineQuery } from "@/stores/slices/api/category-medicine.slice.api";
import { useGetAllBrandsQuery } from "@/stores/slices/api/brand.slice.api";
import {
  Table, TableHeader, TableColumn, TableBody, TableRow, TableCell,
  Tooltip, Pagination,
} from "@nextui-org/react";
import { FaRegEye } from "react-icons/fa6";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { IoMdAddCircleOutline } from "react-icons/io";
import UploadImage from "../components/UploadImage";
import { IoWarningOutline } from "react-icons/io5";
import _ from "lodash";
import { toast } from "sonner";
import CategoryProduct from "./CategoryProduct";

export const SERVER_URL = process.env.NEXT_PUBLIC_SERVER_URL;
export const HOST_URL = process.env.NEXT_PUBLIC_HOST_URL;
const formatVND = (price) => Number(price).toLocaleString("vi-VN") + " đ";

function TableProduct() {
  const queryInit = { page: 1, limit: 10 };
  const [productDetail, setProductDetail] = useState(null);
  const [productDelete, setProductDelete] = useState(null);
  const [productClone, setProductClone] = useState(null);
  const isChange = _.isEqual(productClone, productDetail);
  const [typeAction, setTypeAction] = useState(null);
  const [loadingImg, setLoadingImg] = useState(false);
  const [files, setFiles] = useState([]);
  const [errors, setErrors] = useState({});
  const isError = _.some(errors, (value) => value !== null);
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [searchText, setSearchText] = useState("");

  const [createProduct, { isLoading: loadingCreate }] = useCreateProductMutation();
  const [updateProduct, { isLoading: loadingUpdate }] = useUpdateProductMutation();
  const [deleteProduct, { isLoading: loadingDelete }] = useDeleteProductMutation();

  const { data: medicineCategory, isLoading: isLoadingCategory } =
    useGetAllCategoryMedicineQuery({ page: 1, limit: 100 });
  const { data: brandData } = useGetAllBrandsQuery({ page: 1, limit: 100 });

  const [query, setQuery] = useState(queryInit);
  const { data, isLoading } = useGetAllProductsQuery(query);

  const debouncedSearch = useCallback(
    _.debounce((value) => {
      setQuery((prev) => ({ ...prev, page: 1, search: value }));
    }, 400),
    []
  );

  const handleSearch = (e) => {
    setSearchText(e.target.value);
    debouncedSearch(e.target.value);
  };

  const handleClearSearch = () => {
    setSearchText("");
    setQuery((prev) => ({ ...prev, page: 1, search: "" }));
  };

  const handleCheckCreate = () => {
    if (!productDetail) return false;
    const required = ["name", "description", "old_price", "new_price", "category_medicine_id"];
    return required.every((f) => productDetail[f]) && !isError;
  };

  const handleSave = async (onClose) => {
    try {
      setLoadingImg(true);
      let imageUrl = "";
      if (files?.length) {
        const formData = new FormData();
        files.forEach((file) => formData.append("image", file));
        const res = await fetch(`${HOST_URL}upload/image`, { method: "POST", body: formData }).then((r) => r.json());
        if (res?.data) imageUrl = res.data;
      }
      const dataCreate = { ...productDetail };
      if (imageUrl) dataCreate.image = imageUrl;
      const resCreate = await createProduct(dataCreate).unwrap();
      if (resCreate.status === 201) { toast.success("Tạo sản phẩm thành công"); onClose(); }
    } catch (error) {
      toast.error("Tạo sản phẩm thất bại: " + (error?.data?.message || error?.message || "Lỗi server"));
    } finally { setLoadingImg(false); }
  };

  const handleUpdateProduct = async (onClose) => {
    try {
      setLoadingImg(true);
      const dataUpdate = { ...productDetail };
      delete dataUpdate.created_at;
      delete dataUpdate.updated_at;
      delete dataUpdate.categoryMedicine;
      delete dataUpdate.brand;
      if (dataUpdate.stock !== undefined) dataUpdate.stock = Number(dataUpdate.stock);
      if (dataUpdate.old_price !== undefined) dataUpdate.old_price = Number(dataUpdate.old_price);
      if (dataUpdate.new_price !== undefined) dataUpdate.new_price = Number(dataUpdate.new_price);
      if (files?.length) {
        const formData = new FormData();
        files.forEach((file) => formData.append("image", file));
        const res = await fetch(`${HOST_URL}upload/image`, { method: "POST", body: formData }).then((r) => r.json());
        if (res?.data) dataUpdate.image = res.data;
      }
      const resUpdate = await updateProduct(dataUpdate).unwrap();
      if (resUpdate.status === 200) { toast.success("Cập nhật thành công!"); onClose(); }
    } catch (error) {
      toast.error("Cập nhật thất bại: " + (error?.data?.message || error?.message || "Lỗi server"));
    } finally { setLoadingImg(false); }
  };

  const handleDeleteProduct = async (onClose) => {
    try {
      const resDelete = await deleteProduct(productDelete.id).unwrap();
      if (resDelete.status === 200) { toast.success("Xóa thành công!"); onClose(); }
    } catch (error) { toast.error("Xóa thất bại!"); }
  };

  const validate = (field, value) => {
    const error = {};
    if (!value && value !== 0) { error[field] = "Không được để trống!"; }
    else {
      error[field] = null;
      if (["new_price", "old_price", "stock"].includes(field) && !/^[0-9]*$/.test(value)) {
        error[field] = "Vui lòng nhập số!";
      }
    }
    setErrors({ ...errors, ...error });
  };

  const handleChangeProduct = (field, value) => {
    validate(field, value);
    setProductDetail({ ...productDetail, [field]: value });
  };

  const handleOpenDetail = (product, type) => {
    const normalized = {
      ...product,
      brand_name: product?.brand?.name || "",
    };
    setProductDetail(normalized);
    setProductClone(_.cloneDeep(normalized));
    setTypeAction(type);
    setErrors({});
    onOpen();
  };

  const handleOpenModalAddNew = (type) => {
    setTypeAction(type);
    setErrors({});
    setProductDetail({});
    onOpen();
  };

  const handleOpenModalDelete = (product, type) => {
    setProductDelete(product);
    setTypeAction(type);
    setErrors({});
    onOpen();
  };

  const columns = [
    { name: "ẢNH", uid: "image" },
    { name: "TÊN THUỐC", uid: "name" },
    { name: "DANH MỤC", uid: "category" },
    { name: "GIÁ GỐC", uid: "old_price" },
    { name: "GIÁ BÁN", uid: "new_price" },
    { name: "TỒN KHO", uid: "stock" },
    { name: "THAO TÁC", uid: "actions" },
  ];

  const renderCell = useCallback((product, columnKey) => {
    switch (columnKey) {
      case "image":
        return (
          <div className="w-img-product h-img-product relative overflow-hidden rounded-product border border-default-100 bg-white flex items-center justify-center">
            <img
              src={product.image || "https://placehold.co/80x80?text=No+Image"}
              alt={product.name}
              className="w-full h-full object-contain p-1"
              onError={(e) => { e.target.src = "https://placehold.co/80x80?text=No+Image"; }}
            />
          </div>
        );
      case "name":
        return (
          <div className="flex flex-col max-w-xs">
            <p className="font-semibold text-sm">{product.name}</p>
            <p className="text-xs text-gray-400">{product.description?.substring(0, 50)}...</p>
          </div>
        );
      case "category":
        return <Chip size="sm" variant="flat" color="primary">{product.categoryMedicine?.name || "—"}</Chip>;
      case "old_price":
        return <p className="text-sm line-through text-gray-400">{formatVND(product.old_price)}</p>;
      case "new_price":
        return <p className="text-sm font-bold text-green-500">{formatVND(product.new_price)}</p>;
      case "stock":
        return (
          <Chip
            size="sm"
            variant="flat"
            color={product.stock > 10 ? "success" : product.stock > 0 ? "warning" : "danger"}
          >
            {product.stock ?? 0}
          </Chip>
        );
      case "actions":
        return (
          <div className="flex items-center justify-center gap-3">
            <Tooltip content="Chi tiết">
              <span className="text-lg cursor-pointer text-blue-400 hover:text-blue-600">
                <FaRegEye onClick={() => handleOpenDetail(product, "view")} />
              </span>
            </Tooltip>
            <Tooltip content="Chỉnh sửa">
              <span className="text-lg cursor-pointer text-yellow-400 hover:text-yellow-600">
                <FaEdit onClick={() => handleOpenDetail(product, "edit")} />
              </span>
            </Tooltip>
            <Tooltip color="danger" content="Xóa">
              <span className="text-lg cursor-pointer text-red-400 hover:text-red-600">
                <MdDelete onClick={() => handleOpenModalDelete(product, "delete")} />
              </span>
            </Tooltip>
          </div>
        );
      default: return product[columnKey];
    }
  }, []);

  if (isLoading || isLoadingCategory) return (
    <div className="flex justify-center p-10 text-gray-400">Đang tải...</div>
  );

  const rowsPerPage = query.limit;
  const pages = Math.ceil((data?.data?.count || 0) / rowsPerPage) || 1;
  const allProducts = data?.data?.medicines || [];
  const categoryMedicine = medicineCategory?.data?.categoryMedicine?.map((item) => ({
    key: String(item.id), label: item.name,
  })) || [];

  const getBodyModal = () => {
    switch (typeAction) {
      case "view":
        return (
          <div className="flex gap-6">
            <img
              src={productDetail?.image || "https://placehold.co/200x200?text=No+Image"}
              alt={productDetail?.name}
              className="w-48 h-48 object-cover rounded-xl flex-shrink-0"
              onError={(e) => { e.target.src = "https://placehold.co/200x200?text=No+Image"; }}
            />
            <div className="flex flex-col gap-3 flex-1">
              <div><p className="text-xs text-gray-400">Tên thuốc</p><p className="font-bold text-lg">{productDetail?.name}</p></div>
              <div><p className="text-xs text-gray-400">Danh mục</p><Chip size="sm" variant="flat" color="primary">{productDetail?.categoryMedicine?.name || "—"}</Chip></div>
              <div><p className="text-xs text-gray-400">Thương hiệu</p><p className="text-sm">{productDetail?.brand?.name || "—"}</p></div>
              <div><p className="text-xs text-gray-400">Quy cách đóng gói</p><p className="text-sm">{productDetail?.packaging || "—"}</p></div>
              <div><p className="text-xs text-gray-400">Mô tả</p><p className="text-sm">{productDetail?.description}</p></div>
              <div className="flex gap-4">
                <div><p className="text-xs text-gray-400">Giá gốc</p><p className="line-through text-gray-400">{formatVND(productDetail?.old_price)}</p></div>
                <div><p className="text-xs text-gray-400">Giá bán</p><p className="font-bold text-green-500">{formatVND(productDetail?.new_price)}</p></div>
                <div>
                  <p className="text-xs text-gray-400">Tồn kho</p>
                  <Chip
                    size="sm" variant="flat"
                    color={(productDetail?.stock ?? 0) > 10 ? "success" : (productDetail?.stock ?? 0) > 0 ? "warning" : "danger"}
                  >
                    {productDetail?.stock ?? 0} sản phẩm
                  </Chip>
                </div>
              </div>
              {productDetail?.indications && (
                <div><p className="text-xs text-gray-400">Trường hợp dùng</p><p className="text-sm">{productDetail.indications}</p></div>
              )}
              {productDetail?.contraindications && (
                <div><p className="text-xs text-gray-400">Trường hợp không dùng</p><p className="text-sm text-red-400">{productDetail.contraindications}</p></div>
              )}
            </div>
          </div>
        );

      case "edit":
        return (
          <div className="flex flex-col gap-3">
            <UploadImage info={productDetail?.image} onFiles={setFiles} files={files} />
            <Input
              label="Tên thuốc"
              isRequired
              isInvalid={!!errors?.name}
              errorMessage={errors?.name}
              value={productDetail?.name || ""}
              onChange={(e) => handleChangeProduct("name", e.target.value)}
            />
            <div className="flex gap-3">
              <Select
                items={categoryMedicine}
                label="Danh mục thuốc"
                isRequired
                className="flex-1"
                defaultSelectedKeys={
                  productDetail?.category_medicine_id
                    ? [String(productDetail.category_medicine_id)]
                    : []
                }
                onChange={(e) => handleChangeProduct("category_medicine_id", e.target.value)}
              >
                {(cat) => <SelectItem key={cat.key}>{cat.label}</SelectItem>}
              </Select>
              <Input
                label="Thương hiệu"
                className="flex-1"
                placeholder="Nhập tên thương hiệu..."
                value={productDetail?.brand_name || ""}
                onChange={(e) => handleChangeProduct("brand_name", e.target.value)}
              />
            </div>
            <Input
              label="Quy cách đóng gói"
              placeholder="Ví dụ: Hộp 10 miếng, Vỉ 5 viên..."
              value={productDetail?.packaging || ""}
              onChange={(e) => handleChangeProduct("packaging", e.target.value)}
            />
            <Textarea
              label="Mô tả"
              isRequired
              isInvalid={!!errors?.description}
              errorMessage={errors?.description}
              value={productDetail?.description || ""}
              onChange={(e) => handleChangeProduct("description", e.target.value)}
            />
            <div className="flex gap-3">
              <Input
                label="Giá gốc (đ)"
                isRequired
                value={String(productDetail?.old_price || "")}
                isInvalid={!!errors?.old_price}
                errorMessage={errors?.old_price}
                onChange={(e) => handleChangeProduct("old_price", e.target.value)}
              />
              <Input
                label="Giá bán (đ)"
                isRequired
                isInvalid={!!errors?.new_price}
                errorMessage={errors?.new_price}
                value={String(productDetail?.new_price || "")}
                onChange={(e) => handleChangeProduct("new_price", e.target.value)}
              />
              <Input
                label="Tồn kho"
                type="number"
                min={0}
                isInvalid={!!errors?.stock}
                errorMessage={errors?.stock}
                value={String(productDetail?.stock ?? "")}
                onChange={(e) => handleChangeProduct("stock", e.target.value)}
              />
            </div>
            <Textarea
              label="Trường hợp dùng"
              placeholder="Mô tả các trường hợp nên sử dụng sản phẩm..."
              value={productDetail?.indications || ""}
              onChange={(e) => handleChangeProduct("indications", e.target.value)}
            />
            <Textarea
              label="Trường hợp không dùng"
              placeholder="Mô tả chống chỉ định hoặc trường hợp cần tránh..."
              value={productDetail?.contraindications || ""}
              onChange={(e) => handleChangeProduct("contraindications", e.target.value)}
            />
          </div>
        );

      case "create":
        return (
          <div className="flex flex-col gap-3">
            <UploadImage info={null} onFiles={setFiles} files={files} />
            <Input
              label="Tên thuốc"
              isRequired
              isInvalid={!!errors?.name}
              errorMessage={errors?.name}
              value={productDetail?.name || ""}
              onChange={(e) => handleChangeProduct("name", e.target.value)}
            />
            <div className="flex gap-3">
              <Select
                items={categoryMedicine}
                label="Danh mục thuốc"
                isRequired
                className="flex-1"
                onChange={(e) => handleChangeProduct("category_medicine_id", e.target.value)}
              >
                {(cat) => <SelectItem key={cat.key}>{cat.label}</SelectItem>}
              </Select>
              <Input
                label="Thương hiệu"
                className="flex-1"
                placeholder="Nhập tên thương hiệu..."
                value={productDetail?.brand_name || ""}
                onChange={(e) => handleChangeProduct("brand_name", e.target.value)}
              />
            </div>
            <Input
              label="Quy cách đóng gói"
              placeholder="Ví dụ: Hộp 10 miếng, Vỉ 5 viên..."
              value={productDetail?.packaging || ""}
              onChange={(e) => handleChangeProduct("packaging", e.target.value)}
            />
            <Textarea
              label="Mô tả"
              isRequired
              isInvalid={!!errors?.description}
              errorMessage={errors?.description}
              value={productDetail?.description || ""}
              onChange={(e) => handleChangeProduct("description", e.target.value)}
            />
            <div className="flex gap-3">
              <Input
                label="Giá gốc (đ)"
                isRequired
                value={productDetail?.old_price || ""}
                isInvalid={!!errors?.old_price}
                errorMessage={errors?.old_price}
                onChange={(e) => handleChangeProduct("old_price", e.target.value)}
              />
              <Input
                label="Giá bán (đ)"
                isRequired
                isInvalid={!!errors?.new_price}
                errorMessage={errors?.new_price}
                value={productDetail?.new_price || ""}
                onChange={(e) => handleChangeProduct("new_price", e.target.value)}
              />
              <Input
                label="Tồn kho"
                type="number"
                min={0}
                isInvalid={!!errors?.stock}
                errorMessage={errors?.stock}
                value={String(productDetail?.stock ?? "")}
                onChange={(e) => handleChangeProduct("stock", e.target.value)}
              />
            </div>
            <Textarea
              label="Trường hợp dùng"
              placeholder="Mô tả các trường hợp nên sử dụng sản phẩm..."
              value={productDetail?.indications || ""}
              onChange={(e) => handleChangeProduct("indications", e.target.value)}
            />
            <Textarea
              label="Trường hợp không dùng"
              placeholder="Mô tả chống chỉ định hoặc trường hợp cần tránh..."
              value={productDetail?.contraindications || ""}
              onChange={(e) => handleChangeProduct("contraindications", e.target.value)}
            />
          </div>
        );

      case "delete":
        return (
          <div className="flex items-center gap-3 p-2">
            <IoWarningOutline className="text-yellow-500 text-3xl flex-shrink-0" />
            <div>
              <p className="font-semibold">Bạn có chắc muốn xóa sản phẩm này?</p>
              <p className="text-sm text-gray-400">{productDelete?.name}</p>
            </div>
          </div>
        );
      default: return null;
    }
  };

  const getTitleModal = () => {
    switch (typeAction) {
      case "view":   return "Chi tiết sản phẩm";
      case "edit":   return "Chỉnh sửa sản phẩm";
      case "create": return "Tạo mới sản phẩm";
      case "delete": return <div className="flex items-center gap-2"><IoWarningOutline className="text-yellow-500" /> Xác nhận xóa</div>;
      default: return "";
    }
  };

  return (
    <>
      <div className="flex gap-3 mb-4 items-center">
        <Button color="primary" onClick={() => handleOpenModalAddNew("create")} startContent={<IoMdAddCircleOutline fontSize="1.2rem" />}>
          Tạo mới
        </Button>
        <CategoryProduct />
        <Input
          placeholder="Tìm kiếm thuốc..."
          value={searchText}
          onChange={handleSearch}
          className="max-w-xs"
          isClearable
          onClear={handleClearSearch}
        />
      </div>

      <Table
        aria-label="Danh sách thuốc"
        bottomContent={
          pages > 1 ? (
            <div className="flex justify-center w-full">
              <Pagination isCompact showControls showShadow color="primary" page={query.page} total={pages} onChange={(page) => setQuery({ ...query, page })} />
            </div>
          ) : null
        }
      >
        <TableHeader columns={columns}>
          {(column) => <TableColumn key={column.uid} align={column.uid === "actions" ? "center" : "start"}>{column.name}</TableColumn>}
        </TableHeader>
        <TableBody items={allProducts} emptyContent="Chưa có sản phẩm nào">
          {(item) => <TableRow key={item.id}>{(columnKey) => <TableCell>{renderCell(item, columnKey)}</TableCell>}</TableRow>}
        </TableBody>
      </Table>

      <Modal
        size={typeAction === "delete" ? "md" : "2xl"}
        isOpen={isOpen}
        onOpenChange={() => { onOpenChange(); setFiles([]); }}
        scrollBehavior="inside"
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader>{getTitleModal()}</ModalHeader>
              <ModalBody>{getBodyModal()}</ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={() => { setFiles([]); onClose(); }}>Đóng</Button>
                {typeAction === "edit" && (
                  <Button color="primary" isLoading={loadingImg || loadingUpdate} onPress={() => handleUpdateProduct(onClose)} isDisabled={isChange && !files.length}>
                    Lưu thay đổi
                  </Button>
                )}
                {typeAction === "create" && (
                  <Button color="primary" onPress={() => handleSave(onClose)} isLoading={loadingImg || loadingCreate} isDisabled={!handleCheckCreate()}>
                    Tạo mới
                  </Button>
                )}
                {typeAction === "delete" && (
                  <Button color="danger" isLoading={loadingDelete} onPress={() => handleDeleteProduct(onClose)}>
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

export default TableProduct;