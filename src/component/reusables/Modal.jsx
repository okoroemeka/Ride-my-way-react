import React from 'react';
import PropType from 'prop-types';
import './modal.scss';

const Modal = ({ children }) => <div className="modal__container">{children}</div>;

Modal.propTypes = {
  children: PropType.element.isRequired,
};
export default Modal;
