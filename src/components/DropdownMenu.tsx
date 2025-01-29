import clsx from "clsx";
import { NavLink } from "react-router";
import { MdEdit, MdLogout } from "react-icons/md";
import { useMenuStore } from "@/store/menuStore";

const DropdownMenu = () => {
    const { isOpen, setOpen } = useMenuStore();

    const handlerClick = () => {}

  return (
    <div 
        onClick={setOpen}
        className={clsx(
            "top-[65px]",
            {  
                "absolute": isOpen,
                "hidden": !isOpen,
            }
        )}>
    {/* Pointer */}
    <div className="absolute z-0 -top-[15px] -right-10 border-b-[30px] border-l-[20px] border-r-[20px] w-px border-b-neutral-800 border-l-transparent border-r-transparent"/>
    
    {/* Content */}
    <div className="absolute -right-12 w-56 z-10 h-28 p-3 bg-neutral-800 rounded-md">
        <div className="flex items-center justify-between">
        <p className="text-lg font-medium">Livan Perez</p>
        
        <NavLink to="/user" className="max-w-max p-1 rounded cursor-pointer hover:bg-white hover:text-[#1F1F27] transition-all">
            <MdEdit size={16}/>
        </NavLink>
        </div>

        <button
            onClick={handlerClick} 
            className="flex justify-center items-center w-full mt-6 font-semibold border py-1 gap-1 px-2 text-red-400 rounded cursor-pointer hover:bg-red-500 hover:text-white hover:border-red-500 transition-all">
                <MdLogout/>
                Cerrar Sesión
        </button>
    </div>
    </div>
  )
}

export default DropdownMenu;