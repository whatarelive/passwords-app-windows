import { type FC } from "react";
import { NavLink } from "react-router";
import { LuExternalLink } from "react-icons/lu";
import { MdDelete, MdEdit, MdMoreVert } from "react-icons/md";
import { useCardMenuStore } from "@/store/menu-store";
import { useAccountsStore } from "@/store/accounts-store";
import type { WebAccount } from "@/interfaces";

export const DropMenu: FC<Pick<WebAccount, 'id' | 'webUrl'>> = ({ id, webUrl }) => {
    const { idKey, setOpen } = useCardMenuStore();
    const deleteAccount = useAccountsStore((state) => state.deleteAccount);

    return (
        <>
            <button 
                className="p-1.5 rounded text-black cursor-pointer hover:bg-gray-300 hover:border-gray-300" 
                onClick={() => setOpen(id)}
            >
                <MdMoreVert size={20}/>
            </button>

            {
                idKey === id && (
                    <div className="absolute top-[5px] -left-[115px] w-full">
                        {/* Pointer */}
                        <div className="absolute z-0 top-[10px] -right-[70px] rotate-90 border-b-[30px] border-l-[20px] border-r-[20px] w-px border-b-secondary border-l-transparent border-r-transparent"/>
                        
                        {/* Content */}
                        <div className="absolute -right-12 w-fit z-10 h-fit p-3 bg-secondary rounded-md select-none">
                            <ul className="flex flex-col h-full gap-2 justify-between text-white">
                                <NavLink to={`/edit/${id}`} className="web-account-menu-item hover:bg-white hover:text-blue-600">
                                    <MdEdit size={18}/>
                                    Editar
                                </NavLink>
                                
                                <a href={webUrl} target="_blank" className="web-account-menu-item hover:bg-white hover:text-green-600">
                                    <LuExternalLink size={18}/>
                                    Vsitar
                                </a>
                                
                                <button onClick={async () => await deleteAccount(id)} className="web-account-menu-item hover:bg-white hover:text-red-600">
                                    <MdDelete size={18}/>
                                    Eliminar
                                </button>
                            </ul>
                        </div>
                    </div>
                )
            }
        </>
    )
}