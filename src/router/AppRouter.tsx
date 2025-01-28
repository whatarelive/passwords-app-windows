import { Route, Routes } from "react-router";
import AuthLayout from "@/layout/AuthLayout";
import AppLayout from "@/layout/AppLayout";

import LoginPage from "@/pages/auth/LoginPage";
import RegisterPage from "@/pages/auth/RegisterPage";
import HomePage from "@/pages/app/HomePage";

function AppRouter() {
  return (
    <Routes>
      <Route element={<AuthLayout/>}>
        <Route path="/auth/login" element={<LoginPage/>}/>
        <Route path="/auth/register" element={<RegisterPage/>}/>
      </Route>
        <Route element={<AppLayout/>}>
        <Route path="/" element={<HomePage/>}/>
      </Route>
    </Routes>
  )
}

export default AppRouter;