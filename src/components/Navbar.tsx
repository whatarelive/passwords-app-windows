import { NavLink } from "react-router";
import { MdAdd, MdPerson } from "react-icons/md";
import { useMenuStore } from "@/store/menuStore";
import DropdownMenu from "./DropdownMenu";

const Navbar = () => {
  const setOpen = useMenuStore((state) => state.setOpen);

  return (
    <nav className="flex items-center justify-between py-3 px-4">
      <h1 className="text-2xl font-bold">
        Listado de Cuentas
      </h1>

      <div className="flex gap-5">
        <NavLink 
          to="/add"
          className="flex font-semibold border py-1 gap-1 px-2 rounded cursor-pointer hover:bg-white hover:text-[#1F1F27] transition-all"
        >
          <MdAdd size={24}/>
          Agregar
        </NavLink>

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

export default Navbar;