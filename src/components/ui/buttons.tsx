import { type FC } from "react";
import { useFormStatus } from "react-dom";
import { MdRefresh } from "react-icons/md";
import { useNavigate } from "react-router";

interface IButton extends React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>{}

const ButtonForm: FC<IButton> = ({ children, className }) => {
  const { pending } =  useFormStatus();

  return (
    <button 
      type="submit"
      disabled={pending}
      children={ children }
      className={`w-full h-12 disabled:bg-gray-500 disabled:opacity-45 disabled:cursor-progress 
      cursor-pointer text-white bg-green-500 hover:bg-green-400 font-bold rounded-md
      transition-all ${className}`}
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

const ButtonResetPassword: FC<IButton> = ({ onClick, className }) => {
  return (
    <button 
      onClick={onClick}
      className={`relative top-7 px-2 h-10 rounded border cursor-pointer border-neutral-400 text-neutral-400 
      hover:bg-white hover:border-white hover:text-[#19191c] ${className}`}
    >
      <MdRefresh size={20}/>
    </button>
  )
}

export {
  ButtonForm,
  ButtonFormReset,
  ButtonResetPassword
}