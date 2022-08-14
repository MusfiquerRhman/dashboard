import Grid from "@mui/material/Grid";
import { SnackbarProvider } from "notistack";
import React, { useContext, useEffect } from 'react';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import * as categoriesAPI from './API/category';
import * as vendorsAPI from './API/vendors';
import "./App.css";
import { CategoryContext } from './Context APIs/categoryContext';
import { UserProvider } from "./Context APIs/userContext";
import { VendorContext } from './Context APIs/vendorContext';
import Category from "./Pages/category/Category";
import Cupons from "./Pages/cupons/cupons";
import ForgotPassword from "./Pages/forgotPassword/ForgotPassword";
import Login from "./Pages/login/Login";
import DrawerAppBar from "./Pages/navbar/NavBar";
import Registration from "./Pages/Registration/Registration";
import Vendor from "./Pages/vendors/Vendors";

function App() {
  const { setVendors } = useContext(VendorContext);
  const {setCategoryies} = useContext(CategoryContext);

  useEffect(() => {
    vendorsAPI.getAllVendors().then(result => {
        setVendors(result.data);
    });
  }, [setVendors]);

  useEffect(() => {
    categoriesAPI.getAllCategory().then(result => {
      setCategoryies(result.data);
    });
  }, [setCategoryies]);

  return (
    <BrowserRouter>
      <UserProvider>
        <SnackbarProvider maxSnack={2}>
          <Grid container direction="column">
            <Grid item><DrawerAppBar/></Grid>
            <Grid item container justifyContent={"center"}>
              <Grid item xs={12} sm={10} lg={8}>
                <Routes>
                  <Route exact path="/" element={<Cupons />} />
                  <Route exact path="/vendors" element={<Vendor />} />
                  <Route exact path="/login" element={<Login />} />
                  <Route exact path="/registration" element={<Registration />} />
                  <Route exact path="/forgotpassword" element={<ForgotPassword />}/>
                  <Route exact path="/category" element={<Category />}/>
                </Routes>
              </Grid>
            </Grid>
          </Grid>
        </SnackbarProvider>
      </UserProvider>
    </BrowserRouter>
  );
}

export default App;
