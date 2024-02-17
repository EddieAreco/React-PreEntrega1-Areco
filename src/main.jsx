import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { NextUIProvider } from '@nextui-org/react';
import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyBDkmRgF-1C3unQ5H4UppECa0cSSsT36kQ",
  authDomain: "proyecto-react-4a7d4.firebaseapp.com",
  projectId: "proyecto-react-4a7d4",
  storageBucket: "proyecto-react-4a7d4.appspot.com",
  messagingSenderId: "994153772588",
  appId: "1:994153772588:web:5cb8c90b898224a1374389"
};

const app = initializeApp(firebaseConfig);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <NextUIProvider>
      <App />
    </NextUIProvider>
  </React.StrictMode>,
)
