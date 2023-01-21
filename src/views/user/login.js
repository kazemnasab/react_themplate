import React from "react";
import Login from "containers/Auth/Login.js"
import { injectIntl } from "react-intl";

const Index = ({ intl }) => {
  const { messages } = intl;
  React.useEffect(() => {
    document.title = messages["app.name"];
  }, []);

  return (
    <div className="authentication-wrapper authentication-cover">
      <div className="authentication-inner row m-0">
        <div className="d-none d-lg-flex col-lg-7 col-xl-8 align-items-center">
          <div className="flex-row text-center mx-auto">
            <img
              src="../../assets/img/pages/login1.png"
              alt="Auth Cover Bg color"
              width="520"
              className="img-fluid authentication-cover-img"
              data-app-light-img="pages/login.png"
              data-app-dark-img="pages/login.png"
            />
            <div className="mx-auto">
              <h3>قدرتمندترین قالب مدیریت را کشف کنید</h3>
              <p>
                کاملا مناسب برای هر سطح از گزارشات که به شما کمک می‌کند{" "}
                <br />
                تا پروژه و برنامه بزرگ بعدی خود را شروع کنید.
              </p>
            </div>
          </div>
        </div>
        <Login />
      </div>
    </div>
  );
}
export default injectIntl(Index);
