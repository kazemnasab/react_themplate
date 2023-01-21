import React from "react";
import ShortcutCard from "./Shortcuts.Card";

import * as Icons from "svgdir/index";


export default function Shortcuts() {
  return (
    <li className="nav-item dropdown-shortcuts navbar-dropdown dropdown me-2 me-xl-0">
      <a
        className="nav-link dropdown-toggle hide-arrow"
        data-bs-toggle="dropdown"
        data-bs-auto-close="outside"
        aria-expanded="false"
      >
        <i className="bx bx-grid-alt bx-sm"></i>
      </a>
      <div className="dropdown-menu dropdown-menu-end py-0">
        <div className="dropdown-menu-header border-bottom">
          <div className="dropdown-header d-flex align-items-center py-3">
            <h5 className="text-body mb-0 me-auto secondary-font">برنامه ها</h5>
            <a
              className="dropdown-shortcuts-add text-body hide"
              data-bs-toggle="tooltip"
              data-bs-placement="top"
              title="افزودن میانبر"
            >
              <i className="bx bx-sm bx-plus-circle"></i>
            </a>
          </div>
        </div>
        <div className="dropdown-shortcuts-list scrollable-container">
          <div className="row row-bordered overflow-visible g-0">
            <ShortcutCard
              SvgIcon={Icons.saleServiceIcon()}
              title="خدمات پس از فروش"
              description="خدمات پس از فروش"
              url="saleservice"
              iconClass="px-calendar"
            />
            <ShortcutCard
              SvgIcon={Icons.financialIcon()}
              title="امور مالی"
              description="امور مالی"
              url="financial"
              iconClass="bx-food-menu"
            />
          </div>
          <div className="row row-bordered overflow-visible g-0">
            <ShortcutCard
              SvgIcon={Icons.settingIcon()}
              title="برنامه تنظیمات"
              description="مدیریت تنظیمات"
              url="setting"
              iconClass="px-cog "
            />
            <ShortcutCard
              SvgIcon={Icons.customerServiceIcon()}
              title="برنامه مشتریان"
              description="مدیریت مشتریان"
              url="customer"
              iconClass="bx-food-menu"
            />
          </div>
        </div>
      </div>
    </li>
  );
}
