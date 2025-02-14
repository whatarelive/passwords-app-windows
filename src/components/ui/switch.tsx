import clsx from "clsx";
import type { FC } from "react";
import { MdCheck, MdClose } from "react-icons/md";

interface ISwitchWebAccountProps {
  specialCaract: boolean;
  onClick: React.MouseEventHandler<HTMLButtonElement>,
}

const SwitchWebAccount: FC<ISwitchWebAccountProps> = ({ specialCaract, onClick }) => {
  return (
    <div className="flex items-center gap-4 mt-6 mb-12">
      <button
        id="specialCaract"
        onClick={onClick} 
        className={clsx(
          "flex p-0.5 w-12 rounded-2xl border-2 bg-neutral-700 transition-transform duration-1000",
          {
            "justify-end": specialCaract,
            "justify-start" : !specialCaract,
          }
        )}
      >
        <span className="p-0.5 cursor-pointer rounded-full bg-white transition-all duration-1000">
          <i 
            className={clsx(
              {
                "text-green-500" : specialCaract,
                "text-red-500" : !specialCaract, 
              }
            )}
          >
            {
              specialCaract 
                ? <MdCheck size={16}/> 
                : <MdClose size={16}/>
            }
          </i>
        </span>
      </button>

      <label htmlFor="specialCaract" className="font-semibold">
        Caracteres especiales
      </label>
    </div>
  )
}

export {
  SwitchWebAccount
}