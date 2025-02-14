import { NavLink, useLocation } from "react-router";
import { MdArrowBack, MdPerson } from "react-icons/md";
import { useMenuStore } from "@/store/menu-store";
import DropdownMenu from "@/components/global/DropdownMenu";

export const Navbar = () => {
  const { pathname } = useLocation();
  const setOpen = useMenuStore((state) => state.setOpen);

  return (
    <nav className="flex items-center justify-between py-3 px-6 select-none">
      {
        pathname === "/" ? (
          <h1 className="text-2xl font-bold">
            Listado de Cuentas
          </h1>
        ) : (
          <NavLink 
            to="/" 
            className="inline-flex gap-1 cursor-pointer text-neutral-400 hover:text-white p-1.5 rounded font-medium"
          >
              <MdArrowBack size={24}/>
              Regresar
          </NavLink>
        )
      }

      <div className="flex gap-5">
        {/* Dropdown menu trigger */}
        <button
          onClick={setOpen}
          className="rounded-full cursor-pointer bg-white p-1.5 text-gray-300"
        >
          <MdPerson size={24}/>
        </button>
        
        {/* Dropdown menu */}
        <DropdownMenu/>
      </div>
    </nav>
  )
}