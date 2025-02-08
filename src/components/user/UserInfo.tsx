import { MdAdminPanelSettings, MdLockPerson, MdSupervisedUserCircle } from "react-icons/md";
import UserCardTitle from "@/components/user/UserCardTitle";
import { TextInput, TextInputWithPassword } from "@/components/ui/inputs";

const UserInfo = () => {
  return (
    <div className="bg-[#3b3b3e] w-full h-[569px] rounded-xl">
      <UserCardTitle 
        title="Información Personal" 
        subtitle="Gestiona tu información personal y de contacto"
      />

      <div className="bg-[#1F1F21] mx-4 mt-3 p-4 rounded-2xl">
        <h3 className="inline-flex items-center mb-1 gap-2 text-xl font-bold">
          <MdAdminPanelSettings size={22}/>
          Información de la Sesión
        </h3>

        <TextInput label="Usuario" name="user" defaultValue={"Jose Luis"} disabled/>
        <TextInputWithPassword label="Contraseña" name="password" defaultValue={"asdfads8gasdgafd888dfad88888"} disabled/>
      </div>

      <div className="flex flex-col bg-[#1F1F21] mx-4 mt-2 p-4 rounded-2xl">
        <h3 className="inline-flex items-center mb-1 gap-2 text-xl font-bold">
          <MdSupervisedUserCircle size={22}/>
          Resumen de la Sesión del Usuario
        </h3>

        <div className="inline-flex justify-between">
          <p className="font-medium">Total de cuentas :</p>
          <span className="font-medium">12</span>
        </div>

        <div className="inline-flex justify-between">
          <p className="font-medium">Ultima cuenta agregada :</p>
          <span className="font-medium">2023-04-28 15:45</span>
        </div>
      </div> 

      <div className="bg-[#1F1F21] mx-4 mt-2 p-4 rounded-2xl">
        <h3 className="inline-flex items-center mb-2 gap-2 text-xl font-bold">
          <MdLockPerson size={22}/>
          Acciones
        </h3>

        <div className="inline-flex gap-4 w-full justify-between">
          <button className="w-full p-2 rounded-md font-medium bg-red-500 hover:bg-red-600 hover:cursor-pointer">
            Eliminar Usuario
          </button>
          
          <button className="w-full p-2 rounded-md font-medium bg-orange-500 hover:bg-orange-600 hover:cursor-pointer">
            Eliminar todas las cuentas
          </button>
        </div>
      </div>     
    </div>
  )
}

export default UserInfo;