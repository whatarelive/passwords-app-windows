import { NavLink } from "react-router";
import { TextInput, TextInputWithPassword } from "@/components/ui/inputs";

function LoginPage() {
  return (
    <section className="flex flex-col justify-center w-[340px] mb-12">
      <div className="flex flex-col items-center mb-12">
        <img src="/password.svg" alt="Logo" className="w-16 h-16" />
        <h1 className="text-green-500 font-bold text-2xl">
          Password Manager
        </h1>
      </div>

      <div className="mb-8">
        <h2 className="text-3xl text-center font-semibold text-green-400">
          Bienvenido de Nuevo
        </h2>
        <p className="text-gray-200 text-center">
          Inicie sesión para acceder a tu información
        </p>
      </div>

      <form action="">
        <TextInput label="Usuario" name="user" placeholder="Ingrese su nombre de usuario"/>
        <TextInputWithPassword label="Contraseña" name="password" placeholder="Ingrese su contraseña"/>

        <button 
          type="submit"
          className="w-full h-10 text-white bg-green-500 hover:bg-green-400 font-bold rounded-md mt-5 transition-all" >
          Iniciar Sesión
        </button>
      </form>

      <div className="flex flex-col items-center mt-12">
        <b>¿ No tienes una cuenta ?</b>
        <NavLink 
          to="/auth/register"
          className="underline hover:text-green-300">
          Crear una cuenta
        </NavLink>
      </div>
    </section>
  )
}
  
export default LoginPage;