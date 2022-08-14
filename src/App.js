import Grid from "@mui/material/Grid";
import { SnackbarProvider } from "notistack";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import { UserProvider } from "./Context APIs/userContext";
import { VendorProvider } from "./Context APIs/vendorContext";
import ForgotPassword from "./Pages/forgotPassword/ForgotPassword";
import Login from "./Pages/login/Login";
import DrawerAppBar from "./Pages/navbar/NavBar";
import Registration from "./Pages/Registration/Registration";
import Vendor from "./Pages/vendors/Vendors";

function App() {
  return (
    <BrowserRouter>
      <UserProvider>
        <VendorProvider>
          <SnackbarProvider maxSnack={2}>
            <Grid container direction="column">
              <Grid item><DrawerAppBar/></Grid>
              <Grid item container justifyContent={"center"}>
                <Grid item xs={12} sm={10} lg={8}>
                  <Routes>
                    <Route exact path="/" element={<Vendor />} />
                    <Route exact path="/login" element={<Login />} />
                    <Route exact path="/registration" element={<Registration />} />
                    <Route exact path="/forgotpassword" element={<ForgotPassword />}/>
                  </Routes>
                </Grid>
              </Grid>
            </Grid>
          </SnackbarProvider>
        </VendorProvider>
      </UserProvider>
    </BrowserRouter>
  );
}

export default App;
