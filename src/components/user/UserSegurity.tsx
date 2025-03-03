import { Form, Formik } from "formik";
import { useNavigate } from "react-router";
import { MdInfoOutline, MdOutlineSecurity } from "react-icons/md";
import { useAuthStore } from "@/store/auth-store";
import { useAccountsStore } from "@/store/accounts-store";
import { PasswordSchema } from "@/validations/user";
import { ButtonForm, ButtonFormReset } from "@/components/ui/buttons";
import { TextInput, TextInputWithPassword } from "@/components/ui/inputs";
import UserCardTitle from "@/components/user/UserCardTitle";

const UserSegurity = () => {
  const navigate = useNavigate();
  const logout = useAuthStore((state) => state.logout);
  const clearState = useAccountsStore((state) => state.clearState);

  const handleClick = async () => {
    clearState();
    await logout();
    navigate("/auth/register");
  }

  return (
    <div className="bg-secondary w-full h-[569px] rounded-xl">
       <UserCardTitle 
        title="Configuración de Seguridad" 
        subtitle="Gestiona tu contraseña y opciones de seguridad"
      />

      <div className="flex flex-col gap-4 bg-primary mx-4 mt-4 p-4 rounded-2xl">
        <h3 className="inline-flex items-center gap-2 text-xl font-bold">
          <MdOutlineSecurity size={22}/>
          Formulario de Actualización
        </h3>

        <Formik 
          initialValues={{ password: "", newPassword: "", confirmPassword: "" }}
          onSubmit={(values) => console.log(values)}
          validationSchema={PasswordSchema}
        >
          {() => (
            <Form>
              <TextInput 
                label="Contraseña actual" 
                name="password" 
                placeholder="Ingrese su contraseña"
              />
              
              <TextInputWithPassword 
                label="Nueva Contraseña" 
                name="newPassword" 
                placeholder="Ingrese su nueva contraseña"
              />
              
              <TextInputWithPassword 
                label="Confirmar Nueva Contraseña" 
                name="confirmPassword" 
                placeholder="Confirme su nueva contraseña" 
              />  

              <div className="flex gap-4 mt-5">
                <ButtonForm>
                  Actualizar Contraseña
                </ButtonForm>
                <ButtonFormReset>
                  Cancelar
                </ButtonFormReset>
              </div>
            </Form>
          )}
        </Formik>
      </div>

      <div className="flex items-center justify-center gap-2 mt-6">
        <MdInfoOutline size={20}/>
        
        <span>
          Si necesitas crear o cambiar de cuenta :
        </span>
        
        <button onClick={handleClick} className="cursor-pointer text-neutral-300 font-semibold hover:text-red-500">
          Registro de Usuario
        </button>
      </div>
    </div>
  )
}

export default UserSegurity;