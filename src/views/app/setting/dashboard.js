import React from "react";
import { Link } from "react-router-dom";
import { injectIntl } from "react-intl";
import Card from "components/dashboard/Card";
import Breadcrumb from "containers/TopNav/Breadcrumb";

const Index = ({ intl }) => {
  const { messages } = intl;
  return (
    <>
      <Breadcrumb
        breadcrumb={[
          "app.home",
          "app.setting.home",
        ]}
      />
      <div className="row">
        <h4 className="breadcrumb-wrapper">{messages["profile"]}</h4>
        <Card
          type="simple"
          title="profile.personel"
          icon="bx bx-user"
          url="/app/setting/profile/personel"
          className="col-xl-2 col-lg-2 col-md-4 col-sm-4 col-6 mb-4"
        />
        <Card
          type="simple"
          title="profile.agent"
          icon="bx bx-user"
          url="/app/setting/profile/agent"
          className="col-xl-2 col-lg-2 col-md-4 col-sm-4 col-6 mb-4"
        />
        <Card
          type="simple"
          title="profile.box"
          icon="bx bx-user"
          url="/app/setting/profile/box"
          className="col-xl-2 col-lg-2 col-md-4 col-sm-4 col-6 mb-4"
        />
        <Card
          type="simple"
          title="profile.bankaccount"
          icon="bx bx-user"
          url="/app/setting/profile/bankaccount"
          className="col-xl-2 col-lg-2 col-md-4 col-sm-4 col-6 mb-4"
        />
        <Card
          type="simple"
          title="profile.warehouse"
          icon="bx bx-user"
          url="/app/setting/profile/warehouse"
          className="col-xl-2 col-lg-2 col-md-4 col-sm-4 col-6 mb-4"
        />
      </div>
    </>
  );
};

export default injectIntl(Index);
