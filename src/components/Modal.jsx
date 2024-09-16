import React from 'react';
import "../styles/Modal.css"; 

const Modal = ({ title, onClose, onSave, children }) => {
  return (
    <div className="modal-overlay">
      <div className="modal-container">
        <header className="modal-header">
          <h2>{title}</h2>
          <button className="close-btn" onClick={onClose}>×</button>
        </header>
        <div className="modal-body">
          {children}
        </div>
        <footer className="modal-footer">
          <button className="save-btn" onClick={onSave}>Save</button>
          <button className="cancel-btn" onClick={onClose}>Cancel</button>
        </footer>
      </div>
    </div>
  );
};

export default Modal;
