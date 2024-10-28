"use client";

import Title from "./Title";

import { useProducts } from "@/functions/functions";
import React, { useEffect, useState } from "react";
import { useTable, useSortBy, useFilters } from "react-table";

import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

import { EditOutlined, DeleteOutlined } from "@ant-design/icons";

import DeleteModal from "./DeleteModal";

import { useTranslation } from "react-i18next";

import {
  Button,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableRow,
} from "@mui/material";

import Product from "@/Types/Product";
import TableHeader from "./TableHeader";
import TableFooter from "./TableFooter";
import AddOrEdit from "./AddOrEdit";

import {
  initialCategories,
  addCategory,
  deleteCategory,
} from "../Store/appSlice";

import { useAppDispatch, useAppSelector } from "../Store/hooks";

export default function ProductTable() {
  const { allProducts, getCategories, deleteProduct } = useProducts();
  const { data, isError } = allProducts;
  const { data: catData } = getCategories();

  const dispatch = useAppDispatch();
  const value = useAppSelector((state) => state.category);

  useEffect(() => {
    if (catData && value.length === 0) {
      dispatch(initialCategories(catData));
    }
  }, [catData]);

  const [prodId, setProdId] = useState(0);

  const [editModal, setEditModal] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);

  const { t } = useTranslation();

  const openModal = (id: number) => {
    setProdId(id);
    setEditModal(!editModal);
  };

  const closeModal = () => {
    setProdId(0);
    setEditModal(false);
  };

  const openDeleteModal = (id: number) => {
    setProdId(id);
    setDeleteModal(true);
  };

  const closeDeleteModal = () => {
    setProdId(0);
    setDeleteModal(false);
  };

  function DefaultColumnFilter({
    column: { id, preFilteredRows, setFilter },
  }: {
    column: {
      id: string;
      preFilteredRows: any;
      setFilter: (filterValue: any) => void;
    };
  }) {
    return null;
  }

  const columns = React.useMemo(
    () => [
      {
        Header: t("id"),
        accessor: "id", // accessor is the "key" in the data
        Filter: DefaultColumnFilter,
      },
      {
        Header: t("title"),
        accessor: "title",
        Filter: DefaultColumnFilter,
      },
      {
        Header: t("price"),
        accessor: "price",
        Filter: DefaultColumnFilter,
        Cell: ({ value }: { value: string }) => {
          return <div>{value} $</div>;
        },
      },
      {
        Header: t("category"),
        accessor: "category",
        Filter: DefaultColumnFilter,
      },
      {
        Header: t("edit"),
        accessor: "edit",
        disableFilters: true,
        disableSortBy: true,
        Cell: ({ row }: { row: any }) => (
          <IconButton
            color="primary"
            onClick={() => openModal(row.original.id)}
          >
            <EditOutlined />
          </IconButton>
        ),
      },
      {
        Header: t("delete"),
        accessor: "delete",
        disableSortBy: true,
        disableFilters: true,
        Cell: ({ row }: { row: any }) => (
          <IconButton
            color="error"
            onClick={() => openDeleteModal(row.original.id)}
          >
            <DeleteOutlined />
          </IconButton>
        ),
      },
    ],
    [t]
  );

  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const handleChangePage = (
    event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number
  ) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const emptyRows =
    rowsPerPage -
    Math.min(rowsPerPage, data ? data.length - page * rowsPerPage : 0);

  const tableData = React.useMemo(() => (data ? data : []), [data]);

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    setAllFilters,
  } = useTable(
    {
      columns,
      data: tableData,
      defaultColumn: { Filter: DefaultColumnFilter },
    },
    useFilters,
    useSortBy // This adds sorting functionality
  );

  if (isError) {
    toast.error("Product's API error accoured!");
  }

  return (
    <>
      <ToastContainer />
      <Title>{t("products")}</Title>
      <Table
        {...getTableProps()}
        size="small"
        sx={{ border: 1, borderColor: "grey.300" }}
      >
        <TableHeader
          headerGroups={headerGroups}
          tableData={tableData}
          setAllFilters={setAllFilters}
        />

        <TableBody {...getTableBodyProps()}>
          {rows
            ?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            .map(
              (row: {
                original: any;
                getRowProps: () => React.JSX.IntrinsicAttributes &
                  React.ClassAttributes<HTMLTableRowElement> &
                  React.HTMLAttributes<HTMLTableRowElement>;
                cells: any[];
              }) => {
                prepareRow(row);
                return (
                  <TableRow key={row.getRowProps().key}>
                    {row.cells.map((cell) => {
                      return (
                        <TableCell key={`cell-${cell.column.id}`}>
                          {cell.render("Cell")}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                );
              }
            )}

          {emptyRows > 0 && (
            <TableRow style={{ height: 53 * emptyRows }}>
              <TableCell colSpan={6} />
            </TableRow>
          )}
        </TableBody>
      </Table>

      <TableFooter
        dataCount={data ? data.length : 0}
        pageNumber={page}
        rowsPerPage={rowsPerPage}
        handleChangePage={handleChangePage}
        handleChangeRowsPerPage={handleChangeRowsPerPage}
      />

      {editModal && (
        <AddOrEdit
          editModal={editModal}
          product={(data as Product[])[prodId - 1]}
          handleClose={closeModal}
          pageIdentifier="editModal"
        />
      )}
      {deleteModal && (
        <DeleteModal
          product={(data as Product[])[prodId - 1]}
          deleteModal={deleteModal}
          handleClose={closeDeleteModal}
        />
      )}

      <Button
        type="button"
        fullWidth
        variant="contained"
        sx={{ mt: 1, mb: 2 }}
        onClick={() => {
          dispatch(addCategory("KATOONI"));
          console.log("FROM ADD BUTTON:", value);
        }}
      >
        {t("add")}
      </Button>
      <Button
        type="button"
        fullWidth
        variant="contained"
        sx={{ mt: 1, mb: 2 }}
        onClick={() => {
          dispatch(deleteCategory("KATOONI"));
          console.log("VALUE AFTER DELETE CONSOLE:", value);
        }}
      >
        {t("delete")}
      </Button>
      <Button
        type="button"
        fullWidth
        variant="contained"
        sx={{ mt: 1, mb: 2 }}
        onClick={() => {
          console.log("VALUE CONSOLE:", value);
        }}
      >
        {t("LOG")}
      </Button>
    </>
  );
}
