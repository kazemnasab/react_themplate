import React from "react";
import { injectIntl } from "react-intl";
import EditCheque from "./EditCheque";
import EditOther from "./EditOther";

const PayEdit = (props) => {
  if (props.typeId == 5) return <EditCheque {...props} />;
  return <EditOther {...props} />;
};

export default injectIntl(PayEdit);
