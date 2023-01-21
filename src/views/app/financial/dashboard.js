import React from "react";
import { injectIntl } from "react-intl";
import urls from "./dashboard_items";
import Dashboard from "containers/dashboard/dashboard";
import Breadcrumb from "containers/TopNav/Breadcrumb";

const Index = ({ intl }) => {
  return (
    <>
      <Breadcrumb breadcrumb={["app.home", "app.financial.home"]} />
      <Dashboard urls={urls} />
    </>
  );
};

export default injectIntl(Index);
