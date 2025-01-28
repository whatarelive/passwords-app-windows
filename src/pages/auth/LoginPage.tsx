import { useState } from "react";
import { NavLink } from "react-router";
import { MdVisibility, MdVisibilityOff } from "react-icons/md";

function LoginPage() {
  const [viewPass, setViewPass] = useState(false);

  const handleClick = () => {
    setViewPass(!viewPass);
  }

  return (
    <section className="w-[340px]">
      <div className="flex flex-col items-center mb-12">
        <img src="/password.svg" alt="Logo" className="w-16 h-16" />
        <h1 className="text-green-600 font-bold text-2xl">
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
        <div className="flex flex-col mb-4">
          <label className="font-semibold mb-1" htmlFor="user">
            Usuario
          </label>
          <input 
            id="user"
            name="user"
            type="text" 
            placeholder="Pepe Colon"
            className="p-2 border border-gray-200 rounded-md bg-transparent focus-visible:border-green-400 focus-visible:outline-none"
          />
        </div>

        <div className="flex flex-col mb-2">
          <label className="font-semibold mb-1" htmlFor="password">
            Contraseña
          </label>
          <div className="inline-flex border rounded-md border-gray-200 focus-within:border-green-400">
            <input 
              id="password"
              name="password"
              type={viewPass ? "text" : "password"} 
              max={15}
              className="p-2 w-full rounded-md bg-transparent focus-visible:outline-none"
            />
            <i className="flex items-center justify-center w-12">
              { 
                viewPass 
                  ? <MdVisibility size={24} onClick={handleClick}/> 
                  : <MdVisibilityOff size={24} onClick={handleClick}/> 
              }
            </i>
          </div>
        </div>

        <button 
          type="submit"
          className="w-full h-10 text-white bg-green-500 hover:bg-green-400 font-bold rounded-md mt-5" >
          Iniciar Sessión
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