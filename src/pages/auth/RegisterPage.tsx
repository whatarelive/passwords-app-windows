import { Formik, Form } from "formik";
import { NavLink } from "react-router";
import { useAuthStore } from "@/store/auth-store";
import { RegisterSchema } from '@/validations/auth';
import { ButtonForm } from "@/components/ui/buttons";
import { TextInput, TextInputWithPassword } from "@/components/ui/inputs";
import ErrorModal from "@/components/global/ErrorModal";
import SucessModal from "@/components/global/SucessModal";

function RegisterPage() {
  const { view, message, register, disableView } = useAuthStore();

  return (
    <>
      { 
        view === "ERROR" && (
          <ErrorModal title="Error de Registro" message={message!} disableView={disableView}/>
        )
      }
      {
        view === "SUCESS" && (
          <SucessModal title="Inicio de Sesión exitoso" message={message!} disableView={disableView}/>
        )
      }

      <section className="flex flex-col justify-center w-[340px] mb-12">
        <div className="mb-8">
          <h1 className="text-3xl text-center font-semibold text-green-400">
            Registrar Cuenta 
          </h1>
          <p className="text-gray-200 text-center">
            Cree su nueva cuenta para getionar sus contraseñas
          </p>
        </div>

        <Formik
            initialValues={{ name: "", password: "", confirmPassword: "" }}
            onSubmit={async({ name, password }) => await register(name, password)}
            validationSchema={RegisterSchema}
        >
            {() => (
                <Form>
                    <TextInput 
                        label="Usuario" 
                        name="name" 
                        placeholder="Ingrese su nombre de usuario"
                    />

                    <TextInputWithPassword 
                        label="Contraseña" 
                        name="password" 
                        placeholder="Ingrese su contraseña"
                    />
                    
                    <TextInputWithPassword 
                        label="Confirmar Contraseña" 
                        name="confirmPassword" 
                        placeholder="Ingrese su nueva contraseña"
                    />
                    
                    <ButtonForm children="Crear cuenta" className="text-lg mt-3"/>
                </Form>
            )}
        </Formik>

        <div className="flex flex-col items-center mt-12">
          <b>¿ Ya tienes una cuenta ?</b>
          <NavLink 
            to="/auth/login"
            className="underline hover:text-green-300">
            Iniciar sesión
          </NavLink>
        </div>
      </section>
    </>
  )
}
  
  export default RegisterPage;