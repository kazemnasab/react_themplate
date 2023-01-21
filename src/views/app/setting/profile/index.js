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
        <Route path="/personel" element={<List target="personel" />} />
        <Route path="/agent" element={<List target="agent" />} />
        <Route path="/customer" element={<List target="customer" />} />
        <Route path="/bankaccount" element={<List target="bankaccount" />} />
        <Route path="/box" element={<List target="box" />} />
        <Route path="/warehouse" element={<List target="warehouse" />} />
        <Route path="/list" element={<List />} />
        <Route path="/list/:state" element={<List />} />
        <Route path="/new" element={<CreateOrUpdate />} />
        <Route path="/:id" element={<CreateOrUpdate />} />
        <Route path="/" element={<Navigate to="list" replace />} />
      </Routes>
    </React.Suspense>
  );
}

export default Index;
