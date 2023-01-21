import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";

const List = React.lazy(() =>
  import(/* webpackChunkName: "views-app" */ "./list")
);

const CreateOrUpdate = React.lazy(() =>
  import(/* webpackChunkName: "views-app" */ "./createOrUpdate")
);

function Index() {
  return (
    <React.Suspense fallback={<div>Loading...</div>}>
      <Routes>
        <Route
          path="/orderfactor/new"
          element={<CreateOrUpdate target="orderfactor" />}
        />
        <Route path="/orderfactor" element={<List  target="orderfactor" stateId="1"/>} />
        <Route path="/factor" element={<List  target="factor"/>} stateId="5"/>
        <Route path="/list/:state" element={<List stateId="3"/>} />
        <Route path="/:id" element={<CreateOrUpdate />} />
      </Routes>
    </React.Suspense>
  );
}

export default Index;
