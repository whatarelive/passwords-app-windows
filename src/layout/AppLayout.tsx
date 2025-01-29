import { Outlet } from "react-router";
import Navbar from "@/components/Navbar";

function AppLayout() {
  return (
    <main className="h-[761px] bg-[#1F1F21]">
      <Navbar/>
      <Outlet/>
    </main>
  )
}

export default AppLayout;