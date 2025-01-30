import { useState } from "react";
import { NavLink } from "react-router";
import { MdVisibility, MdVisibilityOff } from "react-icons/md";

function RegisterPage() {
  const [viewPass, setViewPass] = useState(false);

  const handleClick = () => setViewPass(!viewPass);

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
        <div className="flex flex-col mb-4">
          <label className="font-semibold mb-1" htmlFor="user">
            Usuario
          </label>
          <input 
            id="user"
            name="user"
            type="text" 
            placeholder="Ingrese su nombre de usuario"
            className="p-2 border border-neutral-400 rounded-md bg-transparent focus-visible:border-white focus-visible:outline-none"
          />
        </div>

        <div className="flex flex-col mb-4">
          <label className="font-semibold mb-1" htmlFor="password">
            Contraseña
          </label>
          <div className="inline-flex border rounded-md border-neutral-400 focus-within:border-white">
            <input 
              id="password"
              name="password"
              type={viewPass ? "text" : "password"} 
              max={15}
              placeholder="Ingrese su contraseña"
              className="p-2 w-full rounded-md bg-transparent focus-visible:outline-none"
            />
            <i className="flex items-center justify-center w-12">
              { 
                !viewPass 
                  ? <MdVisibility size={24} onClick={handleClick}/> 
                  : <MdVisibilityOff size={24} onClick={handleClick}/> 
              }
            </i>
          </div>
        </div>

        <div className="flex flex-col mb-2">
          <label className="font-semibold mb-1" htmlFor="password">
            Confirmar contraseña
          </label>
          <div className="inline-flex border rounded-md border-neutral-400 focus-within:border-white">
            <input 
              id="password"
              name="password"
              type={viewPass ? "text" : "password"} 
              max={15}
              placeholder="Ingrese su nueva contraseña"
              className="p-2 w-full rounded-md bg-transparent focus-visible:outline-none"
            />
            <i className="flex items-center justify-center w-12">
              { 
                !viewPass 
                  ? <MdVisibility size={24} onClick={handleClick}/> 
                  : <MdVisibilityOff size={24} onClick={handleClick}/> 
              }
            </i>
          </div>
        </div>

        <button 
          type="submit"
          className="w-full h-10 text-white bg-green-500 hover:bg-green-400 font-bold rounded-md mt-5 transition-all" >
          Crear cuenta
        </button>
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