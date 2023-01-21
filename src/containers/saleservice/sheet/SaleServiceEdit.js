import * as React from "react";
import { Row, Card, CardBody, Input, Label, Button } from "reactstrap";
import { injectIntl } from "react-intl";
import { connect, useSelector, useDispatch } from "react-redux";

import Select from "react-select";
import { selectItemsSearch as selectProfiles } from "redux/profile/selector";
import { selectItemTarget as selectSetting } from "redux/setting/selector";
import { selectItemsSearch as selectFailures } from "redux/failure/selector";
import { selectItemsSearch as selectSkus } from "redux/product/selector";

import { Colxx, Separator } from "components/bootstrap/CustomBootstrap";
import { useForm, Controller } from "react-hook-form";

import IntlMessages from "helpers/IntlMessages";
import * as Api from "api/core";
import AsyncSelect from "components/async/AsyncSelect";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import ProfileSelect from "containers/profile/ProfileSelect";
import CustomContainerModal from "components/common/CustomContainerModal";
import { SaleServiceApi, FailureItemApi, SheetApi } from "api/apis";

const SaleServiceEdit = ({
  sheet,
  intl,
  customers,
  failures,
  warantyStates,
  onSaved,
}) => {
  React.useEffect(() => {}, [customers]);
  const { messages } = intl;

  const [isSaving, setIsSaving] = React.useState(false);

  const schema = yup.object().shape({
    docNumber: yup.string().required("شماره پاکت درست وارد نشده است"),
    serial: yup.string().required("شماره سریال درست وارد نشده است"),
    ghab: yup.object().required("شماره سریال درست وارد نشده است"),
    customer: yup.object().required("مشتری وارد نشده است"),
    sku: yup.string().required("رفرانس درست وارد نشده است"),
    guaranty: yup.object().required(" وضعیت گارانتی وارد نشده است"),
  });

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
  const watchSku = watch("sku", ""); // you can supply default value as second argument
  const customer = watch("customer", null); // you can supply default value as second argument
  var prevFailures = []; // you can supply default value as second argument

  React.useEffect(() => {
    openEditing({ sheet: sheet });
  }, [sheet]);

  const openEditing = ({ sheet, docNumber }) => {
    if (sheet) openSheet(sheet);
    else if (docNumber) {
      var saleServiceApi = SaleServiceApi.Get({
        docNumber: docNumber,
      }).apply();
      saleServiceApi.then((sheets) => {
        if (sheets.data.length == 0) {
          alert(messages["app.saleservice.sheet.packet.notexist"]);
          return;
        }
        openSheet(sheets.data[0]);
      });
    }
  };

  const openSheet = (sheet) => {
    setValue("docNumber", sheet.docNumber);
    var customer = customers.find((m) => m.id == sheet.receiverId);
    if (!customer)
      customer = { id: 0, firstName: "", lastName: "", attributs: [] };
    setValue("customerId", customer.id);
    var customername = customer.firstName + " " + customer.lastName;
    setValue("customer", customer);
    setValue("customername", customername);
    var loadSaleservice = SaleServiceApi.GetById(sheet.id);
    loadSaleservice().then((res) => {
      //console.log(res.data);
      Object.keys(res.data).forEach((element) => {
        if (element != "failures") setValue(element, res.data[element]);
      });
      var guaranty = warantyStates.find((m) => m.key == res.data.guaranty);
      setValue("guaranty", {
        value: guaranty.key,
        key: guaranty.key,
        label: guaranty.name,
      });
      setValue("ghab", {
        value: res.data.ghab,
        key: res.data.ghab,
        label: res.data.ghab,
      });
    });
    var loadFailureItems = FailureItemApi.Get({ sheet: sheet.id });
    loadFailureItems().then((res) => {
      //console.log(res.data);
      sheet.failures = [...res.data];
      setValue(
        "failures",
        res.data.map((item) => {
          var failure = failures.find((m) => m.id == item.failureId);
          return {
            value: item.failureId,
            key: item.failureId,
            label: failure.nameEn + " " + failure.name + " - " + failure.sku,
            item: failure,
          };
        })
      );
    });
  };
  const saveSheet = (data) => {
    var body = {
      id: 0,
      sheetId: sheet != null ? sheet.id : 0,
      appearance: data.appearance ? data.appearance : "",
      category: data.category ? data.category : "",
      guaranty: data.guaranty.value,
      guarantyDes: data.guarantyDes ? data.guarantyDes : "",
      ghab: data.ghab.value ? data.ghab.value : "",
      caliber: data.caliber ? data.caliber : "",
      list: data.list ? data.list : "",
      packet: data.packet ? data.packet : "",
      serial: data.serial ? data.serial : "",
      sku: data.sku ? data.sku : "",
      sheet: {
        id: sheet != null ? sheet.id : 0,
        typeId: 15,
        target: "SaleService",
        date: sheet != null ? sheet.date : null,
        docNumber: data.docNumber,
        receiverId: customer.id,
      },
      failures: !data.failures
        ? []
        : data.failures.map((item, index) => {
            var failure = sheet
              ? sheet.failures.find((m) => m.failureId == item.value)
              : null;
            return {
              id: failure ? failure.id : 0,
              failureId: item.value,
              sheetId: sheet != null ? sheet.id : 0,
            };
          }),
    };
    if (sheet != null) {
      var failureIds = body.failures.map((m) => m.failureId);
      var deleted = sheet.failures
        .filter((item) => !failureIds.includes(item.failureId))
        .map((item) => {
          return {
            id: item.id,
            failureId: item.failureId,
            sheetId: sheet.id,
            deleted: true,
          };
        });
      //console.log(deleted);
      body.failures = [...body.failures, ...deleted];
    }
    //setSavingBody(body);
    //return;
    setIsSaving(true);
    var saleServicePost = SaleServiceApi.Post(body).apply(); // Api.api_post("SaleService", body);
    var api = saleServicePost;
    api.then((res) => {
      setIsSaving(false);
      onSaved({ ...res.data.sheet });
    });
    api.catch((error) => {
      setIsSaving(false);
      alert(error.response.data);
    });
  };

  const onSubmit = (data) => {
    if (!isSaving) saveSheet(data);
  };

  const [modalCustomer, setModalCustomer] = React.useState(false);

  return (
    <>
      <Row>
        <Colxx xxs="12" xl="12" className="mb-4">
          <Card>
            <CardBody>
              <form
                onSubmit={handleSubmit(onSubmit)}
                defaultValue={sheet}
                onKeyDown={(e) => {
                  if (e.keyCode == 13) e.preventDefault();
                }}
              >
                <>
                  <Row className="mb-2">
                    <Colxx sm="12" md="6" lg="4">
                      <Label className="form-group has-float-label">
                        <span>
                          <IntlMessages id="app.saleservice.sheet.packet" />
                        </span>{" "}
                        <Controller
                          name="docNumber"
                          control={control}
                          watch={watch}
                          render={({ field }) => (
                            <Input
                              {...field}
                              onKeyUp={(e) => {
                                if (e.keyCode == 13)
                                  openEditing({ docNumber: e.target.value });
                              }}
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
                          <IntlMessages id="customer.name" />
                        </span>
                        <Controller
                          name="customername"
                          control={control}
                          watch={watch}
                          render={({ field }) => (
                            <Input
                              {...field}
                              readOnly={true}
                              onClick={()=>{setModalCustomer(true)}}
                            />
                          )}
                        />
                        {errors.customer ? (
                          <div className="invalid-feedback d-block">
                            {errors.customer.message}
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
                  </Row>

                  <Row className="mb-2">
                    <Colxx sm="12" md="6" lg="4">
                      <Label className="form-group has-float-label">
                        <span>
                          <IntlMessages id="app.saleservice.sheet.sku" />
                        </span>{" "}
                        <Controller
                          name="sku"
                          control={control}
                          watch={watch}
                          render={({ field }) => (
                            <Input {...field} id="sku" name="sku" />
                          )}
                        />
                        {errors.sku ? (
                          <div className="invalid-feedback d-block">
                            {errors.sku.message}
                          </div>
                        ) : null}
                      </Label>
                    </Colxx>
                    <Colxx sm="12" md="6" lg="4">
                      <Label className="form-group has-float-label">
                        <span>
                          <IntlMessages id="app.saleservice.sheet.serial" />
                        </span>{" "}
                        <Controller
                          name="serial"
                          control={control}
                          render={({ field }) => <Input {...field} />}
                        />
                        {errors.serial ? (
                          <div className="invalid-feedback d-block">
                            {errors.serial.message}
                          </div>
                        ) : null}
                      </Label>
                    </Colxx>
                    <Colxx sm="12" md="6" lg="4">
                      <Label className="form-group has-float-label">
                        <span>
                          <IntlMessages id="app.saleservice.sheet.ghab" />
                        </span>{" "}
                        <Controller
                          name="ghab"
                          control={control}
                          render={({ field }) => (
                            <AsyncSelect
                              url={
                                watchSku != ""
                                  ? `SaleService/info?sku=${watchSku}&info=ghab`
                                  : ""
                              }
                              onChange={setValue}
                              optionsGetter={(res) => {
                                return res.map((item) => {
                                  return {
                                    value: item.key,
                                    key: item.key,
                                    label: item.key,
                                  };
                                });
                              }}
                              field={field}
                            />
                          )}
                        />
                        {errors.ghab ? (
                          <div className="invalid-feedback d-block">
                            {errors.ghab.message}
                          </div>
                        ) : null}
                      </Label>
                    </Colxx>
                  </Row>
                  <Row className="mb-2" style={{ display: "none" }}>
                    <Colxx sm="12" md="6" lg="4">
                      <Label className="form-group has-float-label">
                        <span>
                          <IntlMessages id="app.saleservice.sheet.caliber" />
                        </span>
                        <Controller
                          name="caliber"
                          control={control}
                          render={({ field }) => <Input {...field} />}
                        />
                      </Label>
                    </Colxx>
                    <Colxx sm="12" md="6" lg="4">
                      <Label className="form-group has-float-label">
                        <span>
                          <IntlMessages id="app.saleservice.sheet.list" />
                        </span>{" "}
                        <Controller
                          name="list"
                          control={control}
                          render={({ field }) => <Input {...field} />}
                        />
                      </Label>
                    </Colxx>

                    <Colxx sm="12" md="6" lg="4">
                      <Label className="form-group has-float-label">
                        <span>
                          <IntlMessages id="app.saleservice.sheet.category" />
                        </span>{" "}
                        <Controller
                          name="category"
                          control={control}
                          render={({ field }) => <Input {...field} />}
                        />
                      </Label>
                    </Colxx>
                  </Row>
                  <Row className="mb-2">
                    <Colxx sm="12" md="6" lg="4">
                      <Label className="form-group has-float-label">
                        <span>
                          <IntlMessages id="app.saleservice.sheet.garanty" />
                        </span>
                        <Controller
                          name="guaranty"
                          control={control}
                          render={({ field }) => (
                            <Select
                              className="react-select"
                              classNamePrefix="react-select"
                              name="form-field-name"
                              {...field}
                              options={warantyStates.map((item) => {
                                return {
                                  value: item.key,
                                  key: item.key,
                                  label: item.name,
                                };
                              })}
                              placeholder=""
                            />
                          )}
                        />

                        {errors.guaranty ? (
                          <div className="invalid-feedback d-block">
                            {errors.guaranty.message}
                          </div>
                        ) : null}
                      </Label>
                    </Colxx>
                    <Colxx sm="12" md="8">
                      <Label className="form-group has-float-label">
                        <span>
                          <IntlMessages id="app.saleservice.sheet.garantydes" />
                        </span>
                        <Controller
                          name="guarantyDes"
                          control={control}
                          render={({ field }) => <Input {...field} />}
                        />
                      </Label>
                    </Colxx>
                  </Row>
                  <Row>
                    <Colxx sm="12" className="form-group has-float-label">
                      <Label className="form-group has-float-label">
                        <span>
                          <IntlMessages id="app.saleservice.sheet.appearance" />
                        </span>
                        <Controller
                          name="appearance"
                          control={control}
                          render={({ field }) => <Input {...field} />}
                        />
                      </Label>
                    </Colxx>
                  </Row>

                  <Row>
                    <Colxx sm="12" md="12" className="mb-2">
                      <span>
                        <IntlMessages id="app.saleservice.sheet.failures" />
                      </span>
                      <Controller
                        name="failures"
                        control={control}
                        render={({ field }) => (
                          <Select
                            className="react-select"
                            classNamePrefix="react-select"
                            name="form-field-name"
                            isMulti
                            {...field}
                            options={failures.map((item) => {
                              return {
                                value: item.id,
                                key: item.id,
                                label:
                                  item.nameEn +
                                  " " +
                                  item.name +
                                  " - " +
                                  item.sku,
                                item: item,
                              };
                            })}
                            placeholder=""
                          />
                        )}
                      />
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

export default injectIntl(connect(mapStateToProps, {})(SaleServiceEdit));
