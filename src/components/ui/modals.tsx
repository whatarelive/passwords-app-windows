import type { FC, ReactNode } from "react";

interface IProps {
    children: ReactNode; 
    className?: string;
    onClick: () => void;
}

const ModalContainer: FC<Pick<IProps, "children">> = ({ children }) => {
    return (
        <div className="absolute w-full h-[761px] top-0" style={{ backgroundColor: "rgba(1, 1, 1, 75%)" }}>
            <div className="flex justify-center items-center w-full h-full">
                <div className="flex flex-col items-center justify-between w-[340px] min-h-fit bg-[#1F1F27] rounded-xl shadow-xl shadow-gray-800">
                    { children }
                </div>
            </div>
        </div>
    )
}

const ModalHeader: FC<Pick<IProps, "children">> = ({ children }) => {
    return (
        <div className="flex items-center gap-2 mb-3">
            { children }
        </div>
    )
}

const ModalButton: FC<IProps> = ({ children, className, onClick }) => {
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
    ModalButton,
}