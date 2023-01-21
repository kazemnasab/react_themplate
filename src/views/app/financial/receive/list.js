import { Colxx, Separator } from "components/bootstrap/CustomBootstrap";
import IntlMessages from "helpers/IntlMessages";
import React from "react";
import { injectIntl } from "react-intl";
import {
  Row,
  Card,
  CardBody,
  Input,
  Label,
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "reactstrap";
import { selectItemTarget } from "redux/setting/selector";
import { useCustomListReducer } from "helpers/core";
import { useApiMyCustomFetch, useApiCustomQuery } from "api/methods";
import { SheetApi } from "api/apis";
import Breadcrumb from "containers/TopNav/Breadcrumb";
import OtherList from "containers/financial/receive/OtherList";
import { connect } from "react-redux";
import { modalOpen, modalClose } from "redux/actions";
import Select from "react-select";

const types = [
  {
    id: "چک",
  },
];

const Index = ({
  intl,
  modalOpenAction,
  modalCloseAction,
  sheetReceiveTypes,
}) => {
  const [typeId, setTypeId] = React.useState({ value: -1, key: -1, label: "" });

  const loadSheets = useApiMyCustomFetch(
    SheetApi.Get({ stateId: null, typeId: typeId.value }),
    typeId.value
  );

  const [items, dispatchSheetItems] = useCustomListReducer({
    initialArg: loadSheets.data,
    key: 7,
  });

  const openSheet = React.useCallback(
    (sheet) => {
      if (typeId.value <= 0) return;
      modalOpenAction({
        page: "ReceiveEdit",
        title: ["app.financial.receive", "app.financial.box"],
        size: "md",
        targets: typeId.value == 7 ? ["Box"] : ["BankAccount"],
        typeId: typeId.value,
        sheet: sheet,
        onSaved: (res) => {
          console.log(res);
          if (res)
            dispatchSheetItems({
              type: "edit",
              new: res,
              prev: sheet,
              index: "insert",
            });
          modalCloseAction();
        },
      });
    },
    [typeId]
  );

  return (
    <div>
      <Breadcrumb
        breadcrumb={[
          "app.home",
          "app.saleservice.home",
          "app.saleservice.sheet",
        ]}
      />
      <Card>
        <CardBody>
          <Row className="mb-4">
            <Colxx sm="12" md="2" lg="2">
              <Select
                className="react-select"
                classNamePrefix="react-select"
                name="form-field-name"
                value={typeId}
                options={sheetReceiveTypes.map((item) => {
                  return {
                    value: item.key,
                    key: item.key,
                    label: item.name,
                  };
                })}
                onChange={(val) => {
                  setTypeId(val);
                }}
                placeholder=""
              />
            </Colxx>
            <Colxx sm="12" md="8" lg="8">
              <Button
                onClick={() => {
                  openSheet(null);
                }}
                color="info"
              >
                <IntlMessages id="app.saleservice.sheet.new" />
              </Button>{" "}
              <Button color="info">
                <IntlMessages id="group.action" />
              </Button>{" "}
              <Button color="dark">
                <IntlMessages id="export.excel" />
              </Button>{" "}
            </Colxx>
          </Row>
          <OtherList
            dispatchItemChange={dispatchSheetItems}
            items={items}
            loading={loadSheets.isLoading}
            onRowDoubleClick={(item) => {
              openSheet(item);
            }}
          />
        </CardBody>
      </Card>
    </div>
  );
};
const mapStateToProps = (state, { targets }) => {
  const sheetReceiveTypes = selectItemTarget(state, "SheetReceiveType");
  return {
    sheetReceiveTypes: sheetReceiveTypes,
  };
};

export default injectIntl(
  connect(mapStateToProps, {
    modalOpenAction: modalOpen,
    modalCloseAction: modalClose,
  })(Index)
);
