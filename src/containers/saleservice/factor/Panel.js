import * as React from "react";

import { Row, Button } from "reactstrap";
import IntlMessages from "helpers/IntlMessages";
import { Colxx } from "components/bootstrap/CustomBootstrap";
import { injectIntl } from "react-intl";
import { connect } from "react-redux";
import CustomContainerModal from "components/common/CustomContainerModal";
import EditFactorItem from "../factorItem/Edit";
import { Index as List } from "../factorItem/List2";
import { useCustomListReducer } from "helpers/core";
import SaleServiceFactorInfo from "../SaleServiceFactorInfo";
import * as Api from "api/core";
import { useApiMyCustomFetch } from "api/methods";
import { FactorItemApi, SheetApi } from "api/apis";

function FactorPanel({ sheetId = null, intl }) {
  const [currentFactorId, setCurrentFactorId] = React.useState(-1);
  const [currentSheetId, setCurrentSheetId] = React.useState(sheetId);
  const [selectedItem, setSelectedItem] = React.useState(null);
  const [selectedItems, setSelectedItems] = React.useState([]);
  const [isOpenEditModal, setisOpenEditModal] = React.useState(false);

  const loadFactorItems = useApiMyCustomFetch(
    FactorItemApi.Get({ sheet: currentFactorId ?? -1 }),
    currentFactorId
  );

  const [factorItems, dispatchFactorItems] = useCustomListReducer({
    initialArg: loadFactorItems.data,
    key: currentFactorId,
  });

  const sheetFactor = (sheet, typeId) => {
    const body = {
      typeId: 4,
      target: "ServiceFactor",
      parrentId: sheet.id,
      receiverId: sheet.receiverId,
    };

    var api = SheetApi.Post(body).apply(); // Api.api_post("Sheet", body);
    api.then((res) => {
      setCurrentFactorId(res.data.id);
    });
    api.catch((error) => {
      alert("error", "filled", "", error.response.data, () => {});
    });
  };

  const handleNewState = () => {
    setisOpenEditModal(true);
  };
  return (
    <>
      <Row>
        <Colxx xxs="12">
          <SaleServiceFactorInfo
            sheetId={currentSheetId}
            onCallBack={(res) => {
              setCurrentFactorId(null);
              //console.log(res);
              if (res) {
                setCurrentSheetId(res.sheet.id);
                if (!res.factor) sheetFactor(res.sheet);
                else setCurrentFactorId(res.factor.id);
              }
            }}
          />
          <CustomContainerModal
            size="md"
            isOpen={isOpenEditModal}
            title="app.saleservice.sheet.actions"
          >
            <EditFactorItem
              sheetId={currentFactorId}
              item={selectedItem}
              onCallBack={(res) => {
                if (res)
                  dispatchFactorItems({
                    type: "edit",
                    new: res,
                    prev: selectedItem,
                  });
                setSelectedItem(null);
                setisOpenEditModal(false);
              }}
            />
          </CustomContainerModal>
        </Colxx>
      </Row>
      {currentFactorId ? (
        <Row>
          <Colxx md="12" className="mb-2">
            <Button color="info" onClick={handleNewState}>
              <IntlMessages id="app.saleservice.sheet.actions.new" />
            </Button>{" "}
            {selectedItems.length > 0 ? (
              <>
                <Button color="danger" onClick={handleNewState}>
                  <IntlMessages id="delete" />
                </Button>{" "}
                <Button color="info" onClick={handleNewState}>
                  <IntlMessages id="group.action" />
                </Button>
              </>
            ) : (
              ""
            )}
          </Colxx>
          <List
            dispatchFunction={dispatchFactorItems}
            items={factorItems ?? []}
            onSelectionModelChange={(ids) => {
              setSelectedItems(ids);
            }}
            onSelectedChange={(item) => {
              setSelectedItem(item);
              setisOpenEditModal(true);
            }}
            loading={loadFactorItems.isLoading}
          />
        </Row>
      ) : (
        <></>
      )}
    </>
  );
}

const mapStateToProps = (state) => {
  return {};
};

export default injectIntl(connect(mapStateToProps, {})(FactorPanel));
