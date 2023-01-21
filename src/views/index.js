import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { getCurrentUser } from "helpers/Utils";
import { connect } from "react-redux";
import {
  getProfileList,
  getProductCategoryList,
  getProductList,
  getFailureList,
  getSettingList,
  getStatusList,
} from "redux/actions";

const Home = React.lazy(() =>
  import(/* webpackChunkName: "views-app" */ "./app/index")
);

const User = React.lazy(() =>
  import(/* webpackChunkName: "views-app" */ "./user/index")
);

const Print = React.lazy(() =>
  import(/* webpackChunkName: "views-app" */ "./print/index")
);

function Index({
  getProfileListAction,
  getProductCategoryListAction,
  getProductListAction,
  getFailureListAction,
  getSettingListAction,
  getStatusListAction,
}) {
  const currentUser = getCurrentUser();
  React.useEffect(() => {
    //console.log(currentUser);
    getProfileListAction();
    getProductCategoryListAction();
    getProductListAction();
    getFailureListAction();
    getSettingListAction();
    getStatusListAction();
  }, []);

  return (
    <React.Suspense fallback={<div>Loading...</div>}>
      <Routes>
        {currentUser && <Route path="/app/*" element={<Home />} />}
        {currentUser && <Route path="/print/*" element={<Print />} />}
        <Route path="/*" element={<Navigate to="/user" replace />} />
        <Route path="/user/*" element={<User />} />
      </Routes>
    </React.Suspense>
  );
}

export default connect(null, {
  getProfileListAction: getProfileList,
  getProductCategoryListAction: getProductCategoryList,
  getProductListAction: getProductList,
  getFailureListAction: getFailureList,
  getSettingListAction: getSettingList,
  getStatusListAction: getStatusList,
})(Index);
