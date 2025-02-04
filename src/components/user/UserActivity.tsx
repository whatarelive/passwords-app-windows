import UserCardTitle from "./UserCardTitle";
import { mockActivity } from '../../data/mockData';
import UserActivityElement from "./UserActivityElement";

const UserActivity = () => {
  return (
    <div className="flex flex-col bg-[#3b3b3e] w-full h-[560px] rounded-xl">
      <UserCardTitle 
        title="Registro de Actividad" 
        subtitle="Historial de acciones recientes en tu cuenta"
      />

      <ul className="">
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