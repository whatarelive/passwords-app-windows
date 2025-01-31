import clsx from "clsx";
import { useState } from "react";
import { NavLink, useNavigate } from "react-router";
import { MdVisibility, MdVisibilityOff, MdArrowBack, MdRefresh, MdCheck, MdClose } from "react-icons/md";

function AddAccountPage() {
  const [viewPass, setViewPass] = useState(false);
  const [rangePass, setRangePass] = useState(15);
  const [specialCaract, setSpecialCaract] = useState(false);
  const navigate = useNavigate();

  const handleClick = () => setViewPass(!viewPass);

  const handleCreateRandomPassword = () => {}

  return (
    <section className="px-8 py-10">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-bold">
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

      <form action="" className="mt-12">
        <div className="flex flex-col mb-5">
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

        <div className="flex flex-col mb-5">
          <label className="font-semibold mb-1" htmlFor="webUrl">
            URL
          </label>
          <input 
            id="webUrl"
            name="webUrl"
            type="url" 
            placeholder="Ingrese la url del sitio web"
            className="p-2 border border-neutral-400 rounded-md bg-transparent focus-visible:border-white focus-visible:outline-none"
          />
        </div>

        <div className="flex flex-col mb-5">
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

        <div className="flex flex-col mb-5">
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

        <div className="flex flex-col mt-8 mb-2">
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
            className="cursor-pointer accent-green-500"
          />
        </div>

        <div className="flex items-center gap-4 mt-6 mb-12">
          <button 
            id="specialCaract"
            onClick={(e) => { 
              e.preventDefault();
              setSpecialCaract(!specialCaract);
            }}
            className={clsx(
              "flex p-0.5 w-16 rounded-2xl border-2 bg-neutral-700 transition-transform duration-1000",
              {
                "justify-end": specialCaract,
                "justify-start" : !specialCaract,
              }
            )}
          >
            <span className="p-0.5 cursor-pointer rounded-full bg-white transition-all duration-1000">
              <i 
                className={clsx(
                  {
                    "text-green-500" : specialCaract,
                    "text-red-500" : !specialCaract, 
                  }
                )}
              >
                {
                  specialCaract 
                    ? <MdCheck size={22}/> 
                    : <MdClose size={22}/>
                }
              </i>
            </span>
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

export default AddAccountPage;