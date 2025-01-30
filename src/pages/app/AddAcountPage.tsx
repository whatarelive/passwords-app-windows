import clsx from "clsx";
import { useState } from "react";
import { NavLink, useNavigate } from "react-router";
import { MdVisibility, MdVisibilityOff, MdArrowBack, MdRefresh } from "react-icons/md";

function AddAcountPage() {
  const [viewPass, setViewPass] = useState(false);
  const [rangePass, setRangePass] = useState(15);
  const [specialCaract, setSpecialCaract] = useState(false);
  const navigate = useNavigate();

  const handleClick = () => setViewPass(!viewPass);
  const handleCreateRandomPassword = () => {}

  return (
    <section className="px-8 py-10">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-semibold">
          Agregar Nueva Cuenta
        </h1>

        <NavLink 
          to="/" 
          className="inline-flex gap-1 cursor-pointer text-neutral-400 hover:text-white p-1.5 rounded font-medium"
        >
            <MdArrowBack size={24}/>
            Regresar
        </NavLink>
      </div>

      <form action="">
        <div className="flex flex-col mb-4">
          <label className="font-semibold mb-1" htmlFor="webName">
            Sitio web
          </label>
          <input 
            id="webName"
            name="webName"
            type="text" 
            placeholder="Ingrese el nombre del sitio web"
            className="p-2 border border-neutral-400 rounded-md bg-transparent focus-visible:border-white focus-visible:outline-none"
          />
        </div>

        <div className="flex flex-col mb-4">
          <label className="font-semibold mb-1" htmlFor="webUrl">
            Url
          </label>
          <input 
            id="webUrl"
            name="webUrl"
            type="url" 
            placeholder="Ingrese la url del sitio web"
            className="p-2 border border-neutral-400 rounded-md bg-transparent focus-visible:border-white focus-visible:outline-none"
          />
        </div>

        <div className="flex flex-col mb-4">
          <label className="font-semibold mb-1" htmlFor="webUser">
            Usuario
          </label>
          <input 
            id="webUser"
            name="webUser"
            type="text" 
            placeholder="Ingrese su nombre de usuario"
            className="p-2 border border-neutral-400 rounded-md bg-transparent focus-visible:border-white focus-visible:outline-none"
          />
        </div>

        <div className="flex flex-col mb-2">
          <label className="font-semibold mb-1" htmlFor="webPassword">
            Contraseña
          </label>
          <div className="flex gap-3">
            <div className="flex w-full border rounded-md border-neutral-400 focus-within:border-white">
              <input 
                id="password"
                name="password"
                type={viewPass ? "text" : "password"} 
                placeholder="Ingrese su contraseña"
                className="p-2 w-full rounded-md bg-transparent focus-visible:outline-none"
                />
              <i className="flex items-center cursor-pointer justify-center w-12">
                { 
                  !viewPass 
                    ? <MdVisibility size={24} onClick={handleClick}/> 
                    : <MdVisibilityOff size={24} onClick={handleClick}/> 
                }
              </i>
            </div>

            <button 
              onClick={handleCreateRandomPassword}
              className={`px-2 rounded border cursor-pointer border-neutral-400 text-neutral-400 
              hover:bg-white hover:border-white hover:text-[#19191c]`}
            >
              <MdRefresh size={20}/>
            </button>
          </div>
        </div>

        <div className="flex flex-col mb-2">
          <label htmlFor="passwordlarge" className="font-semibold mb-1">
            Longitud de caracteres: { rangePass }
          </label>
          <input 
            type="range" 
            name="passwordlarge" 
            id="passwordlarge"
            value={rangePass}
            max={25}
            min={8}
            onChange={(e) => setRangePass(Number(e.target.value))}
          />
        </div>

        <div className="flex items-center gap-4 mb-8">
          <button 
            id="specialCaract"
            onClick={() => setSpecialCaract(!specialCaract)}
            className={clsx(
              "flex p-1 w-16 rounded-2xl border-2 transition-all duration-1000",
              {
                "justify-end bg-green-950 border-green-800": specialCaract,
                "justify-start bg-red-950 border-red-800" : !specialCaract,
              }
            )}
          >
            <span className={clsx(
              "w-6 h-6 rounded-full transition-all duration-1000",
              {
                "bg-green-500" : specialCaract,
                "bg-red-500" : !specialCaract, 
              }
            )}/>
          </button>
          <label htmlFor="specialCaract" className="font-semibold">
            Caracteres especiales
          </label>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <button 
            type="submit" 
            className="p-2 rounded font-semibold text-lg cursor-pointer bg-green-600 hover:bg-green-500"
          >
            Guardar Cuenta
          </button>
          
          <button 
            type="reset" 
            onClick={() => navigate("/")} 
            className="p-2 border rounded font-semibold text-lg cursor-pointer hover:bg-red-600 hover:border-red-600"
          >
            Cancelar
          </button>
        </div>
      </form>
    </section>
  )
}

export default AddAcountPage;