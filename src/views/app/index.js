import React, { Suspense, useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import AppLayout from "../../layout/AppLayout";

const SaleServiceHome = React.lazy(() =>
  import(/* webpackChunkName: "views-app" */ "./saleservice/index")
);

const FinancialHome = React.lazy(() =>
  import(/* webpackChunkName: "views-app" */ "./financial/index")
);

const SettingHome = React.lazy(() =>
  import(/* webpackChunkName: "views-app" */ "./setting/index")
);

const CustomerHome = React.lazy(() =>
  import(/* webpackChunkName: "views-app" */ "./customer/index")
);


function Index() {
  return (
    <AppLayout>
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route path="/financial/*" element={<FinancialHome />} />
          <Route path="/setting/*" element={<SettingHome />} />
          <Route path="/customer/*" element={<CustomerHome />} />
          <Route path="/saleservice/*" element={<SaleServiceHome />} />
          <Route
            path="/"
            element={<Navigate to="/app/saleservice/home" replace />}
          />
        </Routes>
      </Suspense>
    </AppLayout>
  );
}

export default Index;
