import { useNavigate } from "react-router";
import { MdInfoOutline, MdOutlineSecurity } from "react-icons/md";
import { ButtonForm } from "@/components/ui/buttons";
import { TextInput, TextInputWithPassword } from "@/components/ui/inputs";
import UserCardTitle from "@/components/user/UserCardTitle";

const UserSegurity = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/auth/register');
  }

  return (
    <div className="bg-[#3b3b3e] w-full h-[569px] rounded-xl">
       <UserCardTitle 
        title="Configuración de Seguridad" 
        subtitle="Gestiona tu contraseña y opciones de seguridad"
      />

      <div className="flex flex-col gap-4 bg-[#1F1F21] mx-4 mt-4 p-4 rounded-2xl">
        <h3 className="inline-flex items-center gap-2 text-xl font-bold">
          <MdOutlineSecurity size={22}/>
          Formulario de Actualización
        </h3>

        <form action="">
          <TextInput label="Contraseña actual" name="password" placeholder="Ingrese su contraseña"/>
          <TextInputWithPassword label="Nueva Contraseña" name="newPassword" placeholder="Ingrese su nueva contraseña"/>
          <TextInputWithPassword label="Confirmar Nueva Contraseña" name="confirmPassword" placeholder="Confirme su nueva contraseña" />

          <ButtonForm
            children="Actualizar Contraseña" 
            className="mt-2"
          />
        </form>

        <div className="flex flex-col items-center gap-1 mt-2">
          <p className="inline-flex items-center gap-3 font-medium">
            <MdInfoOutline size={22}/>
            Si necesitas crear o cambiar de cuenta 
          </p>

          <button onClick={handleClick} className="max-w-fit px-5 cursor-pointer text-neutral-300 font-semibold hover:text-red-500 rounded-md">
            Ir al Registro de Usuario
          </button>
        </div>
      </div>
    </div>
  )
}

export default UserSegurity;