import * as React from "react";
import CreatableSelect from "react-select/creatable";
import { Row, Input, Label, Button } from "reactstrap";
import IntlMessages from "helpers/IntlMessages";
import { Colxx } from "components/bootstrap/CustomBootstrap";
import { selectItemsSearch } from "redux/profile/selector";
import { injectIntl } from "react-intl";
import { connect } from "react-redux";

function ProfileSelectByTarget({ customers, onCallBack, customer, target }) {
  const [value, setValue] = React.useState(customer ? customer : { id: "" });
  React.useEffect(() => {}, []);
  return (
    <Row className="mb-2">
      <Colxx sm="12" md="12" lg="12">
        <Label className="form-group has-float-label">
          <span>
            <IntlMessages id="customer.name" />
          </span>
          <CreatableSelect
            className="react-select"
            classNamePrefix="react-select"
            name="form-field-name"
            isClearabled
            label="ایجاد"
            value={{
              value: value.id,
              key: value.id,
              label: value ? value.firstName + " " + value.lastName : "",
              item: value,
            }}
            options={customers.map((item) => {
              return {
                value: item.id,
                key: item.id,
                label: item.firstName + " " + item.lastName,
                attributs: item.attributs,
                item: item,
              };
            })}
            placeholder=""
            onChange={(val) => {
              if (val && !val.__isNew__) {
                setValue(val.item);
              }
            }}
          />
        </Label>
      </Colxx>
      <Colxx sm="12" md="12" lg="12">
        <Label className="form-group has-float-label">
          <span>
            <IntlMessages id="profile.mobile" />
          </span>
          <Input
            type="text"
            onChange={(val) => setValue({ ...value, mobile: val.target.value })}
          />
        </Label>
      </Colxx>
      <Colxx sm="12" md="12" lg="12">
        <Label className="form-group has-float-label">
          <span>
            <IntlMessages id="profile.address" />
          </span>
          <Input
            type="text"
            onChange={(val) =>
              setValue({ ...value, address: val.target.value })
            }
          />{" "}
        </Label>
      </Colxx>
      <Colxx>
        <Button
          color="info"
          onClick={() => {
            onCallBack(value);
          }}
        >
          <IntlMessages id="select" />
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
    </Row>
  );
}

const mapStateToProps = (state, { target }) => {
  const customers = selectItemsSearch(state, [target], (m) => true);
  return {
    customers,
  };
};

export default injectIntl(connect(mapStateToProps, {})(ProfileSelectByTarget));
