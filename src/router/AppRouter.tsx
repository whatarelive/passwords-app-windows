import { useEffect } from "react";
import { Navigate, Route, Routes, useNavigate } from "react-router";
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
  const navigate = useNavigate();
  const { userId, checkSession } = useAuthStore((state) => state);

  useEffect(() => {
    const interval = setInterval(() => {
      checkSession().then();
      
      if (!userId) navigate('/');

    }, 3600);

    return () => clearInterval(interval);
  }, []);

  return (
    <Routes>
      {
        userId !== null 
          ? (
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
          : (
            <Route path="/*" element={<Navigate to="/auth/login"/>}/>
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