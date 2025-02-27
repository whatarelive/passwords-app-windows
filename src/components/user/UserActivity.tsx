import { useEffect } from "react";
import { ImFilesEmpty } from "react-icons/im";
import { useAuthStore } from '@/store/auth-store';
import UserCardTitle from "@/components/user/UserCardTitle";
import UserActivityElement from "@/components/user/UserActivityElement";

import "@/styles/scrollbar-style.css";

const UserActivity = () => {
  const { userActivities, getUserActivities } = useAuthStore();

  useEffect(() => {
    getUserActivities();
  }, []);

  return (
    <div className="flex flex-col bg-secondary w-full h-[569px] rounded-xl">
      <UserCardTitle 
        title="Registro de Actividad" 
        subtitle="Historial de acciones recientes en tu cuenta"
      />

      {
        userActivities 
          ? (
            <ul className="px-5 space-y-3 mt-5">
              {
                userActivities!.map((activity) => (
                  <li key={activity.id}>
                    <UserActivityElement activity={activity}/>
                  </li>
                ))
              }
            </ul>
          )
          : (
            <div className="flex flex-col items-center">
              <ImFilesEmpty className="w-32 h-32 mt-28 opacity-40"/>
                      
              <h1 className="text-xl font-semibold mt-5">
                No hay información que mostrar
              </h1>

              <p className="text-center mt-2">         
                No tienes ninguna actividad registrada a esta cuenta.
              </p>
            </div>
          )
      }
    </div>
  )
}

export default UserActivity;