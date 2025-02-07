import { mockActivity } from '@/data/mockData';
import UserCardTitle from "@/components/user/UserCardTitle";
import UserActivityElement from "@/components/user/UserActivityElement";

const UserActivity = () => {
  return (
    <div className="flex flex-col bg-[#3b3b3e] w-full h-[560px] rounded-xl">
      <UserCardTitle 
        title="Registro de Actividad" 
        subtitle="Historial de acciones recientes en tu cuenta"
      />

      <ul className="px-5 space-y-3 mt-5">
        {
          mockActivity.map((activity) => (
            <li key={activity.id}>
              <UserActivityElement activity={activity}/>
            </li>
          ))
        }
      </ul>
    </div>
  )
}

export default UserActivity;