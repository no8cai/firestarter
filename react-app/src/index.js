import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import './index.css';
import App from './App';
import configureStore from './store';
import { ModalProvider, Modal } from './context/Modal';
import ProjectForm from './components/Projects/ProjectForm';
import { SearchModal, SearchModalProvider } from './context/SearchModal';

const store = configureStore();

ReactDOM.render(
  <React.StrictMode>
    <ModalProvider>
      <SearchModalProvider>
      <Provider store={store}>
        <App />
        {/* <ProjectForm/> */}
        <Modal />
        <SearchModal />
      </Provider>
      </SearchModalProvider>
    </ModalProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
