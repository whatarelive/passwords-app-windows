import { Outlet } from "react-router";
import { Navbar } from "@/components/global/Navbar";

function AppLayout() {
  return (
    <main className="h-[761px] bg-primary">
      <Navbar/>
      <Outlet/>
    </main>
  )
}

export default AppLayout;