import clsx from "clsx";
import { type FC } from "react";
import { useFormStatus } from "react-dom";

interface IButton extends React.DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>{}

const ButtonForm: FC<IButton> = ({ children, className }) => {
  const { pending } =  useFormStatus();

  return (
    <button 
      type="submit"
      disabled={pending}
      children={ children }
      className={clsx(`w-full h-12 disabled:bg-gray-500 disabled:opacity-45 cursor-pointer 
        hover:text-green-500 hover:bg-white bg-green-500 text-white font-bold rounded-md
        transition-all select-none ${className}`,
        { 
          "disabled:cursor-progress": pending
        }
      )}
  />
  )
}

const ButtonFormReset: FC<IButton> = ({ ...props }) => {
  return (
    <button 
      type="reset" 
      className={`w-full h-12 border text-neutral-400 rounded font-bold text-lg cursor-pointer 
        hover:bg-red-500 hover:text-white hover:border-red-500 transition-all select-none
      `}
      { ...props }
    />
  )
}

const ButtonPassword: FC<IButton> = ({ className, children, ...props }) => {
  return (
    <button 
      className={`relative top-7 px-2 h-10 rounded border cursor-pointer border-neutral-400 text-neutral-400 
      hover:bg-white hover:border-white hover:text-[#19191c] select-none ${className}`}
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