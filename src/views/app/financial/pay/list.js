import { Colxx, Separator } from "components/bootstrap/CustomBootstrap";
import IntlMessages from "helpers/IntlMessages";
import React from "react";
import { injectIntl } from "react-intl";
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

import Box from "@mui/material/Box";
import { DataGrid } from "@mui/x-data-grid";

import CustomNoRowsOverlay from "components/common/CustomNoRowsOverlay";
import CustomDataGrid from "components/common/CustomDataGrid";
import Breadcrumb from "containers/TopNav/Breadcrumb";



const rows = [/*{
  id:12,
  firstName:"محمد",
  lastName:"کاظم نسب",
  mobile:"09119054436",
  address:"تهران هفت تیر"
},*/];


const Index = ({ intl }) => {
  const [selectedOption, setSelectedOption] = React.useState(null);
  const [formState, setFormState] = React.useState(false);
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
      width: 150,
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
      width: 200
    },
    {
      field: "rout",
      headerName: messages["donation.fund.rout"],
      sortable: false,
      width: 200
    },
  ];
  React.useEffect(() => { }, []);
  const [modal, setModal] = React.useState(false);
  const [unmountOnClose, setUnmountOnClose] = React.useState(true);

  const toggle = () => setModal(!modal);
  const changeUnmountOnClose = (e) => {
    let { value } = e.target;
    setUnmountOnClose(JSON.parse(value));
  };
  React.useEffect(() => {
    const handler = (event) => {
      event.preventDefault();
      event.returnValue = "";
    };
    // if the form is NOT unchanged, then set the onbeforeunload
    if (formState) {
      window.addEventListener("beforeunload", handler);
      // clean it up, if the dirty state changes
      return () => {
        window.removeEventListener("beforeunload", handler);
      };
    }
    // since this is not dirty, don't do anything
    return () => { };
  }, [formState]);

  return (
    <div>
      <Breadcrumb breadcrumb={["app.home","app.donation.home", "donation.fund.list"]}/>
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
              rows={rows}
              columns={columns}
              pagination
              rowsPerPageOptions={[5]}
              pageSize={5}
              checkboxSelection
              disableSelectionOnClick
              experimentalFeatures={{ newEditingApi: true }}
            />
        </CardBody>
      </Card>
    </div>
  );
};
export default injectIntl(Index);
