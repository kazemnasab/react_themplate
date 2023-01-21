import { Colxx, Separator } from "components/bootstrap/CustomBootstrap";
import IntlMessages from "helpers/IntlMessages";
import React from "react";
import { injectIntl } from "react-intl";
import { connect } from "react-redux";
import { selectItemsSearch } from "redux/profile/selector";
import {
  Row,
  Card,
  CardBody,
  Input,
  Label,
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "reactstrap";

import CustomDataGrid from "components/common/CustomDataGrid";
import Breadcrumb from "containers/TopNav/Breadcrumb";

const rows = [
  /*{
  id:12,
  firstName:"محمد",
  lastName:"کاظم نسب",
  mobile:"09119054436",
  address:"تهران هفت تیر"
},*/
];

const Index = ({ intl, target, profiles }) => {
  const [selectedItem, setSelectedItem] = React.useState({});
  const { messages } = intl;
  const columns = [
    {
      field: "firstName",
      headerName: messages["profile.firstname"],
      width: 150,
      editable: true,
    },
    {
      field: "lastName",
      headerName: messages["profile.lastname"],
      width: 180,
      editable: true,
    },
    {
      field: "mobile",
      headerName: messages["profile.mobile"],
      type: "number",
      width: 110,
      editable: true,
    },
    {
      field: "address",
      headerName: messages["profile.address"],
      sortable: false,
      width: 200,
    },
  ];
  React.useEffect(() => {}, []);
  const [modal, setModal] = React.useState(false);
  const [unmountOnClose, setUnmountOnClose] = React.useState(true);

  const toggle = () => setModal(!modal);
  const changeUnmountOnClose = (e) => {
    let { value } = e.target;
    setUnmountOnClose(JSON.parse(value));
  };

  return (
    <div>
      <Breadcrumb
        breadcrumb={[
          "app.home",
          "profile",
          `profile.${target}`
        ]}
      />
      <Card>
        <CardBody>
          <Row className="mb-4">
            <Colxx sm="12" md="12" lg="12">
              <Button onClick={toggle} color="info">
                جدید
              </Button>{" "}
              <Button onClick={toggle} color="info">
                عملیات گروهی
              </Button>{" "}
              <Button color="dark">خروجی اکسل</Button>{" "}
              <Button color="danger">حذف</Button>{" "}
            </Colxx>
          </Row>
          <Modal isOpen={modal} toggle={toggle} unmountOnClose={unmountOnClose}>
            <ModalHeader toggle={toggle}>Modal title</ModalHeader>
            <ModalBody>
              <Input
                value={selectedItem.firstName}
                onChange={(e) => {
                  setSelectedItem({
                    ...selectedItem,
                    firstName: e.target.value,
                  });
                }}
                type="textarea"
                placeholder="Write something (data should remain in modal if unmountOnClose is set to false)"
                rows={5}
              />
            </ModalBody>
            <ModalFooter>
              <Button color="primary" onClick={toggle}>
                Do Something
              </Button>{" "}
              <Button color="secondary" onClick={toggle}>
                Cancel
              </Button>
            </ModalFooter>
          </Modal>
          <CustomDataGrid
            rows={profiles}
            columns={columns}
            pagination
            onRowDoubleClick={(row) => {
              setSelectedItem(row);
              toggle();
            }}
            rowsPerPageOptions={[5]}
            pageSize={20}
            checkboxSelection
            disableSelectionOnClick
            experimentalFeatures={{ newEditingApi: true }}
          />
        </CardBody>
      </Card>
    </div>
  );
};

const mapStateToProps = (state, { target }) => {
  const profiles = selectItemsSearch(state, [target], (m) => true);
  return {
    profiles,
  };
};

export default injectIntl(connect(mapStateToProps, {})(Index));
