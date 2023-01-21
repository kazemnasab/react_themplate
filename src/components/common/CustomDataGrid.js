import React, { useEffect, useState } from "react";
import {
  DataGrid,
  GridToolbarQuickFilter,
  GridLinkOperator,
} from "@mui/x-data-grid";
import { Badge } from "reactstrap";
import CustomNoRowsOverlay from "components/common/CustomNoRowsOverlay";
import CustomPagination from "components/common/CustomPagination";
import { Box } from "@mui/material";
import { injectIntl } from "react-intl";

const createReactClass = (params, onRowDoubleClick) => {
  return (
    <Badge
      className="btnedit cursor-hand"
      onClick={() => {
        onRowDoubleClick(params.row);
      }}
    >
      Edit
    </Badge>
  );
};

const rowColumn = [
  {
    field: "row",
    headerName: "#",
    width: 80,
  },
];

const CustomDataGrid = ({
  rows,
  editLink,
  onRowDoubleClick,
  pageSize,
  columns,
  checkboxSelection,
  getRowClassName,
  intl,
  loading = false,
  onSelectionModelChange,
}) => {
  const { messages } = intl;
  const editColumn = [
    {
      field: "action",
      headerName: "ویرایش",
      width: 130,
      renderCell: (params) => {
        return createReactClass(params, onRowDoubleClick);
      },
    },
  ];

  const QuickSearchToolbar = () => {
    return (
      <Box
        sx={{
          p: 0.5,
          pb: 0,
        }}
      >
        <GridToolbarQuickFilter
          placeholder={messages["search.input"]}
          style={{ fontFamily: "inherit !important" }}
          quickFilterParser={(searchInput) =>
            searchInput
              .split(",")
              .map((value) => value.trim())
              .filter((value) => value !== "")
          }
        />
      </Box>
    );
  };

  const [cols, setCols] = useState(rowColumn);
  const [items, setItems] = useState([]);
  useEffect(() => {
    setCols(rowColumn.concat(columns));
    if (editLink) setCols(rowColumn.concat(columns).concat(editColumn));
    setItems(
      rows.map((item, index) => {
        return { ...item, row: index + 1 };
      })
    );
  }, [rows]);
  return (
    <Box sx={{ height: 500, width: "100%", fontFamily: "inherit !important" }}>
      <DataGrid
        style={{ fontFamily: "inherit !important" }}
        rows={items}
        rowHeight={35}
        onRowDoubleClick={(row, event) => {
          if (onRowDoubleClick) onRowDoubleClick(row.row);
        }}
        onCellDoubleClick={(params, event) => {
          if (!event.ctrlKey) {
            event.defaultMuiPrevented = true;
          }
        }}
        columns={cols}
        pageSize={pageSize}
        components={{
          Pagination: CustomPagination,
          NoRowsOverlay: CustomNoRowsOverlay,
          Toolbar: QuickSearchToolbar,
        }}
        initialState={{
          filter: {
            filterModel: {
              items: [],
              quickFilterLogicOperator: GridLinkOperator.Or,
            },
          },
        }}
        onSelectionModelChange={(ids) => {
          if (onSelectionModelChange) onSelectionModelChange(ids);
        }}
        loading={loading}
        rowsPerPageOptions={[pageSize]}
        checkboxSelection={checkboxSelection}
        getRowClassName={getRowClassName}
      />
    </Box>
  );
};

export default injectIntl(React.memo(CustomDataGrid));
