import { NavLink } from "react-router";

function NotFoundPage() {
  return (
    <section className="flex flex-col items-center justify-center h-full select-none">
        <div className="flex">
            <h1 className="text-[110px] mt-2 ml-2 font-semibold text-green-500 z-10">
                4
                <span className="text-white">0</span>
                4
            </h1>

            <div className="absolute">
                <span className="absolute z-0 w-52 rounded-md h-52 bg-transparent border-2 rotate-[25deg]"></span>
                <span className="absolute z-0 w-52 rounded-md h-52 bg-transparent border-2 border-green-500 rotate-[35deg]"></span>
                <span className="absolute z-0 w-52 rounded-md h-52 bg-transparent border-2 rotate-[45deg]"></span>
                <span className="absolute z-0 w-52 rounded-md h-52 bg-transparent border-2 border-green-500 rotate-[55deg]"></span>
                <span className="absolute z-0 w-52 rounded-md h-52 bg-transparent border-2 rotate-[65deg]"></span>
            </div>
        </div>

        <h2 className="text-4xl font-semibold border-2 p-2 px-4 border-l-green-500 border-r-green-500 rounded-md mt-32">
            Página de Error
        </h2>

        <p className="text-lg mt-5">
            No se encontro la cuenta web con el id especificado. 
        </p>

        <NavLink to="/" className="flex items-center px-5 h-11 mt-12 rounded-md font-semibold text-lg bg-green-500 hover:bg-white hover:text-green-500 transition-all">
            Regresar al Inicio
        </NavLink>
    </section>
  )
}

export default NotFoundPage;