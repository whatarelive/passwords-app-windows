import { NavLink } from "react-router";
import { TextInput, TextInputWithPassword } from "@/components/ui/inputs";
import { ButtonForm } from "@/components/ui/buttons";

function RegisterPage() {
  return (
    <section className="flex flex-col justify-center w-[340px] mb-12">
      <div className="mb-8">
        <h1 className="text-3xl text-center font-semibold text-green-400">
          Registrar Cuenta 
        </h1>
        <p className="text-gray-200 text-center">
          Cree su nueva cuenta para getionar sus contraseñas
        </p>
      </div>

      <form action="">
        <TextInput label="Usuario" name="user" placeholder="Ingrese su nombre de usuario"/>
        <TextInputWithPassword label="Contraseña" name="password" placeholder="Ingrese su contraseña"/>
        <TextInputWithPassword label="Confirmar Contraseña" name="passwordConfirm" placeholder="Ingrese su nueva contraseña"/>

        <ButtonForm children="Crear cuenta" className="text-lg mt-3"/>
      </form>

      <div className="flex flex-col items-center mt-12">
        <b>¿ Ya tienes una cuenta ?</b>
        <NavLink 
          to="/auth/login"
          className="underline hover:text-green-300">
          Iniciar sesión
        </NavLink>
      </div>
    </section>
  )
}
  
  export default RegisterPage;