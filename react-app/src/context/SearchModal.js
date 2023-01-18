import React, { useRef, useState, useContext, useHistory } from 'react';
import ReactDOM from 'react-dom';
import './SearchModal.css';
import { Link } from 'react-router-dom';

const SearchModalContext = React.createContext();

export function SearchModalProvider({ children }) {
  const searchModalRef = useRef();
  const [modalContent, setModalContent] = useState(null);
  // callback function that will be called when modal is closing
  const [onModalClose, setOnModalClose] = useState(null);

  const closeModal = () => {
    setModalContent(null); // clear the modal contents
    // If callback function is truthy, call the callback function and reset it
    // to null:
    if (typeof onModalClose === 'function') {
      setOnModalClose(null);
      onModalClose();
    }
  };

  const contextValue = {
    searchModalRef, // reference to modal div
    modalContent, // React component to render inside modal
    setModalContent, // function to set the React component to render inside modal
    setOnModalClose, // function to set the callback function called when modal is closing
    closeModal // function to close the modal
  };

  return (
    <>
      <SearchModalContext.Provider value={contextValue}>
        {children}
      </SearchModalContext.Provider>
      <div ref={searchModalRef} />
    </>
  );
}

export function SearchModal() {
  const { searchModalRef, modalContent, closeModal } = useContext(SearchModalContext);
  // If there is no div referenced by the modalRef or modalContent is not a
  // truthy value, render nothing:
  if (!searchModalRef || !searchModalRef.current || !modalContent) return null;

  // Render the following component to the div referenced by the modalRef
  return ReactDOM.createPortal(
    <div id="searchmodal">
      {/* <div id="searchmodal-background" onClick={closeModal} /> */}
      <div id="searchmodal-content">
        {modalContent}
      </div>
    </div>,
    searchModalRef.current
  );
}

export const useSearchModal = () => useContext(SearchModalContext);