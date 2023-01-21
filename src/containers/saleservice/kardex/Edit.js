import * as React from "react";
import { Row, Card, CardBody, Input, Label, Button } from "reactstrap";
import { injectIntl } from "react-intl";
import { connect } from "react-redux";

import Select from "react-select";

import { selectItemsSearch } from "redux/profile/selector";
import { selectItemTarget } from "redux/status/selector";

import { Colxx, Separator } from "components/bootstrap/CustomBootstrap";

import IntlMessages from "helpers/IntlMessages";
import * as Api from "api/core";
import EditOther from "./Edit.Other";
import EditRepaire from "./Edit.Repaire";

const Edit = ({
  sheetId,
  item = {},
  intl,
  onCallBack,
  sheetStates,
}) => {
  //console.log(item);
  const { messages } = intl;
  const [currentItem, setCurrentItem] = React.useState(item ? item : {}); // you can supply default value as second argument

  React.useEffect(() => {}, [currentItem]);
  const saveCurrentItem = (data) => {
    data = { ...currentItem, sheetId: sheetId };
    //console.log(data);
    var api_res = Api.api_post("SheetStatus", data);
    api_res.then((res) => {
      onCallBack(res.data);
    });
    api_res.catch((res) => {
      alert();
    });
  };

  return (
    <>
      <Card>
        <CardBody>
          <Row className="mb-2">
            <Colxx sm="12" md="6" lg="6">
              <Label className="form-group has-float-label">
                <span>
                  <IntlMessages id="app.saleservice.sheet.status" />
                </span>
                <Select
                  className="react-select"
                  classNamePrefix="react-select"
                  value={
                    currentItem.stateId
                      ? {
                          value: currentItem.stateId,
                          key: currentItem.stateId,
                          label: sheetStates.find(
                            (m) => m.key == currentItem.stateId
                          ).title,
                        }
                      : {}
                  }
                  options={sheetStates.map((item) => {
                    return {
                      value: item.key,
                      key: item.key,
                      label: item.title,
                    };
                  })}
                  placeholder=""
                  onChange={(val) => {
                    //console.log(val);
                    //console.log(sheetStates);
                    setCurrentItem({ ...currentItem, stateId: val.value });
                  }}
                />
              </Label>
            </Colxx>
          </Row>

          {currentItem.stateId == 4 ? (
            <EditRepaire
              value={currentItem}
              onChange={(element, val) => {
                var res = currentItem ? { ...currentItem } : {};
                res[element] = val;
                setCurrentItem(res);
              }}
            />
          ) : (
            <EditOther
              value={currentItem}
              onChange={(element, val) => {
                var res = currentItem ? { ...currentItem } : {};
                res[element] = val;
                setCurrentItem(res);
              }}
            />
          )}
          <Colxx sm="12" md="12" lg="12">
            <Label className="form-group has-float-label">
              <span>
                <IntlMessages id="comment" />
              </span>
              <Input
                value={currentItem ? currentItem.comment : ""}
                onChange={(e) =>
                  setCurrentItem({ ...currentItem, comment: e.target.value })
                }
              />
            </Label>
          </Colxx>
          <Colxx xxs="10">
            <Button color="success" onClick={saveCurrentItem}>
              <IntlMessages id="submit.change" />
            </Button>
            {"  "}
            <Button
              color="danger"
              onClick={() => {
                onCallBack(null);
              }}
            >
              <IntlMessages id="cancel.change" />
            </Button>
          </Colxx>
        </CardBody>
      </Card>
    </>
  );
};

const mapStateToProps = (state) => {
  const sheetStates = selectItemTarget(state, "Sheet15");
  return {
    sheetStates: sheetStates,
  };
};

export default injectIntl(connect(mapStateToProps, {})(Edit));
