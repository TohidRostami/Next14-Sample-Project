import {
  Box,
  IconButton,
  TableCell,
  TableHead,
  TableRow,
  TextField,
} from "@mui/material";
import { t } from "i18next";
import React, { useState } from "react";

import {
  FilterOutlined,
  ReloadOutlined,
  ArrowUpOutlined,
  ArrowDownOutlined,
} from "@ant-design/icons";

import FilterAltIcon from "@mui/icons-material/FilterAlt";
import ReplayIcon from "@mui/icons-material/Replay";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";

import Product from "@/Types/Product";

const TableHeader = ({
  headerGroups,
  setAllFilters,
  tableData,
}: {
  headerGroups: any;
  setAllFilters: any;
  tableData: Product[];
}) => {
  const [filterValues, setFilterValues] = useState<{ [key: string]: string }>(
    {}
  ); // State for all filter values

  // Handle filter change for individual columns
  const handleFilterChange = (columnId: string, value: string) => {
    setFilterValues((prev) => ({
      ...prev,
      [columnId]: value,
    }));
  };

  // Apply all filters
  const handleApplyAllFilters = () => {
    setAllFilters(
      Object.entries(filterValues).map(([id, value]) => ({ id, value }))
    );
  };

  // Reset all filters
  const handleResetAllFilters = () => {
    setFilterValues({});
    setAllFilters([]);
  };

  return (
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
                <Box
                  {...column.getSortByToggleProps()}
                  style={{
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  {column.render("Header")}
                  <span id="sort">
                    {column.isSorted ? (
                      column.isSortedDesc ? (
                        // <ArrowUpwardIcon sx={{ fontSize: 20 }} />
                        <ArrowUpOutlined />
                      ) : (
                        // <ArrowDownwardIcon sx={{ fontSize: 20 }} />
                        <ArrowDownOutlined />
                      )
                    ) : (
                      ""
                    )}
                  </span>
                </Box>
                <Box>
                  {column.canFilter ? (
                    <TextField
                      variant="outlined"
                      value={filterValues[column.id] || ""}
                      onChange={(e) =>
                        handleFilterChange(column.id, e.target.value)
                      }
                      placeholder={
                        t("filterTextBox", {
                          count: tableData.length,
                        }) as string
                      }
                      size="small"
                    />
                  ) : null}
                </Box>
              </TableCell>
            ))}
            {index === 0 && (
              <TableCell>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <IconButton
                    color="primary"
                    onClick={handleApplyAllFilters}
                    aria-label="Filter"
                  >
                    {/* <FilterAltIcon /> */}
                    <FilterOutlined />
                  </IconButton>
                  <IconButton
                    color="primary"
                    onClick={handleResetAllFilters}
                    aria-label="Reset"
                  >
                    {/* <ReplayIcon /> */}
                    <ReloadOutlined />
                  </IconButton>
                </Box>
              </TableCell>
            )}
          </TableRow>
        )
      )}
    </TableHead>
  );
};

export default TableHeader;
