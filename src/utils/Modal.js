import React, { useState, useEffect, useRef } from "react";
import ReactDOM from "react-dom";

// Modal component that renders a modal dialog
const Modal = ({ isOpen, onClose, children }) => {
  // State to track whether the component is rendered in a browser environment
  const [isBrowser, setIsBrowser] = useState(false);

  // Reference to the modal DOM element
  const modalRef = useRef(null);

  // Effect to set isBrowser to true on component mount
  useEffect(() => {
    setIsBrowser(true);
  }, []);

  // Effect to handle clicks outside the modal to close it
  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        onClose();
      }
    };

    // Add or remove event listener based on modal state
    if (isOpen) {
      document.addEventListener("mousedown", handleOutsideClick);
    } else {
      document.removeEventListener("mousedown", handleOutsideClick);
    }

    // Cleanup function to remove the event listener when modal unmounts or closes
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [isOpen, onClose]);

  // Render modal content using ReactDOM.createPortal
  const modalContent =
    isOpen &&
    isBrowser &&
    ReactDOM.createPortal(
      <div className="fixed inset-0 flex items-center justify-center">
        <div className="absolute inset-0 bg-black opacity-60"></div>
        <div ref={modalRef} className="z-50 w-screen h-screen rounded-md flex items-center justify-center">
          {children}
        </div>
      </div>,
      document.body
    );

  // Render the modal content if in a browser environment, otherwise return null
  return isBrowser ? modalContent : null;
};

export default Modal;
