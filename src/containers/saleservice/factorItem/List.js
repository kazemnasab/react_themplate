import * as React from "react";
import { injectIntl } from "react-intl";
import { connect } from "react-redux";
import * as Api from "api/core";
import { selectItemsForFactor as selectProducts } from "redux/product/selector";
import { selectItemsSearch as selectWarehouse } from "redux/profile/selector";
import { selectItemTarget } from "redux/status/selector";
import CustomDataGrid from "components/common/CustomDataGrid";
import { GridRowModes, DataGrid, GridActionsCellItem } from "@mui/x-data-grid";
import Box from "@mui/material/Box";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/DeleteOutlined";
import CustomConfirm from "components/common/CustomConfirm";

function List(props) {
  const {
    intl,
    sheetId = null,
    onItemUpdated,
    warehouses,
    products,
    itemStates,
    loading,
    onSelectedChange,
  } = props;
  const { messages } = intl;
  const [items, setItems] = React.useState([]);
  const [rowModesModel, setRowModesModel] = React.useState({});
  const [deletingItem, setDeletingItem] = React.useState(null);

  React.useEffect(() => {}, []);

  const handleDeleteClick = (item) => {
    setDeletingItem(item);
  };

  const columns = [
    {
      field: "actions",
      type: "actions",
      headerName: messages["$"],
      width: 50,
      cellClassName: "actions",
      getActions: (params) => {
        return [
          <GridActionsCellItem
            icon={<EditIcon />}
            label="Edit"
            className="textPrimary"
            onClick={() => {
              onSelectedChange(params.row);
            }}
            color="inherit"
          />,
        ];
      },
    },
    {
      field: "productId",
      headerName: messages["app.sale.product.sku"],
      width: 120,
      editable: true,
      valueGetter: (params) => {
        return products.find((m) => m.id == params.row.productId).sku;
      },
    },
    {
      field: "name",
      headerName: messages["description"],
      width: 250,
      editable: true,
      valueGetter: (params) => {
        return products.find((m) => m.id == params.row.productId).name;
      },
    },
    {
      field: "warehouseId",
      headerName: messages["profile.warehouse"],
      width: 250,
      editable: true,
      valueGetter: (params) => {
        return params.row.warehouseId
          ? warehouses.find((m) => m.id == params.row.warehouseId).firstName
          : "-------";
      },
    },
    {
      field: "price",
      headerName: messages["itemprice"],
      width: 100,
      editable: true,
      type: "number",
    },
    {
      field: "count",
      headerName: messages["count"],
      width: 100,
      editable: true,
    },
    ,
    {
      field: "stateId",
      headerName: messages["status"],
      width: 130,
      editable: true,
      renderCell: (params) => {
        params.row.stateId = params.row.stateId ? params.row.stateId : 10;
        return (
          <Box
            style={{
              padding: 5,
              background: `${
                itemStates.find((m) => m.key == params.row.stateId).color
              }`,
            }}
          >
            {itemStates.find((m) => m.key == params.row.stateId).title}
          </Box>
        );
      },
    },
  ];

  React.useEffect(() => {
    if (sheetId)
      Api.api_get("FactorItem?sheet=" + sheetId).then((res) => {
        setItems(res.data);
      });
  }, [sheetId]);

  React.useEffect(() => {
    if (onItemUpdated) onItemUpdated(items, setItems);
  }, [onItemUpdated]);

  return (
    <>
      <CustomConfirm
        title="confirm.delete"
        isOpen={deletingItem != null}
        handleOnConfirmOk={() => {
          setDeletingItem(null);
        }}
        handleOnConfirmClose={() => {
          setDeletingItem(null);
        }}
      />
      <CustomDataGrid
        rows={items}
        columns={columns}
        pagination
        rowsPerPageOptions={[5]}
        pageSize={10}
        checkboxSelection
        disableSelectionOnClick
        onRowDoubleClick={onSelectedChange}
        experimentalFeatures={{ newEditingApi: true }}
        {...props}
        loading={loading}
      />
    </>
  );
}

const mapStateToProps = (state) => {
  const products = selectProducts(state, ["WP", "Service"]);
  const warehouses = selectWarehouse(state, ["Warehouse"], "");
  const itemStates = selectItemTarget(state, "FactorItemService");
  return {
    warehouses,
    products,
    itemStates,
  };
};

export const Index = injectIntl(connect(mapStateToProps, {})(List));


