import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import './index.css';
import App from './App';
import configureStore from './store';
import { ModalProvider, Modal } from './context/Modal';
import ProjectForm from './components/Projects/ProjectForm';
import { SearchModal, SearchModalProvider } from './context/SearchModal';
import { BrowserRouter } from 'react-router-dom';

const store = configureStore();

ReactDOM.render(
  <React.StrictMode>
    <ModalProvider>
      <BrowserRouter>
      <SearchModalProvider>
      <Provider store={store}>

        <App />
        
        {/* <ProjectForm/> */}
        <Modal />
        <SearchModal />
      </Provider>
      </SearchModalProvider>
      </BrowserRouter>
    </ModalProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
