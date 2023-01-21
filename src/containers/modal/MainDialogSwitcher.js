import * as React from "react";
import { injectIntl } from "react-intl";
import SaleServiceEdit from "containers/saleservice/sheet/SaleServiceEdit";
import PayEdit from "containers/financial/pay/Edit";
import ReceiveEdit from "containers/financial/receive/Edit";

const MainDialogSwitcher = (props) => {
  const { intl, page, isOpen, title, onSaved } = props;
  //console.log(props);
  if (page == "SaleServiceEdit")
    return <SaleServiceEdit {...props} onSaved={onSaved} />;
  if (page == "PayEdit") return <PayEdit {...props} onSaved={onSaved} />;
  if (page == "ReceiveEdit") return <ReceiveEdit {...props} onSaved={onSaved} />;
  return <></>;
};

export default injectIntl(MainDialogSwitcher);
