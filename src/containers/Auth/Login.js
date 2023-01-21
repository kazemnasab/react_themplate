import React from "react";
import { injectIntl } from "react-intl";
import { currentUser } from "constants/defaultValues";
import { setCurrentUser } from "helpers/Utils";

const Index = ({ intl }) => {
  const { messages } = intl;
  const clickLogin = () => {
    setCurrentUser(currentUser).then(() => {
      window.location.href="/app"
    });
  };

  return (
    <div className="d-flex col-12 col-lg-5 col-xl-4 align-items-center authentication-bg p-sm-5 p-4">
      <div className="w-px-400 mx-auto">
        <div className="app-brand mb-4">
          <div className="app-brand-link gap-2 mb-2">
            <span className="app-brand-logo demo"></span>
            <span className="app-brand-text demo h3 mb-0 fw-bold">
              {messages["app.name"]}
            </span>
          </div>
        </div>
        <p className="mb-4">{messages["user.login.title"]}</p>

        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            {messages["user.login.name_or_mobile"]}
          </label>
          <input
            type="text"
            className="form-control text-start"
            dir="ltr"
            id="email"
            name="email-username"
            placeholder={messages["user.login.placeholder"]}
            autoFocus
          />
        </div>
        <div className="mb-3 form-password-toggle">
          <div className="d-flex justify-content-between">
            <label className="form-label" htmlFor="password">
              {messages["user.login.password"]}
            </label>
            <a href="#">
              <small>{messages["user.login.forgot-password"]}</small>
            </a>
          </div>
          <div className="input-group input-group-merge">
            <input
              type="password"
              id="password"
              className="form-control text-start"
              dir="ltr"
              name="password"
              placeholder="············"
              aria-describedby="password"
            />
            <span className="input-group-text cursor-pointer">
              <i className="bx bx-hide"></i>
            </span>
          </div>
        </div>
        <div className="mb-3">
          <div className="form-check">
            <input
              className="form-check-input"
              type="checkbox"
              id="remember-me"
            />
            <label className="form-check-label" htmlFor="remember-me">
              {" "}
              {messages["user.login.remember-password"]}{" "}
            </label>
          </div>
        </div>
        <button onClick={clickLogin} className="btn btn-primary d-grid w-100">
          {messages["user.login.button"]}
        </button>
      </div>
    </div>
  );
};

export default injectIntl(Index);
