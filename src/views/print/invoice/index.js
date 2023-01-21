import React from "react";
import { Routes, Route } from "react-router-dom";
import { setCurrentUser } from "helpers/Utils";
import { injectIntl } from "react-intl";

const Invoice = React.lazy(() =>
  import(/* webpackChunkName: "views-app" */ "./sale")
);

const Index = () => {
  return (
    <Routes>
      <Route path="/sale/:id" element={<Invoice />} />
    </Routes>
  );
};

export default injectIntl(Index);
