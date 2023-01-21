import { Colxx, Separator } from "components/bootstrap/CustomBootstrap";
import IntlMessages from "helpers/IntlMessages";
import React from "react";
import { injectIntl } from "react-intl";
import { Row, Card, CardBody, Button } from "reactstrap";
import { useCustomListReducer } from "helpers/core";
import { useApiMyCustomFetch, useApiCustomQuery } from "api/methods";
import { SheetApi } from "api/apis";
import Breadcrumb from "containers/TopNav/Breadcrumb";
import { connect } from "react-redux";
import { modalOpen, modalClose } from "redux/actions";
import SaleServiceList from "containers/saleservice/sheet/SaleServiceList";
import AddOutlinedIcon from '@mui/icons-material/AddOutlined';
import AddBoxIcon from '@mui/icons-material/AddBox';
const Index = ({ intl, modalOpenAction, modalCloseAction }) => {
  const loadSheets = useApiMyCustomFetch(
    SheetApi.Get({ stateId: null, typeId: 15 }),
    1
  );

  const [items, dispatchSheetItems] = useCustomListReducer({
    initialArg: loadSheets.data,
    key: 7,
  });

  const openSheet = React.useCallback((sheet) => {
    modalOpenAction({
      page: "SaleServiceEdit",
      title: ["app.saleservice.sheet"],
      size: "lg",
      targets: ["Box"],
      typeId: 15,
      sheet: sheet,
      onSaved: (res) => {
        if (res)
          dispatchSheetItems({
            type: "edit",
            new: res,
            prev: sheet,
            index: "insert"
          });
        modalCloseAction();
      },
    });
  }, []);

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
            <Colxx sm="12" md="12" lg="12">
              <Button
                onClick={() => {
                  openSheet(null);
                }}
                color="transparent"
              >
                <AddOutlinedIcon color="info" fontSize="40"/>
              </Button>{" "}
              <Button color="info">
                <IntlMessages id="group.action" />
              </Button>{" "}
              <Button color="dark">
                <IntlMessages id="export.excel" />
              </Button>{" "}
            </Colxx>
          </Row>
          <SaleServiceList
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

export default injectIntl(
  connect(null, {
    modalOpenAction: modalOpen,
    modalCloseAction: modalClose,
  })(Index)
);
