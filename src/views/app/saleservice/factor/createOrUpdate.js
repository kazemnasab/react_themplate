import IntlMessages from "helpers/IntlMessages";
import React from "react";
import { injectIntl } from "react-intl";
import {
  Card,
  CardBody,
} from "reactstrap";

import Panel from "containers/saleservice/kardex/Panel";
import Breadcrumb from "containers/TopNav/Breadcrumb";


const Index = ({ intl }) => {
  const [formState, setFormState] = React.useState(false);
  const { messages } = intl;


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
      <Breadcrumb breadcrumb={["app.home","app.saleservice.home","app.saleservice.sheet.kardex"]}/>
      <Card>
        <CardBody>
          <Panel />
        </CardBody>
      </Card>
    </div>
  );
};
export default injectIntl(Index);
