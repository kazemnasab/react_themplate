import * as React from "react";
import { Row, Card, CardBody, Input, Label, Button } from "reactstrap";
import { injectIntl } from "react-intl";
import { connect, useSelector, useDispatch } from "react-redux";

import Select from "react-select";
import { selectItemsSearch as selectProfiles } from "redux/profile/selector";

import { Colxx, Separator } from "components/bootstrap/CustomBootstrap";
import { useForm, Controller } from "react-hook-form";

import IntlMessages from "helpers/IntlMessages";
import * as Api from "api/core";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import DatePickInput from "components/common/DatePickInput";

const FactorBottom = ({ sheet, sheetId, intl, customers, onSaved }) => {
  React.useEffect(() => {}, [customers]);
  const { messages } = intl;

  const schema = yup.object().shape({});

  const {
    control,
    handleSubmit,
    setValue,
    watch,
    reset,
    register,
    setFocus,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  const factorId = watch("factorId", 0); // you can supply default value as second argument
  const watchSku = watch("sku", ""); // you can supply default value as second argument
  const customer = watch("customer", null); // you can supply default value as second argument
  var prevFailures = []; // you can supply default value as second argument

  React.useEffect(() => {
    if (sheet != null) openEditing(sheet);
  }, [sheet]);

  const openEditing = (sheet) => {
    setValue("number", sheet.number);
    setValue("date", null);
    setValue("date", sheet.date);
    setValue("comment", sheet.comment);
    setValue("deliverDate", null);
    setValue("orderDate", null);
    Api.api_get("Factor/" + sheet.id).then((res) => {
      if (res.data) {
        setValue("factorId", sheet.id);
        setValue("deliverDate", res.data.deliverDate);
        setValue("orderDate", res.data.orderDate);
        setValue("orderNumber", res.data.orderNumber);
        setValue("discount", res.data.discount);
        setValue("discountDes", res.data.discountDes);
        setValue("discount", res.data.discount);
      }
    });
  };

  const saveSheet = (data) => {
    var body = {
      sheetId: sheet.id,
      orderDate: data.orderDate,
      deliverDate: data.deliverDate,
      agentId: data.agentId ? data.agentId : 0,
      discount: data.discount,
      discountDes: data.discountDes,
      sheet: {
        ...sheet,
      },
    };
    var api = Api.api_post("Factor", body);
    api.then((res) => {
      onSaved({ ...res.data });
    });
    api.catch((error) => {
      alert(error.response.data);
    });
    //console.log(body);
  };

  const onSubmit = (data) => {
    //console.log(data);
    saveSheet(data);
  };

  return (
    <Row>
      <Colxx xxs="12" xl="12" className="mb-4">
        <Card>
          <CardBody>
            <form onSubmit={handleSubmit(onSubmit)} defaultValue={sheet}>
              <>
                <Row className="mb-2">
                  <Colxx sm="12" md="6" lg="4">
                    <Label className="form-group has-float-label">
                      <span>
                        <IntlMessages id="app.sale.factor.ordernumber" />
                      </span>
                      <Controller
                        name="orderNumber"
                        control={control}
                        render={({ field }) => <Input {...field} />}
                      />
                    </Label>
                  </Colxx>
                  <Colxx sm="12" md="6" lg="4">
                    <Label className="form-group has-float-label">
                      <span>
                        <IntlMessages id="app.sale.factor.orderdate" />
                      </span>
                      <Controller
                        name="orderDate"
                        control={control}
                        render={({ field }) => <DatePickInput {...field} />}
                      />
                    </Label>
                  </Colxx>
                </Row>
                <Row className="mb-2">
                  <Colxx sm="12" md="6" lg="4">
                    <Label className="form-group has-float-label">
                      <span>
                        <IntlMessages id="app.sale.factor.number" />
                      </span>
                      <Controller
                        name="number"
                        control={control}
                        render={({ field }) => <Input {...field} />}
                      />
                    </Label>
                  </Colxx>
                  <Colxx sm="12" md="6" lg="4">
                    <Label className="form-group has-float-label">
                      <span>
                        <IntlMessages id="app.sale.factor.date" />
                      </span>
                      <Controller
                        name="date"
                        control={control}
                        render={({ field }) => <DatePickInput {...field} />}
                      />
                    </Label>
                  </Colxx>
                  <Colxx sm="12" md="6" lg="4">
                    <Label className="form-group has-float-label">
                      <span>
                        <IntlMessages id="app.sale.factor.senddate" />
                      </span>
                      <Controller
                        name="deliverDate"
                        control={control}
                        render={({ field }) => <DatePickInput {...field} />}
                      />
                    </Label>
                  </Colxx>
                </Row>
                <Row className="mb-2">
                  <Colxx sm="12" md="6" lg="4">
                    <Label className="form-group has-float-label">
                      <span>
                        <IntlMessages id="app.sale.factor.discount" />
                      </span>
                      <Controller
                        name="discount"
                        control={control}
                        render={({ field }) => <Input {...field} />}
                      />
                    </Label>
                  </Colxx>
                  <Colxx sm="12" md="6" lg="8">
                    <Label className="form-group has-float-label">
                      <span>
                        <IntlMessages id="app.sale.factor.discountdes" />
                      </span>
                      <Controller
                        name="discountDes"
                        control={control}
                        render={({ field }) => <Input {...field} />}
                      />
                    </Label>
                  </Colxx>
                </Row>
                <Row>
                  <Colxx sm="12" md="12" lg="12">
                    <Label className="form-group has-float-label">
                      <span>
                        <IntlMessages id="comment" />
                      </span>
                      <Controller
                        name="comment"
                        control={control}
                        render={({ field }) => <Input {...field} />}
                      />
                    </Label>
                  </Colxx>
                </Row>
                <Colxx xxs="10">
                  {!factorId ? (
                    <Button color="success">
                      <IntlMessages id="app.saleservice.sheet.createorder" />
                    </Button>
                  ) : (
                    <Button color="info">
                      <IntlMessages id="submit.change" />
                    </Button>
                  )}
                  {"  "}
                  <Button
                    color="danger"
                    onClick={() => {
                      onSaved(null);
                    }}
                  >
                    <IntlMessages id="cancel.change" />
                  </Button>
                </Colxx>
              </>
            </form>
          </CardBody>
        </Card>
      </Colxx>
    </Row>
  );
};

const mapStateToProps = (state) => {
  const customers = selectProfiles(state, [], (m) => true);
  return {
    customers,
  };
};

export default injectIntl(connect(mapStateToProps, {})(FactorBottom));
