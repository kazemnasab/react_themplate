/* eslint-disable no-shadow */
/* eslint-disable no-unused-vars */
import React, { useEffect } from "react";
import { Formik, Form, Field } from "formik";
import { Row, Card, CardBody, FormGroup, Label, Button } from "reactstrap";
import { Colxx } from "components/bootstrap/CustomBootstrap";
import IntlMessages from "helpers/IntlMessages";
import { connect, useDispatch } from "react-redux";
import { selectItemsSearch } from "redux/productcategory/selector";
import AsyncSelect from "components/async/AsyncSelect";
import * as Api from "api/core";
import { addProfileItemSuccess } from "redux/actions";
import * as Yup from "yup";

const SignupSchema = Yup.object().shape({
  firstname: Yup.string().required("نام وارد نشده"),
  mobile: Yup.string().required("شماره همراه وارد نشده"),
});

const CreateOrUpdateCustomer = ({
  profile,
  target,
  provinces,
  onCallBack,
}) => {
  const dispatch = useDispatch();
  const onSubmit = (values, { setSubmitting }) => {
    const account = {
      id: values.id,
      code: values.mobile,
      stateId: values.stateId,
      firstname: values.firstname,
      lastname: values.lastname,
      target: "Customer",
      genericAttributes: [
        { value: values.tel, typeId: 2 },
        { value: values.mobile, typeId: 3 },
        { value: values.address, typeId: 1 },
        { value: values.province.value + "", typeId: 5 },
        { Value: values.city.value + "", TypeId: 6 },
      ],
    };
    //console.log(values);
    //console.log(account);
    return;
    var api = Api.api_post("Profile", account);
    api.then((res) => {
      //console.log(res);
      dispatch(addProfileItemSuccess(res.data));
      onCallBack(res.data);
    });
    api.catch(function (error) {
      alert(error.response.data);
    });
  };
  useEffect(() => {}, []);

  return (
    <Formik
      initialValues={profile ? profile : { id: 0, target: target, stateId: 10 }}
      validationSchema={SignupSchema}
      onSubmit={onSubmit}
    >
      {({
        handleSubmit,
        setFieldValue,
        setFieldTouched,
        handleChange,
        handleBlur,
        values,
        errors,
        touched,
        isSubmitting,
      }) => (
        <Form className="col-sm-12">
          <Row>
            <Colxx sm="12" md="6" lg="6">
              <Label className="form-group has-float-label">
                <span>
                  <IntlMessages id="profile.firstname" />
                </span>
                <Field className="form-control" name="firstname" />
                {errors.firstname && touched.firstname ? (
                  <div className="invalid-feedback d-block">{errors.firstname}</div>
                ) : null}
              </Label>
            </Colxx>
            <Colxx sm="12" md="6" lg="6">
              <Label className="form-group has-float-label">
                <span>
                  <IntlMessages id="profile.lastname" />
                </span>
                <Field className="form-control" name="lastname" />
              </Label>
            </Colxx>
          </Row>
          <Row>
            <Colxx sm="12" md="6" lg="6">
              <Label className="form-group has-float-label">
                <span>
                  <IntlMessages id="profile.mobile" />
                </span>
                <Field className="form-control" name="mobile" />

                {errors.mobile && touched.mobile ? (
                  <div className="invalid-feedback d-block">
                    {errors.mobile}
                  </div>
                ) : null}
              </Label>
            </Colxx>
            <Colxx sm="12" md="6" lg="6">
              <Label className="form-group has-float-label">
                <span>
                  <IntlMessages id="profile.tel" />
                </span>
                <Field className="form-control" name="tel" />
              </Label>
            </Colxx>
          </Row>
          <Row>
            <Colxx sm="12" md="6" lg="6">
              <Label className="form-group has-float-label">
                <span>
                  <IntlMessages id="profile.province" />
                </span>
                <AsyncSelect
                  url={`Location?parrent=0`}
                  onChange={setFieldValue}
                  value={values.province}
                  name="province"
                  optionsGetter={(res) => {
                    return res.map((item) => {
                      return {
                        value: item.id,
                        key: item.id,
                        label: item.name,
                      };
                    });
                  }}
                />
              </Label>
            </Colxx>
            <Colxx sm="12" md="6" lg="6">
              <Label className="form-group has-float-label">
                <span>
                  <IntlMessages id="profile.city" />
                </span>
                <AsyncSelect
                  url={`Location?parrent=${
                    values.province ? values.province.key : -1
                  }`}
                  onChange={setFieldValue}
                  value={values.city}
                  name="city"
                  optionsGetter={(res) => {
                    return res.map((item) => {
                      return {
                        value: item.id,
                        key: item.id,
                        label: item.name,
                      };
                    });
                  }}
                />
              </Label>
            </Colxx>
          </Row>
          <Row>
            <Colxx sm="12" md="12" lg="12">
              <Label className="form-group has-float-label">
                <span>
                  <IntlMessages id="profile.address" />
                </span>
                <Field className="form-control" name="address" />
              </Label>
            </Colxx>
          </Row>
          <FormGroup className="error-l-100">
            <Button type="submit" color="info">
              <IntlMessages id="submit.change.customer" />
            </Button>
            {"     "}
            <Button
              color="danger"
              onClick={() => {
                onCallBack(null);
              }}
            >
              <IntlMessages id="cancel.change" />
            </Button>
          </FormGroup>
        </Form>
      )}
    </Formik>
  );
};

const mapStateToProps = (state) => {
  const items = selectItemsSearch(state, "");
  return {
    provinces: items,
  };
};

export default connect(mapStateToProps, null)(CreateOrUpdateCustomer);
