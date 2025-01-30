import { useState } from "react";
import { MdVisibility, MdVisibilityOff } from "react-icons/md";

function AddAcountPage() {
  const [viewPass, setViewPass] = useState(false);
  const [rangePass, setRangePass] = useState(15);

  const handleClick = () => setViewPass(!viewPass);

  return (
    <section className="px-8 py-10">
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
            type="text" 
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
          <div className="inline-flex border rounded-md border-neutral-400 focus-within:border-white">
            <input 
              id="password"
              name="password"
              type={viewPass ? "text" : "password"} 
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

        <div className="flex flex-col mb-8">
          <label htmlFor="passwordlarge">
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

        <button type="submit" className="p-2 rounded font-semibold text-xl text-center w-full bg-green-500">
          Crear Cuenta
        </button>
      </form>
    </section>
  )
}

export default AddAcountPage;