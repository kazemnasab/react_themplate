import * as React from "react";
import { Row, Card, CardBody, Input, Label, Button } from "reactstrap";
import { injectIntl } from "react-intl";
import { connect, useSelector, useDispatch } from "react-redux";

import { selectItemsSearch as selectProfiles } from "redux/profile/selector";
import { selectItemTarget as selectSetting } from "redux/setting/selector";
import { selectItemsSearch as selectFailures } from "redux/failure/selector";
import { selectItemsSearch as selectSkus } from "redux/product/selector";
import AirplayOutlined from "@mui/icons-material/AirplayOutlined";
import PaymentIcon from '@mui/icons-material/Payment';
import { Colxx, Separator } from "components/bootstrap/CustomBootstrap";

import IntlMessages from "helpers/IntlMessages";
import { SheetApi, SaleServiceApi } from "api/apis";
import CustomContainerModal from "components/common/CustomContainerModal";
import SaleServiceEdit from "./sheet/SaleServiceEdit";
import FactorBottom from "./factor/FactorBottom";

const SaleServiceFactorInfo = ({ sheetId, intl, customers, onCallBack }) => {
  const { messages } = intl;
  const [docNumber, setDocNumber] = React.useState("2222222");
  const [viewSaleService, setViewSaleService] = React.useState(false);
  const [viewFactorInfo, setVewFactorInfo] = React.useState(false);
  const [customer, setCustomer] = React.useState(null);
  const [sheet, setSheet] = React.useState(null);
  const [factor, setFactor] = React.useState(null);
  const [factorInfo, setFactorInfo] = React.useState(null);
  const [saleService, setSaleService] = React.useState(null);
  React.useEffect(() => {
    if (sheetId != null) openEditing({ id: sheetId });
  }, [sheetId]);

  const openEditing = ({ id = null, docNumber = null, number = null }) => {
    var result = {};
    var saleServiceApi = SaleServiceApi.Get({
      id: id,
      number: number,
      docNumber: docNumber,
    }).apply();
    saleServiceApi.then((sheets) => {
      if (sheets.data.length == 0) {
        setCustomer(null);
        setSheet(null);
        setSaleService(null);
        alert(messages["app.saleservice.sheet.packet.notexist"]);
        return;
      }
      result = { ...result, sheet: sheets.data[0] };
      setSheet(sheets.data[0]);
      setDocNumber(sheets.data[0].docNumber);
      if (sheets.data[0].receiverId)
        setCustomer(customers.find((m) => m.id == sheets.data[0].receiverId));
      var sheetApi = SheetApi.Get({
        typeId: 4,
        parrentId: sheets.data[0].id,
      }).apply();
      sheetApi.then((factors) => {
        if (factors.data.length > 0) {
          setFactor(factors.data[0]);
          result = { ...result, factor: factors.data[0] };
        }
        onCallBack(result);
      });
    });
  };

  return (
    <>
      <Row className="mb-2">
        <Colxx sm="12" md="2" lg="2">
          <Label className="form-group has-float-label">
            <span>
              <IntlMessages id="app.saleservice.sheet.packet" />
            </span>{" "}
            <Input
              value={docNumber}
              onChange={(e) => setDocNumber(e.target.value)}
              onKeyUp={(e) => {
                if (e.keyCode == 13) openEditing({ docNumber: docNumber });
              }}
            />
          </Label>
        </Colxx>
        <Colxx sm={6} md="2" lg="2">
          <AirplayOutlined
            onClick={() => {
              if (sheet) setViewSaleService(true);
            }}
            color="info"
            sx={{ fontSize: "40px", marginTop: "18px", cursor: "pointer" }}
          />
          <PaymentIcon
            onClick={() => {
              if (sheet) setVewFactorInfo(true);
            }}
            color="info"
            sx={{ fontSize: "40px", marginTop: "18px", cursor: "pointer" }}
          />
        </Colxx>
      </Row>
      <CustomContainerModal
        size="lg"
        isOpen={viewSaleService}
        toggle={() => {
          setViewSaleService(!viewSaleService);
        }}
        title="app.saleservice.sheet"
      >
        <SaleServiceEdit
          sheet={sheet}
          onSaved={(sheet) => {
            setViewSaleService(false);
          }}
        />
      </CustomContainerModal>
      <CustomContainerModal
        size="md"
        isOpen={viewFactorInfo}
        toggle={() => {
          setVewFactorInfo(!viewFactorInfo);
        }}
        title="app.saleservice.sheet.order"
      >
        <FactorBottom
          sheet={factor}
          onSaved={(sheet) => {
            setVewFactorInfo(false);
          }}
        />
      </CustomContainerModal>
    </>
  );
};

const mapStateToProps = (state) => {
  const customers = selectProfiles(state, [], (m) => true);
  const warantyStates = selectSetting(state, "Warranty");
  const fs = selectFailures(state, "");
  const skuList = selectSkus(state, "", "");
  return {
    customers,
    failures: fs,
    warantyStates,
    skuList,
  };
};

export default injectIntl(connect(mapStateToProps, {})(SaleServiceFactorInfo));
