import React from "react";
import {
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

const Home = React.lazy(() =>
  import(/* webpackChunkName: "views-app" */ "./dashboard")
);


const Profile = React.lazy(() =>
  import(/* webpackChunkName: "views-app" */ "./profile")
);


function Index() {
  return (
    <React.Suspense fallback={<div>Loading...</div>}>
      <Routes>
        <Route path="/profile/*" element={<Profile />} />
        <Route path="/home" element={<Home />} />
        <Route path="/" element={<Navigate to="home" replace />} />
      </Routes>
    </React.Suspense>
  );
}

export default Index;
