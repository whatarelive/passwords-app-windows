import { useState, type FC } from "react";
import { ErrorMessage, useField } from "formik";
import { MdVisibility, MdVisibilityOff } from "react-icons/md";

interface ITextInput extends React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> {
    label?: string;
} 

interface IRangeInput extends ITextInput {
    range: number;
}

const TextInput: FC<ITextInput> = ({ label, ...props }) => {
    const [ field ] = useField(props);

    return (
        <div className="flex flex-col mb-2">
            <label className="font-semibold mb-1" htmlFor={props.name}>
                { label }
            </label>
            <input
                id={props.name} 
                className={`p-2 border border-neutral-400 rounded-md bg-transparent 
                focus-visible:border-white focus-visible:outline-none ${props.className}`}
                { ...field }
                { ...props }
            />
            <ErrorMessage className="text-red-500 text-sm" name={props.name!} component="span"/>
        </div>
    )
}

const TextInputWithPassword: FC<ITextInput> = ({ label, ...props }) => {
    const [ field ] = useField(props);
    const [viewPass, setViewPass] = useState(false);
    
    return (
        <div className="flex flex-col w-full mb-2">
            <label className="font-semibold mb-1" htmlFor={props.name}>
                { label }
            </label>
            <div className="inline-flex border rounded-md border-neutral-400 focus-within:border-white">
                <input 
                    id={props.name}
                    type={viewPass ? "text" : "password"} 
                    className="p-2 w-full rounded-md bg-transparent focus-visible:outline-none"
                    { ...field }
                    { ...props }
                />
                <i className="flex items-center justify-center w-12 cursor-pointer" onClick={() => setViewPass(!viewPass)}>
                    { !viewPass ? <MdVisibility size={24}/> : <MdVisibilityOff size={24}/> }
                </i>
            </div>
            <ErrorMessage className="text-red-500 text-sm" name={props.name!} component="span"/>
        </div>
    )
}

const RangeInput: FC<IRangeInput> = ({ range, className, ...props }) => {
    return (
        <div className="flex flex-col w-full mb-2">
            <label htmlFor="passwordlarge" className="font-semibold mb-1">
                Longitud de caracteres: { range }
            </label>
            <input 
                type="range" 
                name="passwordlarge" 
                id="passwordlarge"
                value={range}
                max={25}
                min={8}
                className={`cursor-pointer accent-green-500 ${className}`}
                { ...props }
            />
        </div>
    )
}

export {
    TextInput,
    TextInputWithPassword,
    RangeInput,
}