import React from "react";
import { Link } from "react-router-dom";
import { injectIntl } from "react-intl";
import Card from "components/dashboard/Card";
import Breadcrumb from "containers/TopNav/Breadcrumb";

const Index = ({ intl }) => {
  const { messages } = intl;
  return (
    <>
      <Breadcrumb breadcrumb={["app.home","app.agent.home"]}/>
      <div className="row">
        <Card
          type="simple"
          title="ثبت حامی"
          icon="bx bx-user"
          url="/app/donation/fund/new"
          className="col-xl-2 col-lg-2 col-md-4 col-sm-4 col-6 mb-4"
        />
        <Card
          type="simple"
          title="لیست حامی"
          icon="bx bx-donate-heart"
          iconClass="bg-label-info"
          url="/app/donation/fund"
          className="col-xl-2 col-lg-2 col-md-4 col-sm-4 col-6 mb-4"
        />
        <Card
          type="simple"
          title="گزارش"
          icon="bx bx-chart"
          iconClass="bg-label-primary"
          url="/app/donation/search"
          className="col-xl-2 col-lg-2 col-md-4 col-sm-4 col-6 mb-4"
        />
      </div>
      <div className="row">
        <Card
          type="simple"
          title="دریافت کمک"
          icon="bx bx-donate-heart"
          url="/app/donation/donate"
          className="col-xl-2 col-lg-2 col-md-4 col-sm-4 col-6 mb-4"
        />
        <Card
          type="simple"
          title="گزارش مالی"
          icon="bx bx-chart"
          iconClass="bg-label-info"
          url="/app/donation/donate/report"
          className="col-xl-2 col-lg-2 col-md-4 col-sm-4 col-6 mb-4"
        />
      </div>
    </>
  );
};

export default injectIntl(Index);
