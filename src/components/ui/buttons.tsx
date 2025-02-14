import clsx from "clsx";
import { type FC } from "react";
import { useFormStatus } from "react-dom";
import { useNavigate } from "react-router";

interface IButton extends React.DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>{}

const ButtonForm: FC<IButton> = ({ children, className }) => {
  const { pending } =  useFormStatus();

  return (
    <button 
      type="submit"
      disabled={pending}
      children={ children }
      className={clsx(`w-full h-12 disabled:bg-gray-500 disabled:opacity-45
        cursor-pointer text-white bg-green-500 hover:bg-green-400 font-bold rounded-md
        transition-all ${className}`,
        { 
          "disabled:cursor-progress": pending
        }
      )}
  />
  )
}

const ButtonFormReset: FC<{ to: string }> = ({ to }) => {
  const navigate = useNavigate();

  return (
    <button 
      type="reset" 
      onClick={() => navigate(to)} 
      className="p-2 border rounded font-semibold text-lg cursor-pointer hover:bg-red-600 hover:border-red-600"
    >
      Cancelar
    </button>
  )
}

const ButtonPassword: FC<IButton> = ({ className, children, ...props }) => {
  return (
    <button 
      className={`relative top-7 px-2 h-10 rounded border cursor-pointer border-neutral-400 text-neutral-400 
      hover:bg-white hover:border-white hover:text-[#19191c] ${className}`}
      { ...props }
    >
      { children }
    </button>
  )
}

export {
  ButtonForm,
  ButtonFormReset,
  ButtonPassword
}