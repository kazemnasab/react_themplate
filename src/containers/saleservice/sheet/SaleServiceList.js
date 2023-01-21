import React, { useEffect } from "react";
import { injectIntl } from "react-intl";
import * as Api from "api/core";
import moment from "jalali-moment";
import { connect } from "react-redux";
import { selectItemsSearch } from "redux/profile/selector";
import { selectItemsSearch as selectfailures } from "redux/failure/selector";
import CustomDataGrid from "components/common/CustomDataGrid";
import AsyncCell from "components/async/AsyncCell";
import and from "and";

import { Button } from "reactstrap";

var loaded_failures = [];

const SaleServiceList = (props) => {
  const { intl, stateId, typeId = 15, failures, customers, items } = props;
  const [reload, setReload] = React.useState(1);
  const { messages } = intl;
  const columns = [
    // { field: 'id', headerName: '#', width: 120,},
    { field: "docNumber", headerName: messages["app.sheet.number"], width: 90 },

    {
      field: "date",
      headerName: messages["date"],
      width: 90,
      valueGetter: (params) => {
        if (params.row.date) {
          return moment(params.row.date).locale("fa").format("YYYY/MM/DD");
        } else return "";
      },
    },
    {
      field: "failurs",
      headerName: messages["app.saleservice.failurs"],
      width: 150,
      renderCell: (params) => {
        var failure = failures.find((m) => m.id == params.row.id);
        if (failure)
          return (
            <>
              {" "}
              {and(
                failure.items.map((item) => {
                  return failures.find((m) => m.id == item.failureId).sku;
                }),
                ","
              )}{" "}
            </>
          );
        return (
          <AsyncCell
            loadData={() => {
              return Api.api_get("FailureItem?sheet=" + params.row.id);
            }}
            valueGetter={(res) => {
              loaded_failures = [
                ...loaded_failures,
                { id: params.row.id, items: res },
              ];
              return and(
                res.map((item) => {
                  return failures.find((m) => m.id == item.failureId).sku;
                }),
                ","
              );
            }}
          />
        );
      },
    },
    {
      field: "receiverId",
      headerName: messages["customer.name"],
      width: 170,
      valueGetter: (params) => {
        if (params.row.receiverId) {
          var cs = customers.find((m) => m.id == params.row.receiverId);
          if (cs) return cs.firstName + " " + cs.lastName;
        } else return params.row.receiverId + "";
      },
    },
    {
      field: "comment",
      headerName: messages["comment"],
      width: 300,
      valueGetter: (params) => {
        if (params.row.comment) {
          return params.row.comment;
        } else return "";
      },
    },
  ];

  return (
    <>
      <CustomDataGrid
        rows={items ?? []}
        columns={columns}
        pagination
        rowsPerPageOptions={[5]}
        pageSize={10}
        checkboxSelection
        disableSelectionOnClick
        experimentalFeatures={{ newEditingApi: true }}
        {...props}
      />
    </>
  );
};

const mapStateToProps = (state) => {
  const customers = selectItemsSearch(state, [], "");
  const failures = selectfailures(state, "");
  return {
    customers,
    failures,
  };
};
export default injectIntl(connect(mapStateToProps, {})(SaleServiceList));
