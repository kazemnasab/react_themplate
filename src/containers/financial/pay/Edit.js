import React, { useEffect, useState } from "react";
import { Row, Card, CardBody, Input, Label, Button } from "reactstrap";
import { injectIntl } from "react-intl";
import { connect } from "react-redux";

import Select from "react-select";

import DatePickInput from "components/common/DatePickInput";
import { selectItemsSearch } from "redux/profile/selector";
import { selectItemTarget } from "redux/setting/selector";
import ProfileSelect from "containers/profile/ProfileSelect";

import { Colxx, Separator } from "components/bootstrap/CustomBootstrap";
import { useForm, Controller } from "react-hook-form";

import IntlMessages from "helpers/IntlMessages";
import { SheetApi } from "api/apis";
import CustomContainerModal from "components/common/CustomContainerModal";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

const PayEdit = ({
  sheet,
  sheetId,
  typeId,
  targets = [],
  intl,
  payers,
  receivers,
  onSaved,
  sheetReceiveTypes,
}) => {
  const [isSaving, setIsSaving] = React.useState(false);
  useEffect(() => {
    //console.log(sheetId);
    if (sheet == null && sheetId) {
      var api_get = SheetApi.GetById(sheetId).apply();
      api_get.then((res) => {
        //console.log(res.data);
        onSaved(res.data);
      });
    }
  }, [sheetId]);

  useEffect(() => {}, [payers]);

  useEffect(() => {
    //console.log(sheet);
    if (sheet != null) {
      //console.log(sheet);
      setValue("number", sheet.number);
      setValue("comment", sheet.comment);

      var customer = {};
      if (sheet.payerId) customer = payers.find((m) => m.id == sheet.payerId);
      setValue("payerId", customer.id);
      setValue("payer", customer);

      setValue("address", customer.address ?? "");
      setValue("mobile", customer.address ?? "mobile");

      const sht = sheetReceiveTypes.find((m) => m.key == sheet.typeId);
      setValue("sheetType", {
        value: sht.key,
        key: sht.key,
        label: sht.name,
        item: sht,
      });
    }
  }, [sheet]);

  const { messages } = intl;
  const schema = yup.object().shape({
    receiverId: yup
      .string()
      .required(`${messages["receiver.account"]} ${messages["not.entered"]}`),
    payerId: yup
      .string()
      .required(`${messages["payer.account"]} ${messages["not.entered"]}`),
    price: yup
      .number()
      .required(`${messages["payer.account"]} ${messages["not.entered"]}`),
  });
  const {
    control,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });
  const customer = watch("customer", null); // you can supply default value as second argument
  const sheetType = watch("typeId", null); // you can supply default value as second argument

  const saveSheet = (data) => {
    //console.log(data);
    var body1 = {
      ...data,
      id: sheet != null ? sheet.id : 0,
      typeId: typeId,
      stateId: 10,
      payerId: data.payerId,
      comment: data.comment,
    };
    //console.log(body1);
    var api_post = SheetApi.Post(body1).apply();
    api_post.then((res) => {
      onSaved(res.data);
      setValue("number", res.data.number);
    });
  };

  const onSubmit = (data) => {
    saveSheet(data);
  };
  const [modalCustomer, setModalCustomer] = React.useState(false);

  return (
    <>
      <Row>
        <Colxx xxs="12" xl="12" className="mb-4">
          <Card>
            <CardBody>
              <form onSubmit={handleSubmit(onSubmit)}>
              <>
                  <Row className="mb-2">
                    <Colxx sm="12" md="6" lg="4">
                      <Label className="form-group has-float-label">
                        <span>
                          <IntlMessages id="app.sheet.number" />
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
                          <IntlMessages id="date" />
                        </span>
                        <DatePickInput
                          key={watch("date")}
                          value={watch("date")}
                          onChange={(date) => {
                            setValue("date", date);
                          }}
                        />
                      </Label>
                    </Colxx>
                    <Colxx sm="12" md="6" lg="4">
                      <Label className="form-group has-float-label">
                        <span>
                          <IntlMessages id="payer.account" />
                        </span>
                        <Controller
                          name="customername"
                          control={control}
                          watch={watch}
                          render={({ field }) => (
                            <Input
                              {...field}
                              readOnly={true}
                              onClick={() => {
                                setModalCustomer(true);
                              }}
                            />
                          )}
                        />
                        {errors.receiverId ? (
                          <div className="invalid-feedback d-block">
                            {errors.receiverId.message}
                          </div>
                        ) : null}
                      </Label>
                      <CustomContainerModal
                        isOpen={modalCustomer}
                        title="app.saleservice.sheet"
                      >
                        <ProfileSelect
                          customer={customer}
                          onCallBack={(profile) => {
                            setModalCustomer(false);
                            if (profile) {
                              setValue("customer", profile);
                              setValue("customerId", profile.id);
                              var customername =
                                profile.firstName + " " + profile.lastName;
                              setValue("customername", customername);
                            }
                          }}
                        />
                      </CustomContainerModal>
                    </Colxx>
                    <Colxx sm="12" md="6" lg="4">
                      <Label className="form-group has-float-label">
                        <span>
                          <IntlMessages id="receiver.account" />
                        </span>
                        <Controller
                          name="receiverId"
                          control={control}
                          render={({ field }) => (
                            <Select
                              className="react-select"
                              classNamePrefix="react-select"
                              name="form-field-name"
                              {...field}
                              options={receivers.map((item) => {
                                return {
                                  value: item.id,
                                  key: item.id,
                                  label: item.firstName,
                                  item: item,
                                };
                              })}
                              placeholder=""
                            />
                          )}
                        />
                        {errors.docNumber ? (
                          <div className="invalid-feedback d-block">
                            {errors.docNumber.message}
                          </div>
                        ) : null}
                      </Label>
                    </Colxx>
                    <Colxx sm="12" md="6" lg="4">
                      <Label className="form-group has-float-label">
                        <span>
                          <IntlMessages id="app.sheet.receive.price" />
                        </span>
                        <Controller
                          name="price"
                          control={control}
                          render={({ field }) => <Input {...field} />}
                        />
                        {errors.price ? (
                          <div className="invalid-feedback d-block">
                            {errors.price.message}
                          </div>
                        ) : null}
                      </Label>
                    </Colxx>
                    <Colxx xs="12" sm="12" md="6" lg="4">
                      <Label className="form-group has-float-label">
                        <span>
                          <IntlMessages id="app.sheet.track" />
                        </span>
                        <Controller
                          name="track"
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
                    <Button color="success">
                      {!isSaving ? (
                        <IntlMessages id="submit.change" />
                      ) : (
                        <IntlMessages id="submit.loading" />
                      )}
                    </Button>
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
    </>
  );
};

const mapStateToProps = (state, { targets = [] }) => {
  const payers = selectItemsSearch(state, [], "");
  const receivers = selectItemsSearch(state, targets, "");
  const sheetReceiveTypes = selectItemTarget(state, "SheetReceiveType");
  return {
    payers,
    receivers,
    sheetReceiveTypes: sheetReceiveTypes,
  };
};

export default injectIntl(connect(mapStateToProps, {})(PayEdit));
