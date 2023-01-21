import * as React from "react";

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
import IntlMessages from "helpers/IntlMessages";
import { Colxx } from "components/bootstrap/CustomBootstrap";
import { injectIntl } from "react-intl";
import { connect } from "react-redux";
import CustomContainerModal from "components/common/CustomContainerModal";
import Edit from "./Edit";
import {Index as List} from "./List";
import {itemUpdated} from "helpers/core";
import SaleServiceFactorInfo from "../SaleServiceFactorInfo";

function Panel({ sheetId = null, intl }) {
  const [currentSheetId, setCurrentSheetId] = React.useState(sheetId);
  const [selectedItem, setSelectedItem] = React.useState(null);
  const [isOpenEditModal, setisOpenEditModal] = React.useState(false);
  const [onItemUpdated, setOnItemUpdated] = React.useState(0);

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
              setCurrentSheetId(null);
              //console.log(res);
              if (res) setCurrentSheetId(res.sheet.id);
            }}
          />
          <CustomContainerModal
            size="md"
            isOpen={isOpenEditModal}
            title="app.saleservice.sheet"
          >
            <Edit
              sheetId={currentSheetId}
              item={selectedItem}
              onCallBack={(res) => {
                setOnItemUpdated(() => itemUpdated(selectedItem, res));
                setSelectedItem(null);
                setisOpenEditModal(false);
              }}
            />
          </CustomContainerModal>
        </Colxx>
      </Row>
      {currentSheetId ? (
        <Row>
          <Colxx xxs="12" className="mb-2">
            <Button color="info" onClick={handleNewState}>
              <IntlMessages id="app.saleservice.sheet.kardex.new" />
            </Button>
          </Colxx>
          <List
            sheetId={currentSheetId}
            onItemUpdated={onItemUpdated}
            onSelectedChange={(item) => {
              setSelectedItem(item);
              setisOpenEditModal(true);
            }}
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

export default injectIntl(connect(mapStateToProps, {})(Panel));
