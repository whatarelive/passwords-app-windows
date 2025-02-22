import { Form, Formik } from "formik";
import { NavLink } from "react-router";
import { useAuthStore } from "@/store/auth-store";
import { LoginSchema } from "@/validations/auth";
import { ButtonForm } from "@/components/ui/buttons";
import { TextInput, TextInputWithPassword } from "@/components/ui/inputs";
import ErrorModal from "@/components/global/ErrorModal";
import SucessModal from "@/components/global/SucessModal";

function LoginPage() {
  const { view, message, login, disableView } = useAuthStore();

  return (
    <>
      { 
        view === "ERROR" && (
          <ErrorModal title="Error de Inicio de Sesión" message={message!} disableView={disableView}/>
        )
      }
      {
        view === "SUCESS" && (
          <SucessModal title="Inicio de Sesión exitoso" message={message!} disableView={disableView}/>
        )
      }

      <section className="flex flex-col justify-center w-[340px] mb-12">
        <div className="flex flex-col items-center mb-6">
          <img src="/password.svg" alt="Logo" className="w-16 h-16" />
          <h1 className="text-green-500 font-bold text-2xl">
            Password Manager
          </h1>
        </div>

        <div className="mb-8">
          <h2 className="text-3xl text-center font-semibold text-green-500">
            Bienvenido de Nuevo
          </h2>
          <p className="text-gray-200 text-center">
            Inicie sesión para acceder a tu información
          </p>
        </div>

        <Formik
          initialValues={{ name: "", password: "" }}
          onSubmit={async({ name, password }) => await login(name, password)}
          validationSchema={LoginSchema}
        >
          {() => (
            <Form>
              <TextInput label="Usuario" name="name" placeholder="Ingrese su nombre de usuario"/>
              <TextInputWithPassword label="Contraseña" name="password" placeholder="Ingrese su contraseña"/>
      
              <ButtonForm children="Iniciar Sesión" className="text-lg mt-3"/>
            </Form>
          )}
        </Formik>

        <div className="flex flex-col items-center mt-12">
          <b>¿ No tienes una cuenta ?</b>
          <NavLink 
            to="/auth/register"
            className="underline hover:text-green-300">
            Crear una cuenta
          </NavLink>
        </div>
      </section>
    </>
  )
}
  
export default LoginPage;