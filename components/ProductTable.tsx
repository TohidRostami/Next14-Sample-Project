"use client";

import Title from "./Title";

import { allProducts } from "@/functions/functions";
import React, { useState } from "react";
import Link from "next/link";
import { useTable, useSortBy, useFilters } from "react-table";

import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

import EditPage from "./EditModal";
import DeleteModal from "./DeleteModal";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";

import { useTranslation } from "react-i18next";

import {
  Box,
  Button,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  TextField,
} from "@mui/material";
import Product from "@/Types/Product";
import { t } from "i18next";

function DefaultColumnFilter({
  column: { filterValue, preFilteredRows, setFilter },
}: {
  column: {
    filterValue: any;
    preFilteredRows: any;
    setFilter: (filterValue: any) => void;
  };
}) {
  const count = preFilteredRows.length;

  return (
    <TextField
      variant="outlined"
      value={filterValue || ""}
      onChange={(e) => {
        setFilter(e.target.value || undefined); // Set undefined to remove the filter entirely
      }}
      placeholder={t("filterTextBox", { count: count }) as string}
      size="small"
    />
  );
}

export default function ProductTable() {
  const { data } = allProducts();

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
        filter: () => {},
      },
      ,
      {
        Header: t("price"),
        accessor: "price",
        Filter: DefaultColumnFilter,
        Cell: ({ value }: { value: string }) => {
          return <div>{value} $</div>;
        },
      },
      ,
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
            <EditIcon />
          </IconButton>
        ),
      },
      ,
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
            <DeleteIcon />
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

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable(
      {
        columns,
        data: tableData,
        defaultColumn: { Filter: DefaultColumnFilter },
      },
      useFilters,
      useSortBy // This adds sorting functionality
    );

  return (
    <>
      <Title>{t("products")}</Title>
      <Table
        {...getTableProps()}
        size="small"
        sx={{ border: 1, borderColor: "grey.300" }}
      >
        <TableHead>
          {headerGroups.map(
            (
              headerGroup: {
                getHeaderGroupProps: () => React.JSX.IntrinsicAttributes &
                  React.ClassAttributes<HTMLTableRowElement> &
                  React.HTMLAttributes<HTMLTableRowElement>;
                headers: any[];
              },
              index: number
            ) => (
              <TableRow key={`header-group-${index}`}>
                {headerGroup.headers.map((column) => (
                  <TableCell key={column.id}>
                    <div
                      {...column.getSortByToggleProps()}
                      style={{
                        display: "flex",
                        alignItems: "center",
                      }}
                    >
                      {column.render("Header")}
                      <span>
                        {column.isSorted ? (
                          column.isSortedDesc ? (
                            <ArrowUpwardIcon sx={{ fontSize: 20 }} />
                          ) : (
                            <ArrowDownwardIcon sx={{ fontSize: 20 }} />
                          )
                        ) : (
                          ""
                        )}
                      </span>
                    </div>
                    <div>
                      {column.canFilter ? column.render("Filter") : null}
                    </div>
                  </TableCell>
                ))}
              </TableRow>
            )
          )}
        </TableHead>

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
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          width: "100%",
          justifyContent: "space-between",
          alignItems: "center",
          border: 1,
          borderColor: "grey.300",
        }}
      >
        <Link href="/createpost">
          <Button type="button" variant="contained" sx={{ marginLeft: "16px" }}>
            {t("addProduct")}
          </Button>
        </Link>

        <TablePagination
          component="div"
          count={data ? data.length : 0}
          page={page}
          onPageChange={handleChangePage}
          rowsPerPage={rowsPerPage}
          rowsPerPageOptions={[5, 10, 15, 20]}
          onRowsPerPageChange={handleChangeRowsPerPage}
          labelRowsPerPage={t("tablePerRow")}
        />
      </Box>
      {editModal && (
        <EditPage
          editModal={editModal}
          product={(data as Product[])[prodId - 1]}
          handleClose={closeModal}
        />
      )}
      {deleteModal && (
        <DeleteModal
          product={(data as Product[])[prodId - 1]}
          deleteModal={deleteModal}
          handleClose={closeDeleteModal}
        />
      )}
    </>
  );
}
