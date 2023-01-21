import React, { useEffect } from "react";
import { injectIntl } from "react-intl";
import moment from "jalali-moment";
import { connect } from "react-redux";
import { selectItemsSearch } from "redux/profile/selector";
import CustomDataGrid from "components/common/CustomDataGrid";

const OtherList = (props) => {
  const {
    intl,
    stateId,
    typeId = 15,
    customers,
    items,
    modalOpenAction,
    modalCloseAction,
  } = props;
  const [reload, setReload] = React.useState(1);
  const { messages } = intl;
  const columns = [
    // { field: 'id', headerName: '#', width: 120,},
    { field: "number", headerName: messages["app.sheet.number"], width: 90 },

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
      field: "receiverId",
      headerName: messages["receiver.account"],
      width: 170,
      valueGetter: (params) => {
        if (params.row.receiverId) {
          var cs = customers.find((m) => m.id == params.row.receiverId);
          if (cs) return cs.firstName + " " + cs.lastName;
        } else return params.row.receiverId + "";
      },
    },
    {
      field: "payerId",
      headerName: messages["payer.account"],
      width: 170,
      valueGetter: (params) => {
        if (params.row.payerId) {
          var cs = customers.find((m) => m.id == params.row.payerId);
          if (cs) return cs.firstName + " " + cs.lastName;
        } else return params.row.payerId + "";
      },
    },
    {
      field: "price",
      headerName: messages["app.sheet.receive.price"],
      width: 100,
      editable: true,
      type: "number",
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
  return {
    customers,
  };
};
export default injectIntl(connect(mapStateToProps, {})(OtherList));
