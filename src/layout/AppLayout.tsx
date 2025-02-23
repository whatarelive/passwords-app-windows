import { Outlet, useLocation } from "react-router";
import { Navbar } from "@/components/global/Navbar";

function AppLayout() {
  const { pathname } = useLocation();

  return (
    <main className="h-[761px] bg-primary">
      { pathname !== "/edit/notfound" && <Navbar/>}
      <Outlet/>
    </main>
  )
}

export default AppLayout;