import { Outlet, useLocation } from "react-router";
import { Navbar } from "@/components/global/Navbar";
import { useNotificationStore } from "@/store/notidication-store";

function AppLayout() {
  const { pathname } = useLocation();
  const { isView, notification } = useNotificationStore();

  return (
    <main className="h-[761px] bg-primary">
      { 
        pathname !== "/edit/notfound" && <Navbar/>
      }

      {
        isView && (
          <div className="fixed z-10 bottom-4 right-4 p-4 font-semibold rounded-md bg-green-600 transition-all animate-bounce">
            { notification }
          </div>
        )
      }

      <Outlet/>
    </main>
  )
}

export default AppLayout;