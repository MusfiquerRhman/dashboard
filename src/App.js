import Grid from "@mui/material/Grid";
import { SnackbarProvider } from "notistack";
import React, { useContext, useEffect } from "react";
import { BrowserRouter, Redirect, Route, Routes } from "react-router-dom";
import * as categoriesAPI from "./API/category";
import * as subCategoriesAPI from "./API/subcategory";
import * as userAPI from './API/user';
import * as vendorsAPI from "./API/vendors";
import "./App.css";
import Sidebar from "./Components/Sidebar/Sidebar";
import { CategoryContext } from "./Context APIs/categoryContext";
import { SubCategoryContext } from "./Context APIs/subcategoriesContext";
import { UserProvider } from "./Context APIs/userContext";
import { VendorContext } from "./Context APIs/vendorContext";
import Category from "./Pages/category/Category";
import Cupons from "./Pages/cupons/cupons";
import ForgotPassword from "./Pages/forgotPassword/ForgotPassword";
import Login from "./Pages/login/Login";
import DrawerAppBar from "./Pages/navbar/NavBar";
import Profile from "./Pages/profile/Profile";
import Registration from "./Pages/Registration/Registration";
import Users from "./Pages/users/Users";
import Vendor from "./Pages/vendors/Vendors";

const handleLogOut = async () => {
  userAPI.logout();
  localStorage.removeItem('userInformations');
  localStorage.removeItem('last_login');
  window.location.reload();
}

function App() {
  const { setVendors } = useContext(VendorContext);
  const { setCategoryies } = useContext(CategoryContext);
  const { setSubCategories } = useContext(SubCategoryContext);
  let isLoggedin = localStorage.getItem('userInformations') !== null;


  // Logout after 6 hours
  // If the user closes the window
  if(isLoggedin){
    if(new Date().getTime() - localStorage.getItem('last_login') > 21600000){ // 6 Hours
      handleLogOut();
    }
  }

  // If the user dose not closes the window
  useEffect(() => {
    const timer =  setTimeout(()=> {
      handleLogOut();
      window.location.reload();
    }, 21600000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    vendorsAPI.getAllVendors().then((result) => {
      setVendors(result.data);
    });
  }, [setVendors]);

  useEffect(() => {
    categoriesAPI.getAllCategory().then((result) => {
      setCategoryies(result.data);
    });
  }, [setCategoryies]);

  useEffect(() => {
    subCategoriesAPI.getAllSubCategory().then((result) => {
      setSubCategories(result.data);
    });
  }, [setSubCategories]);

  return (
    <BrowserRouter>
      <UserProvider>
        <SnackbarProvider maxSnack={2}>
          <Grid container direction="column">
          <Grid item>
            </Grid>
            {isLoggedin &&
            <Sidebar>
            <DrawerAppBar />
            <Grid item  justifyContent={"center"} sx={{width: '100%'}}>
                <Routes>
                  <Route exact path="/" element={isLoggedin ? <Cupons /> : <Login />} />
                  <Route exact path="/vendors" element={isLoggedin ? <Vendor /> : <Login />} />
                  <Route exact path="/login" element={isLoggedin ?  <Cupons /> : <Login />} />
                  <Route exact path="/category" element={isLoggedin ? <Category /> : <Login />} />
                  <Route exact path="/users" element={isLoggedin ? <Users /> : <Login />} />
                  <Route exact path="/profile" element={isLoggedin ? <Profile /> : <Login />} />
                </Routes>
              </Grid>
            </Sidebar>
            }
            {!isLoggedin && 
            <Routes>
              <Route exact path="/" element={isLoggedin ? <Cupons /> : <Login />} />
              <Route exact path="/registration" element={<Registration />} />
              <Route exact path="/forgotpassword" element={<ForgotPassword />} />
              <Route exact path="*" element={<Login />} />
            </Routes>
            }
          </Grid>
        </SnackbarProvider>
      </UserProvider>
    </BrowserRouter>
  );
}

export default App;
