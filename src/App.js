import React from "react";
import { Routes, Route, Outlet } from "react-router-dom";
import { AppNavBars } from "./App.navbars";
import { Home, Login, ResetPassword, Signup, VerifyOtp,ForgotPassword } from "./Organism";
import { AppRoutes } from "./routes";
import { PublicPage } from "./routes/publicPages";
import { PrivatePages } from "./routes/privatePage";
import { AppRedux } from "./redux";
import { RequireAuth } from "./auth";

function App() {
  return (
  
    < AppRedux>
   <Routes>
  {/* Public routes without AppNavBars */}
  <Route element={<PublicPage><Outlet /></PublicPage>}>
    <Route path={AppRoutes.signUp} element={<Signup />} />
    <Route path={AppRoutes.login} element={<Login />} />
    <Route path={AppRoutes.verifyOtp} element={<VerifyOtp />} />
    <Route path={AppRoutes.forgotPassword} element={<ForgotPassword />} />
    <Route path={AppRoutes.resetPassword} element={<ResetPassword />} />
  </Route>

  {/* Private routes wrapped in AppNavBars */}
  <Route element={<AppNavBars><Outlet /></AppNavBars>}>
    {PrivatePages.map((res) => (
      <Route key={res.path} path={res.path} element={<RequireAuth>{res.element}</RequireAuth>} />
    ))}
  </Route>
</Routes>

    </AppRedux>
  );
}

export default App;
