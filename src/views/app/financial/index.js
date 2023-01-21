import React, { Suspense, useEffect } from "react";
import {
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

const Home = React.lazy(() =>
  import(/* webpackChunkName: "views-app" */ "./dashboard")
);

const Pay = React.lazy(() =>
  import(/* webpackChunkName: "views-app" */ "./pay")
);

const Receive = React.lazy(() =>
  import(/* webpackChunkName: "views-app" */ "./receive")
);

function Index() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Routes>
        <Route path="/pay/*" element={<Pay />} />
        <Route path="/receive/*" element={<Receive />} />
        <Route path="/home" element={<Home />} />
        <Route path="/" element={<Navigate to="home" replace />} />
      </Routes>
    </Suspense>
  );
}

export default Index;
