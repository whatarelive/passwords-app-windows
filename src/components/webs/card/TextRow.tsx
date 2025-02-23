import clsx from "clsx";
import type { FC } from "react";
import { useText } from "@/hooks/useText";
import { MdVisibility, MdVisibilityOff, MdContentCopy } from "react-icons/md";

interface Props {
    value: string;
}

export const TextRow: FC<Props> = ({ value }) => {
  const { showText, handleCopyText, handleShowText } = useText(value);

  return (
    <div className="flex gap-4">
      <input 
        value={value}
        disabled
        type={showText ? "text" : "password"}
        className="text-right"
      />
      <button 
        onClick={handleShowText}
        className={clsx(
          "p-1.5 rounded cursor-pointer",
          {
            "hover:text-red-500" : showText,
            "hover:text-blue-400" : !showText
          }
        )}
      >
        {     
          !showText
            ? <MdVisibility size={24}/> 
            : <MdVisibilityOff size={24}/> 
        }
      </button>
      <button 
        className="p-1.5 rounded cursor-pointer hover:text-green-400" 
        onClick={handleCopyText}
      >
        <MdContentCopy size={24}/>
      </button>
    </div>
  )
}