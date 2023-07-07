import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import GlobalStyles from "./components/GlobalStyles";

const rootElement = document.getElementById("root");

ReactDOM.createRoot(rootElement).render(
    <>
    <GlobalStyles />
    <App/>
    </>
);



