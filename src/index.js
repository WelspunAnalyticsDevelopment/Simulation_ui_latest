import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { PrimeReactProvider, PrimeReactContext } from 'primereact/api';
import "primereact/resources/themes/saga-blue/theme.css";
import { MsalProvider } from '@azure/msal-react';
import { PublicClientApplication } from '@azure/msal-browser';

import "./themes/theme.css"

const msalConfig = {
  auth: {
      // 'Application (client) ID' of app registration in Azure portal - this value is a GUID
      clientId: "46dcec68-473f-4c91-9f27-7c5ea6eb34ce",
      // Full directory URL, in the form of https://login.microsoftonline.com/<tenant-id>
      authority: "https://login.microsoftonline.com/" + "5b4308bc-4f16-4e8d-aab0-26cc3b6f4bec",
      // Full redirect URL, in form of http://localhost:3000
      redirectUri: "http://localhost:44300/Dashboard",
  },
  cache: {
      cacheLocation: "sessionStorage", // This configures where your cache will be stored
      storeAuthStateInCookie: false, // Set this to "true" if you are having issues on IE11 or Edge
  }}


const msalInstance = new PublicClientApplication(msalConfig);


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(

    <PrimeReactProvider>
      
        <App msalInstance={msalInstance}/>
      
    </PrimeReactProvider>
 
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
