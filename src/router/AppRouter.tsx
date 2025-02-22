import { useEffect } from "react";
import { Navigate, Route, Routes } from "react-router";
import { useAuthStore } from "@/store/auth-store";
import AuthLayout from "@/layout/AuthLayout";
import AppLayout from "@/layout/AppLayout";

import LoginPage from "@/pages/auth/LoginPage";
import RegisterPage from "@/pages/auth/RegisterPage";
import ListAccountPage from "@/pages/app/webs/ListAccountPage";
import AddAccountPage from "@/pages/app/webs/AddAccountPage";
import EditAccountPage from "@/pages/app/webs/EditAccountPage";
import UserInfoPage from "@/pages/app/user/UserInfoPage";
import NotFoundPage from "@/pages/app/webs/NotFoundPage";

function AppRouter() {
  const { session, checkSession } = useAuthStore((state) => state);

  useEffect(() => {
    checkSession();
  }, [])

  return (
    <Routes>
      {
        session === null 
          ? (
            <Route path="/*" element={ <Navigate to="/auth/login"/> }/> 
          ) 
          : (
            <Route element={<AppLayout/>}>
              <Route path="user/:id" element={<UserInfoPage/>}/>
            
              <Route>
                <Route path="/" element={<ListAccountPage/>}/>
                <Route path="/add" element={<AddAccountPage/>}/>
                <Route path="/edit/:id" element={<EditAccountPage/>}/>
                <Route path="/edit/notfound" element={<NotFoundPage/>}/>
              </Route>
            </Route>    
          )
      }
      
      <Route element={<AuthLayout/>}>
        <Route path="/auth/login" element={<LoginPage/>}/>
        <Route path="/auth/register" element={<RegisterPage/>}/>  
      </Route>
    </Routes>
  )
}

export default AppRouter;