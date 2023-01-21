import * as React from "react";
import DatePickInput from "components/common/DatePickInput";
import { Row, Card, CardBody, Input, Label, Button } from "reactstrap";
import IntlMessages from "helpers/IntlMessages";
import { Colxx } from "components/bootstrap/CustomBootstrap";
import { selectItemsSearch } from "redux/profile/selector";
import { injectIntl } from "react-intl";
import { connect } from "react-redux";
import Select from "react-select";

function EditRepaire({ value, repaireMans, onChange }) {
  return (
    <>
      <Row className="mb-2">
        <Colxx sm="12" md="6" lg="6">
          <Label className="form-group has-float-label">
            <span>
              <IntlMessages id="app.saleservice.repaire.date1" />
            </span>
            <DatePickInput
              value={value ? value.date1 : null}
              onChange={(date) => {
                onChange("date1", date);
              }}
            />
          </Label>
        </Colxx>
        <Colxx sm="12" md="6" lg="6">
          <Label className="form-group has-float-label">
            <span>
              <IntlMessages id="app.saleservice.repaire.date2" />
            </span>
            <DatePickInput
              value={value && value.date2 ? value.date2 : null}
              onChange={(date) => {
                onChange("date2", date);
              }}
            />
          </Label>
        </Colxx>
        <Colxx sm="12" md="6" lg="6">
          <Label className="form-group has-float-label">
            <span>
              <IntlMessages id="app.saleservice.repaire.name" />
            </span>
            <Select
              classNamePrefix="react-select"
              options={repaireMans.map((item) => {
                return { value: item.id, label: item.firstName+' '+item.lastName };
              })}
              onChange={(val) => {
                onChange("profileId", val.value);
              }}
              onBlur={() => {}}
              value={
                value && value.profileId
                  ? {
                      value: value.profileId,
                      key: value.profileId,
                      label: repaireMans.find((m) => m.id == value.profileId)
                        .firstName+' '+repaireMans.find((m) => m.id == value.profileId)
                        .lastName,
                    }
                  : {}
              }
            />
          </Label>
        </Colxx>
      </Row>
    </>
  );
}

const mapStateToProps = (state) => {
  const repaireMans = selectItemsSearch(state, ["RepairMan"], "");
  return {
    repaireMans,
  };
};

export default injectIntl(connect(mapStateToProps, {})(EditRepaire));
