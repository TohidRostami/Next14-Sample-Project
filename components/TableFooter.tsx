import { Box, Button, TablePagination } from "@mui/material";
import { t } from "i18next";
import Link from "next/link";
import React from "react";

const TableFooter = ({
  dataCount,
  pageNumber,
  handleChangePage,
  rowsPerPage,
  handleChangeRowsPerPage,
}: {
  dataCount: number;
  pageNumber: number;
  rowsPerPage: number;
  handleChangePage: (
    event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number
  ) => void;
  handleChangeRowsPerPage: (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
}) => {
  return (
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

      <Link href="/sampleTest">
        <Button type="button" variant="contained">
          Sample Form
        </Button>
      </Link>

      <TablePagination
        component="div"
        count={dataCount}
        page={pageNumber}
        onPageChange={handleChangePage}
        rowsPerPage={rowsPerPage}
        rowsPerPageOptions={[5, 10, 15, 20]}
        onRowsPerPageChange={handleChangeRowsPerPage}
        labelRowsPerPage={t("tablePerRow")}
      />
    </Box>
  );
};

export default TableFooter;
