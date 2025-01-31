import { useState, type FC } from "react";
import { MdVisibility, MdVisibilityOff } from "react-icons/md";

interface ITextInput extends React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> {
    label?: string;
} 

const TextInput: FC<ITextInput> = ({ label, ...props }) => {
  return (
    <div className="flex flex-col mb-4">
        <label className="font-semibold mb-1" htmlFor={props.name}>
            { label }
        </label>
        <input
            id={props.name} 
            className={`p-2 border border-neutral-400 rounded-md bg-transparent 
            focus-visible:border-white focus-visible:outline-none ${props.className}`}
            { ...props }
        />
    </div>
  )
}

const TextInputWithPassword: FC<ITextInput> = ({ label, ...props }) => {
    const [viewPass, setViewPass] = useState(false);
    
  return (
    <div className="flex flex-col w-full mb-4">
        <label className="font-semibold mb-1" htmlFor={props.name}>
            { label }
        </label>
        <div className="inline-flex border rounded-md border-neutral-400 focus-within:border-white">
            <input 
                id={props.name}
                type={viewPass ? "text" : "password"} 
                className="p-2 w-full rounded-md bg-transparent focus-visible:outline-none"
                { ...props }
            />
            <i className="flex items-center justify-center w-12 cursor-pointer" onClick={() => setViewPass(!viewPass)}>
                { !viewPass ? <MdVisibility size={24}/> : <MdVisibilityOff size={24}/> }
            </i>
        </div>
    </div>
  )
}

export {
    TextInput,
    TextInputWithPassword,
}