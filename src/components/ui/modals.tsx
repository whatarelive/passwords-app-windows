import type { FC, ReactNode } from "react";

const ModalContainer: FC<{ children: ReactNode }> = ({ children }) => {
    return (
        <div className="absolute w-full h-[761px] top-0" style={{ backgroundColor: "rgba(1, 1, 1, 75%)" }}>
            <div className="flex justify-center items-center w-full h-full">
                <div className="flex flex-col items-center justify-between p-6 w-[340px] min-h-fit bg-[#1F1F27] rounded-xl shadow-xl shadow-gray-800">
                    { children }
                </div>
            </div>
        </div>
    )
}

const ModalHeader: FC<{ children: ReactNode }> = ({ children }) => {
    return (
        <div className="flex flex-col items-center gap-1">
            { children }
        </div>
    )
}

const ModalList: FC<{ errors: string[] }> = ({ errors }) => {
    return (
        <ul className="my-3">
            {
                errors.map((error, index) => (
                    <li key={index} className="text-white text-sm">
                        - {error}
                    </li>
                ))
            }
        </ul>
    )
}

const ModalButton: FC<{ children: ReactNode, className?: string, onClick: () => void }> = ({ children, className, onClick }) => {
  return (
    <button 
        onClick={onClick} 
        className={`w-full p-1.5 font-bold rounded-md cursor-pointer ${className}`}
    >
        { children }
    </button>
  )
}

export {
    ModalContainer,
    ModalHeader,
    ModalList,
    ModalButton,
}