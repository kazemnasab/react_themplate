import React from "react";
import { Routes, Route } from "react-router-dom";
import { injectIntl } from "react-intl";

const Invoice = React.lazy(() =>
  import(/* webpackChunkName: "views-app" */ "./invoice")
);

const Index = ({ intl }) => {
  React.useEffect(() => {
    window.print();
  }, []);
  return (
    <Routes>
      <Route path="/invoice/*" element={<Invoice />} />
    </Routes>
  );
};

export default injectIntl(Index);
