import React from "react";
import { injectIntl } from "react-intl";
import {getCurrentUser} from 'helpers/Utils'

const Profile = ({ intl }) => {
  const currentUser = getCurrentUser();
  const { messages } = intl;
  React.useEffect(() => {
    //console.log(currentUser);
  }, []);
  return (
    <li className="nav-item navbar-dropdown dropdown-user dropdown">
      <a
        className="nav-link dropdown-toggle hide-arrow"
        data-bs-toggle="dropdown"
      >
        <div className="avatar avatar-online">
          <div className="rounded-circle bx bx-user" />
        </div>
      </a>
      <ul className="dropdown-menu dropdown-menu-end">
        <li>
          <a
            className="dropdown-item"
            href="pages-account-settings-account.html"
          >
            <div className="d-flex">
              <div className="flex-shrink-0 me-3">
                <div className="avatar avatar-online mt-1">
                  <div className="rounded-circle bx bx-user" />
                </div>
              </div>
              <div className="flex-grow-1">
                <span className="fw-semibold d-block">{currentUser.name}</span>
                <small>{currentUser.roleTitle}</small>
              </div>
            </div>
          </a>
        </li>
        <li>
          <div className="dropdown-divider"></div>
        </li>
        <li>
          <a className="dropdown-item" href="pages-profile-user.html">
            <i className="bx bx-user me-2"></i>
            <span className="align-middle">پروفایل من</span>
          </a>
        </li>
        <li>
          <a
            className="dropdown-item"
            href="pages-account-settings-account.html"
          >
            <i className="bx bx-cog me-2"></i>
            <span className="align-middle">تنظیمات</span>
          </a>
        </li>
        <li>
          <a
            className="dropdown-item"
            href="pages-account-settings-billing.html"
          >
            <span className="d-flex align-items-center align-middle">
              <i className="flex-shrink-0 bx bx-credit-card me-2"></i>
              <span className="flex-grow-1 align-middle">صورتحساب</span>
              <span className="flex-shrink-0 badge badge-center rounded-pill bg-danger w-px-20 h-px-20">
                4
              </span>
            </span>
          </a>
        </li>
        <li>
          <div className="dropdown-divider"></div>
        </li>
        <li>
          <a
            className="dropdown-item"
            href="/user"
          >
            <i className="bx bx-power-off me-2"></i>
            <span className="align-middle">خروج</span>
          </a>
        </li>
      </ul>
    </li>
  );
};
export default injectIntl(Profile);
