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
import EditCheque from "./EditCheque";

const PayEdit = (props) => {
  const {
    sheet,
    sheetId,
    typeId,
    targets,
    intl,
    payers,
    receivers,
    onSaved,
    sheetReceiveTypes,
  } = props;
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
    console.log(sheet);
    if (sheet != null) {
      setValue("number", sheet.number);
      setValue("comment", sheet.comment);
      setValue("price", sheet.price);
      var receiver = receivers.find((m) => m.id == sheet.receiverId);
      if (receiver)
        setValue("receiver", {
          value: receiver.id,
          key: receiver.id,
          label: receiver.firstName,
        });
      var payer = payers.find((m) => m.id == sheet.payerId);
      if (!payer) payer = { id: 0, firstName: "", lastName: "", attributs: [] };
      setValue("payerId", payer.id);
      var payername = payer.firstName + " " + payer.lastName;
      setValue("payer", payer);
      setValue("payername", payername);
    }
  }, [sheet]);

  const { messages } = intl;
  const schema = yup.object().shape({
    payer: yup
      .object()
      .required(`${messages["payer.account"]} ${messages["not.entered"]}`),
    receiver: yup
      .object()
      .required(`${messages["receiver.account"]} ${messages["not.entered"]}`),
    price: yup
      .number()
      .required(
        `${messages["app.sheet.receive.price"]} ${messages["not.entered"]}`
      ),
  });
  const {
    control,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });
  const payer = watch("payer", null); // you can supply default value as second argument

  const saveSheet = (data) => {
    var body1 = {
      ...data,
      id: sheet != null ? sheet.id : 0,
      receiverId: data.receiver.value,
      payerId: data.payerId,
      typeId: typeId,
      stateId: 10,
      comment: data.comment,
    };
    console.log(body1);
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
                          name="payername"
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
                        {errors.payer ? (
                          <div className="invalid-feedback d-block">
                            {errors.payer.message}
                          </div>
                        ) : null}
                      </Label>
                      <CustomContainerModal
                        isOpen={modalCustomer}
                        title="app.saleservice.sheet"
                      >
                        <ProfileSelect
                          customer={payer}
                          onCallBack={(profile) => {
                            setModalCustomer(false);
                            if (profile) {
                              setValue("payer", profile);
                              setValue("payerId", profile.id);
                              var payername =
                                profile.firstName + " " + profile.lastName;
                              setValue("payername", payername);
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
                          name="receiver"
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
                                };
                              })}
                              placeholder=""
                            />
                          )}
                        />
                        {errors.receiver ? (
                          <div className="invalid-feedback d-block">
                            {errors.receiver.message}
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

const mapStateToProps = (state, { targets }) => {
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
