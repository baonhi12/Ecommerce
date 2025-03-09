import React from 'react'
import { Modal } from 'antd';
import { HiOutlineInformationCircle } from "react-icons/hi";

const CustomModal = (props) => {
  const { open, hideModal, performAction, title } = props;
  return (
    <Modal
        title="Confirmation"
        open={open}
        onOk={performAction}
        onCancel={hideModal}
        okText="OK"
        cancelText="Cancel"
      >
        <p>{title}</p>
      </Modal>
  )
}

export default CustomModal