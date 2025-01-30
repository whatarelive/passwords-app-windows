import { Outlet, useLocation } from "react-router";
import Navbar from "@/components/Navbar";

function AppLayout() {
  const { pathname } = useLocation();

  return (
    <main className="h-[761px] bg-[#1F1F21]">
      { pathname === "/" && <Navbar/> }
      <Outlet/>
    </main>
  )
}

export default AppLayout;