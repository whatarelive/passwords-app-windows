import { type FC } from "react";
import { useFormStatus } from "react-dom";

interface IButton extends React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>{}

const ButtonForm: FC<IButton> = ({ children, className }) => {
  const { pending } =  useFormStatus();

  return (
    <button 
      type="submit"
      disabled={pending}
      children={ children }
      className={`w-full h-10 disabled:bg-gray-500 disabled:opacity-45 disabled:cursor-progress 
      cursor-pointer text-white bg-green-500 hover:bg-green-400 font-bold rounded-md mt-3 
      transition-all ${className}`}
  />
  )
}

export {
  ButtonForm
}