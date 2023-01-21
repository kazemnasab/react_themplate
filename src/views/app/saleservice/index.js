import React, { Suspense, useEffect } from "react";
import {
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

const Home = React.lazy(() =>
  import(/* webpackChunkName: "views-app" */ "./dashboard")
);

const Sheet = React.lazy(() =>
  import(/* webpackChunkName: "views-app" */ "./sheet")
);

const Ordersegmant = React.lazy(() =>
  import(/* webpackChunkName: "views-app" */ "./ordersegmant")
);

const Kardex = React.lazy(() =>
  import(/* webpackChunkName: "views-app" */ "./kardex")
);
const Action = React.lazy(() =>
  import(/* webpackChunkName: "views-app" */ "./action")
);
const Factor = React.lazy(() =>
  import(/* webpackChunkName: "views-app" */ "./factor")
);
function Index() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Routes>
        <Route path="/ordersegmant/*" element={<Ordersegmant />} />
        <Route path="/sheet/*" element={<Sheet />} />
        <Route path="/kardex/*" element={<Kardex />} />
        <Route path="/action/*" element={<Action />} />
        <Route path="/factor/*" element={<Factor />} />
        <Route path="/home" element={<Home />} />
        <Route path="/" element={<Navigate to="home" replace />} />
      </Routes>
    </Suspense>
  );
}

export default Index;
