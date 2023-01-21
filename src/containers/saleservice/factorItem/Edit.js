import * as React from "react";
import { Row, Card, CardBody, Input, Label, Button } from "reactstrap";
import { injectIntl } from "react-intl";
import { connect, useSelector, useDispatch } from "react-redux";

import Select from "react-select";
import { selectItemsForFactor as selectProducts } from "redux/product/selector";
import { selectItemsSearch as selectWarehouse } from "redux/profile/selector";
import { selectItemTarget } from "redux/status/selector";

import { Colxx, Separator } from "components/bootstrap/CustomBootstrap";
import { useForm, Controller } from "react-hook-form";

import IntlMessages from "helpers/IntlMessages";
import { FactorItemApi, SheetApi } from "api/apis";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
const SaleServiceEdit = ({
  sheetId,
  item,
  intl,
  products,
  warehouses,
  onSaved,
  onCallBack,
  itemStates,
}) => {
  const { messages } = intl;

  const schema = yup.object().shape({
    productId: yup.object().required("رفرانس انتخاب نشده"),
    count: yup.number().required("تعداد وارد نشده"),
    price: yup.number().required("قیمت واحد وارد نشده"),
    stateId: yup.object().required("وضعیت نشده است"),
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
  const productId = watch("productId", null); // you can supply default value as second argument
  const warehouseId = watch("warehouseId", null); // you can supply default value as second argument

  React.useEffect(() => {
    if (item != null) openEditing(item);
  }, [item]);

  const openEditing = (item) => {
    Object.keys(item).forEach((element) => {
      setValue(element, item[element]);
    });
    var product = products.find((m) => m.id == item.productId);
    setValue("productId", {
      value: product.id,
      key: product.id,
      label: product.sku,
    });
    var warehouse = warehouses.find((m) => m.id == item.warehouseId);
    if (warehouse)
      setValue("warehouseId", {
        value: warehouse.id,
        key: warehouse.id,
        label: warehouse.firstName,
      });
    var state = itemStates.find((m) => m.key == item.stateId);
    if (state)
      setValue("stateId", {
        value: state.key,
        key: state.key,
        label: state.title,
      });
  };

  const Save = (data) => {
    //console.log(data);
    var body = {
      ...data,
      sheetId,
      stateId: data.stateId.value,
      productId: data.productId.value,
      warehouseId: data.warehouseId ? data.warehouseId.value : 0,
    };
    const { description, ...data1 } = body;
    //console.log(data1);

    var api = FactorItemApi.Post(data1).apply();// Api.api_post("FactorItem", data1);
    api.then((res) => {
      onCallBack(res.data);
    });
    api.catch((error) => {
      alert("error", "filled", "", error.response.data, () => {});
    });
  };

  const onSubmit = (data) => {
    Save(data);
  };

  return (
    <>
      <Row>
        <Colxx xxs="12" xl="12" className="mb-4">
          <Card>
            <CardBody>
              <form
                onSubmit={handleSubmit(onSubmit)}
                defaultValue={item}
                onKeyDown={(e) => {
                  if (e.keyCode == 13) e.preventDefault();
                }}
              >
                <>
                  <Row className="mb-2">
                    <Colxx sm="12" md="6" lg="4">
                      <Label className="form-group has-float-label">
                        <span>
                          <IntlMessages id="app.sale.product.sku" />
                        </span>
                        <Controller
                          name="productId"
                          control={control}
                          render={({ field }) => (
                            <Select
                              className="react-select"
                              classNamePrefix="react-select"
                              name="form-field-name"
                              {...field}
                              options={products.map((item) => {
                                return {
                                  value: item.id,
                                  key: item.id,
                                  label: item.sku,
                                };
                              })}
                              placeholder=""
                            />
                          )}
                        />

                        {errors.productId ? (
                          <div className="invalid-feedback d-block">
                            {errors.productId.message}
                          </div>
                        ) : null}
                      </Label>
                    </Colxx>
                    <Colxx sm="12" md="6" lg="8">
                      <Label className="form-group has-float-label">
                        <span>
                          <IntlMessages id="description" />
                        </span>
                        <Controller
                          name="description"
                          control={control}
                          render={({ field }) => <Input {...field} />}
                        />
                      </Label>
                    </Colxx>
                  </Row>
                  <Row>
                    <Colxx xs="12" md="4">
                      <Label className="form-group has-float-label">
                        <span>
                          <IntlMessages id="itemprice" />
                        </span>
                        <Controller
                          name="price"
                          control={control}
                          render={({ field }) => (
                            <Input type="number" {...field} />
                          )}
                        />
                        {errors.price ? (
                          <div className="invalid-feedback d-block">
                            {errors.price.message}
                          </div>
                        ) : null}
                      </Label>
                    </Colxx>
                    <Colxx xs="12" md="4">
                      <Label className="form-group has-float-label">
                        <span>
                          <IntlMessages id="profile.warehouse" />
                        </span>
                        <Controller
                          name="warehouseId"
                          control={control}
                          render={({ field }) => (
                            <Select
                              className="react-select"
                              classNamePrefix="react-select"
                              name="form-field-name"
                              {...field}
                              options={warehouses.map((item) => {
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

                        {errors.warehouseId ? (
                          <div className="invalid-feedback d-block">
                            {errors.warehouseId.message}
                          </div>
                        ) : null}
                      </Label>
                    </Colxx>
                    <Colxx xs="12" md="4">
                      <Label className="form-group has-float-label">
                        <span>
                          <IntlMessages id="count" />
                        </span>
                        <Controller
                          name="count"
                          control={control}
                          render={({ field }) => (
                            <Input type="number" {...field} />
                          )}
                        />
                        {errors.count ? (
                          <div className="invalid-feedback d-block">
                            {errors.count.message}
                          </div>
                        ) : null}
                      </Label>
                    </Colxx>
                  </Row>

                  <Row>
                    <Colxx xs="12" md="4">
                      <Label className="form-group has-float-label">
                        <span>
                          <IntlMessages id="status" />
                        </span>
                        <Controller
                          name="stateId"
                          control={control}
                          render={({ field }) => (
                            <Select
                              className="react-select"
                              classNamePrefix="react-select"
                              name="form-field-name"
                              {...field}
                              options={itemStates.map((item) => {
                                return {
                                  value: item.key,
                                  key: item.key,
                                  label: item.title,
                                };
                              })}
                              placeholder=""
                            />
                          )}
                        />

                        {errors.stateId ? (
                          <div className="invalid-feedback d-block">
                            {errors.stateId.message}
                          </div>
                        ) : null}
                      </Label>
                    </Colxx>
                  </Row>
                  <Colxx xxs="10">
                    <Button color="success">
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
  const prs = selectProducts(state, ["WP", "Service"]);
  const ws = selectWarehouse(state, ["warehouse"], "");
  const itemStates = selectItemTarget(state, "FactorItemService");
  return {
    warehouses: ws,
    products: prs,
    itemStates,
  };
};

export default injectIntl(connect(mapStateToProps, {})(SaleServiceEdit));
