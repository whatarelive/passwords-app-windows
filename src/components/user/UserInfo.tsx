import { Form, Formik } from 'formik';
import { MdAdminPanelSettings, MdLockPerson, MdSupervisedUserCircle } from "react-icons/md";
import UserCardTitle from "@/components/user/UserCardTitle";
import { TextInput, TextInputWithPassword } from "@/components/ui/inputs";
import { useAuthStore } from '@/store/auth-store';
import { useAccountsStore } from '@/store/accounts-store';

const UserInfo = () => {
  const deleteUser = useAuthStore((state) => state.deleteUser);
  const { accounts, deleteAllAccount, clearState } = useAccountsStore();

  return (
    <div className="bg-secondary w-full h-[569px] rounded-xl">
      <UserCardTitle 
        title="Información Personal" 
        subtitle="Gestiona tu información personal y de contacto"
      />

      <div className="bg-primary mx-4 mt-3 p-4 rounded-2xl">
        <h3 className="inline-flex items-center mb-1 gap-2 text-xl font-bold">
          <MdAdminPanelSettings size={22}/>
          Información de la Sesión
        </h3>

        <Formik initialValues={{ name: "Livan Rodriguez", password: "asdfads8gasdgafd888dfad88888" }} onSubmit={() => {}}>
          {() => (
            <Form>
              <TextInput label="Usuario" name="name" classContainer="h-auto" disabled/>
              <TextInputWithPassword label="Contraseña" name="password" classContainer="h-auto" disabled/>
            </Form>
          )}
        </Formik>
      </div>

      <div className="flex flex-col bg-primary mx-4 mt-4 p-4 rounded-2xl">
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

      <div className="bg-primary mx-4 mt-4 p-4 rounded-2xl">
        <h3 className="inline-flex items-center mb-2 gap-2 text-xl font-bold">
          <MdLockPerson size={22}/>
          Acciones
        </h3>

        <div className="inline-flex gap-4 w-full justify-between">
          <button 
            onClick={async () => {
              clearState();
              await deleteUser();
            }}
            className="w-full p-2 rounded-md font-medium bg-red-500 hover:bg-white hover:text-red-500 cursor-pointer"
          >
            Eliminar Usuario
          </button>
          
          <button
            onClick={async () => await deleteAllAccount()} 
            disabled={!accounts || accounts.length === 0}
            className={`w-full p-2 rounded-md font-medium bg-orange-500 hover:bg-white hover:text-orange-500 
              cursor-pointer disabled:bg-neutral-300 disabled:text-neutral-600 disabled:cursor-not-allowed`}
          >
            Eliminar todas las cuentas
          </button>
        </div>
      </div>     
    </div>
  )
}

export default UserInfo;