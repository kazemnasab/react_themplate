import * as React from "react";
import { injectIntl } from "react-intl";
import { connect, useSelector, useDispatch } from "react-redux";

import CustomContainerModal from "components/common/CustomContainerModal";
import MainDialogSwitcher from "./MainDialogSwitcher";

const MainDialog = (props) => {
  const { intl, page, isOpen, title } = props;
  return (
    <CustomContainerModal isOpen={isOpen} title={title} {...props}>
      <MainDialogSwitcher {...props} />
    </CustomContainerModal>
  );
};

const mapStateToProps = (state) => {
  return {
    ...state.dialogModal,
  };
};

export default injectIntl(connect(mapStateToProps, {})(MainDialog));
