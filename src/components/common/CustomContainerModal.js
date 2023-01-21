import React from "react";
import { Modal, ModalHeader, ModalBody } from "reactstrap";
import IntlMessages from "helpers/IntlMessages";
import { injectIntl } from "react-intl";

const CustomContainerModal = ({ title, isOpen, toggle, children, size }) => {
  React.useEffect(() => {}, [isOpen]);
  return (
    <Modal isOpen={isOpen} toggle={toggle} size={size} backdrop="static">
      <ModalHeader toggle={toggle}>
        <IntlMessages id={title} />
      </ModalHeader>
      <ModalBody>{children}</ModalBody>
    </Modal>
  );
};
export default injectIntl(CustomContainerModal);
