import { MdPerson } from "react-icons/md";
import { useMenuStore } from "@/store/menuStore";
import DropdownMenu from "./DropdownMenu";

const Navbar = () => {
  const setOpen = useMenuStore((state) => state.setOpen);

  return (
    <nav className="flex items-center justify-between py-3 px-6">
      <h1 className="text-2xl font-bold">
        Listado de Cuentas
      </h1>

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

export default Navbar;