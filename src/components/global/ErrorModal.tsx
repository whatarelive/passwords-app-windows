import type { FC } from "react";
import { MdErrorOutline } from "react-icons/md";
import { ModalButton, ModalContainer, ModalHeader, ModalList } from "@/components/ui/modals";
import type { RegisterState } from "@/interfaces";

interface IModalError {
    title: string;
    errors: RegisterState;
    onClick: () => void;
}

const ErrorModal: FC<IModalError> = ({ title, errors, onClick }) => {
    return (
        <ModalContainer>
            <ModalHeader>
                <MdErrorOutline size={32} className="text-red-400"/>
                
                <h2 className="text-md font-bold text-center text-red-400">
                    { title } <br/>
                    { errors.message }
                </h2>
            </ModalHeader>

            <ModalList errors={errors.errors || []}/>
            <ModalButton className="bg-red-400 hover:bg-red-500" onClick={onClick}>
                Reintentar
            </ModalButton>
        </ModalContainer>
    )
}

export default ErrorModal;