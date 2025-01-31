import type { FC } from "react";
import { MdArrowBack } from "react-icons/md";
import { NavLink } from "react-router";

interface IWebFormTitle {
    title: string;
}

const WebFormTitle: FC<IWebFormTitle> = ({ title }) => {
  return (
    <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-bold">
          { title }
        </h1>

        <NavLink 
          to="/" 
          className="inline-flex gap-1 cursor-pointer text-neutral-400 hover:text-white p-1.5 rounded font-medium"
        >
            <MdArrowBack size={24}/>
            Regresar
        </NavLink>
      </div>
  )
}

export default WebFormTitle;