"use client";
import React, { useCallback, useState } from "react";
import {
  Modal, ModalContent, ModalHeader, ModalBody, ModalFooter,
  Button, useDisclosure, Input, Textarea, User,
} from "@nextui-org/react";
import {
  useGetAllArticlesQuery,
  useCreateArticleMutation,
  useUpdateArticleMutation,
  useDeleteArticleMutation,
} from "@/stores/slices/api/article.slice.api";
import {
  Table, TableHeader, TableColumn, TableBody, TableRow, TableCell,
  Tooltip, Pagination,
} from "@nextui-org/react";
import { FaRegEye } from "react-icons/fa6";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { IoMdAddCircleOutline } from "react-icons/io";
import Image from "next/image";
import UploadImage from "../components/UploadImage";
import { IoWarningOutline } from "react-icons/io5";
import _ from "lodash";
import { toast } from "sonner";

export const HOST_URL = process.env.NEXT_PUBLIC_HOST_URL;

function TableArticles() {
  const queryInit = { page: 1, limit: 2 };
  const [articleDetail, setArticleDetail] = useState(null);
  const [articleDelete, setArticleDelete] = useState(null);
  const [articleClone, setArticleClone] = useState(null);
  const isChange = _.isEqual(articleClone, articleDetail);
  const [typeAction, setTypeAction] = useState(null);
  const [loadingImg, setLoadingImg] = useState(false);
  const [files, setFiles] = useState([]);
  const [errors, setErrors] = useState({});
  const isError = _.some(errors, (value) => value !== null);
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [searchText, setSearchText] = useState("");

  const [createArticle, { isLoading: loadingCreate }] = useCreateArticleMutation();
  const [updateArticle, { isLoading: loadingUpdate }] = useUpdateArticleMutation();
  const [deleteArticle, { isLoading: loadingDelete }] = useDeleteArticleMutation();

  const [query, setQuery] = useState(queryInit);
  const { data, isLoading } = useGetAllArticlesQuery(query);

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
    if (articleDetail) {
      if (Object.keys(articleDetail).length === 3 && !isError && files.length) {
        return true;
      }
    }
    return false;
  };

  const handleSave = async (onClose) => {
    if (files?.length) {
      const formData = new FormData();
      files.forEach((file) => formData.append("image", file));
      try {
        setLoadingImg(true);
        const res = await fetch(`${HOST_URL}upload/image`, {
          method: "POST",
          body: formData,
        }).then((res) => res.json());
        if (res.success) {
          const urlImage = res.data;
          const dataCreate = { ...articleDetail, image: urlImage };
          setArticleDetail(dataCreate);
          delete dataCreate.created_at;
          delete dataCreate.update_at;
          const resCreate = await createArticle(dataCreate).unwrap();
          if (resCreate.status === 201) {
            toast.success("Tạo article thành công");
            onClose();
          }
        }
      } catch (error) {
        console.log(error);
      } finally {
        setLoadingImg(false);
      }
    }
  };

  const handleUpdateArticle = async (onClose) => {
    if (files?.length) {
      const formData = new FormData();
      files.forEach((file) => formData.append("image", file));
      try {
        setLoadingImg(true);
        const res = await fetch(`${HOST_URL}upload/image`, {
          method: "POST",
          body: formData,
        }).then((res) => res.json());
        if (res.success) {
          const urlImage = res.data;
          const dataUpdate = { ...articleDetail, image: urlImage };
          delete dataUpdate.created_at;
          delete dataUpdate.update_at;
          setArticleDetail(dataUpdate);
          const resUpdate = await updateArticle(dataUpdate).unwrap();
          if (resUpdate.status === 200) {
            toast.success("Cập nhật article thành công!");
            onClose();
          }
        }
      } catch (error) {
        console.log(error);
      } finally {
        setLoadingImg(false);
      }
    } else {
      const dataUpdate = { ...articleDetail };
      delete dataUpdate.created_at;
      delete dataUpdate.update_at;
      const resUpdate = await updateArticle(articleDetail).unwrap();
      if (resUpdate.status === 200) {
        toast.success("Cập nhật article thành công!");
        onClose();
      }
    }
  };

  const handleDeleteArticle = async (onClose) => {
    const resDelete = await deleteArticle(articleDelete.id).unwrap();
    if (resDelete.status === 200) {
      toast.success("Xóa article thành công!");
      onClose();
    }
  };

  const handleOpenDetail = (article, type) => {
    setArticleDetail(article);
    setArticleClone(article);
    setTypeAction(type);
    setErrors({});
    onOpen();
  };

  const handleOpenModalAddNew = (type) => {
    setTypeAction(type);
    setErrors({});
    setArticleDetail(null);
    onOpen();
  };

  const handleOpenModalDelete = (product, type) => {
    setArticleDelete(product);
    setTypeAction(type);
    setErrors({});
    onOpen();
  };

  const handleChangeArticle = (field, value) => {
    validate(field, value);
    setArticleDetail({ ...articleDetail, [field]: value });
  };

  const validate = (field, value) => {
    const error = {};
    if (!value) {
      error[field] = "Không được để trống!";
    } else {
      error[field] = null;
    }
    setErrors({ ...errors, ...error });
  };

  const handleChangePagination = (page) => {
    setQuery({ ...query, page });
  };

  const handleCloseModal = (onClose) => {
    setFiles([]);
    onClose();
  };

  const handleOpenChange = () => {
    onOpenChange();
    setFiles([]);
  };

  function checkAndPrint(text) {
    if (text.length > 64) return text.substring(0, 64) + "...";
    return text;
  }

  const columns = [
    { name: "TIÊU ĐỀ", uid: "title" },
    { name: "MÔ TẢ", uid: "description" },
    { name: "THAO TÁC", uid: "actions" },
  ];

  const renderCell = useCallback((article, columnKey) => {
    const cellValue = article[columnKey];
    switch (columnKey) {
      case "title":
        return (
          <User avatarProps={{ radius: "lg", src: article.image }} name={cellValue}>
            {article.title}
          </User>
        );
      case "description":
        return (
          <div className="flex flex-col">
            <p className="text-sm capitalize text-bold">{checkAndPrint(cellValue)}</p>
          </div>
        );
      case "actions":
        return (
          <div className="relative flex items-end justify-center gap-2">
            <Tooltip content="Chi tiết">
              <span className="text-lg cursor-pointer text-default-400 active:opacity-50">
                <FaRegEye onClick={() => handleOpenDetail(article, "view")} />
              </span>
            </Tooltip>
            <Tooltip content="Chỉnh sửa">
              <span className="text-lg cursor-pointer text-default-400 active:opacity-50">
                <FaEdit onClick={() => handleOpenDetail(article, "edit")} />
              </span>
            </Tooltip>
            <Tooltip color="danger" content="Xóa">
              <span className="text-lg cursor-pointer text-danger active:opacity-50">
                <MdDelete onClick={() => handleOpenModalDelete(article, "delete")} />
              </span>
            </Tooltip>
          </div>
        );
      default:
        return cellValue;
    }
  }, []);

  if (isLoading) return <div>Đang tải...</div>;

  const rowsPerPage = query.limit;
  const pages = Math.ceil((data?.data?.count || 0) / rowsPerPage) || 1;
  const allArticles = data?.data?.articles || [];

  const getBodyModal = () => {
    switch (typeAction) {
      case "view":
        return (
          <>
            {articleDetail?.image ? (
              <Image
                width={240}
                height={240}
                src={articleDetail.image}
                alt={articleDetail?.title || ""}
                className="m-5"
              />
            ) : (
              <div className="w-[240px] h-[240px] m-5 bg-gray-100 rounded-lg flex items-center justify-center text-gray-400">
                Không có ảnh
              </div>
            )}
            <p>{articleDetail?.title}</p>
            <p>{articleDetail?.description}</p>
            <p>{articleDetail?.content}</p>
          </>
        );
      case "edit":
        return (
          <>
            <UploadImage info={articleDetail.image} onFiles={setFiles} files={files} />
            <Input
              label="Tiêu đề"
              isInvalid={!!errors?.["title"]}
              errorMessage={errors?.["title"]}
              value={articleDetail?.title}
              onChange={(e) => handleChangeArticle("title", e.target.value)}
            />
            <Textarea
              label="Mô tả"
              isInvalid={!!errors?.["description"]}
              errorMessage={errors?.["description"]}
              value={articleDetail?.description}
              onChange={(e) => handleChangeArticle("description", e.target.value)}
            />
            <Textarea
              label="Nội dung"
              isInvalid={!!errors?.["content"]}
              errorMessage={errors?.["content"]}
              value={articleDetail?.content}
              onChange={(e) => handleChangeArticle("content", e.target.value)}
            />
          </>
        );
      case "create":
        return (
          <>
            <UploadImage info={null} onFiles={setFiles} files={files} />
            <Input
              label="Tiêu đề"
              isInvalid={!!errors?.["title"]}
              errorMessage={errors?.["title"]}
              value={articleDetail?.title}
              onChange={(e) => handleChangeArticle("title", e.target.value)}
            />
            <Textarea
              label="Mô tả"
              isInvalid={!!errors?.["description"]}
              errorMessage={errors?.["description"]}
              value={articleDetail?.description}
              onChange={(e) => handleChangeArticle("description", e.target.value)}
            />
            <Textarea
              label="Nội dung"
              isInvalid={!!errors?.["content"]}
              errorMessage={errors?.["content"]}
              value={articleDetail?.content}
              onChange={(e) => handleChangeArticle("content", e.target.value)}
            />
          </>
        );
      case "delete":
        return <p>Bạn có chắc chắn muốn xóa article này không?</p>;
      default:
        break;
    }
  };

  const getTitleModal = () => {
    switch (typeAction) {
      case "view":   return <>Chi tiết article</>;
      case "edit":   return <>Chỉnh sửa article</>;
      case "create": return <>Tạo mới article</>;
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
      <div className="flex gap-3 mb-4 items-center">
        <Button color="primary" onClick={() => handleOpenModalAddNew("create")}>
          Tạo mới <IoMdAddCircleOutline fontSize={"1.2rem"} />
        </Button>
        <Input
          placeholder="Tìm kiếm bài viết..."
          value={searchText}
          onChange={handleSearch}
          className="max-w-xs"
          isClearable
          onClear={handleClearSearch}
        />
      </div>

      <Table
        aria-label="Danh sách bài viết"
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
                onChange={handleChangePagination}
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
        <TableBody items={allArticles} emptyContent="Chưa có bài viết nào">
          {(item) => (
            <TableRow key={item.id}>
              {(columnKey) => <TableCell>{renderCell(item, columnKey)}</TableCell>}
            </TableRow>
          )}
        </TableBody>
      </Table>

      <Modal
        size={typeAction === "delete" ? "lg" : "3xl"}
        isOpen={isOpen}
        onOpenChange={handleOpenChange}
        shouldBlockScroll
        scrollBehavior="inside"
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">{getTitleModal()}</ModalHeader>
              <ModalBody>{getBodyModal()}</ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={() => handleCloseModal(onClose)}>
                  Đóng
                </Button>
                {typeAction === "edit" && (
                  <Button
                    color="primary"
                    isLoading={loadingImg || loadingUpdate}
                    onPress={() => handleUpdateArticle(onClose)}
                    isDisabled={(isChange || isError) && !files.length}
                  >
                    Lưu thay đổi
                  </Button>
                )}
                {typeAction === "create" && (
                  <Button
                    color="primary"
                    onPress={() => handleSave(onClose)}
                    isLoading={loadingImg || loadingCreate}
                    isDisabled={!handleCheckCreate()}
                  >
                    Tạo mới
                  </Button>
                )}
                {typeAction === "delete" && (
                  <Button color="danger" isLoading={loadingDelete} onPress={() => handleDeleteArticle(onClose)}>
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

export default TableArticles;