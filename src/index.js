import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProvider } from '@mui/material/styles';
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { CategoryProvider } from "./Context APIs/categoryContext";
import { VendorProvider } from "./Context APIs/vendorContext";
import theme from './Styles/theme';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
    <VendorProvider>
      <CategoryProvider>      
        <CssBaseline />
        <App />
      </CategoryProvider>
      </VendorProvider>
    </ThemeProvider>
  </React.StrictMode>
);


