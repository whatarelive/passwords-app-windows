import type { FC } from "react";
import { useNavigate } from "react-router";
import { MdCheck } from "react-icons/md";
import { ModalButton, ModalContainer, ModalHeader } from "@/components/ui/modals";

interface IModalError {
    title: string;
}

const SucessModal: FC<IModalError> = ({ title }) => {
    const navigate = useNavigate();

    return (
        <ModalContainer>
            <ModalHeader>
                <span className="bg-green-500 rounded-full p-1">
                    <MdCheck size={28} className="text-white"/>
                </span>
                
                <h2 className="text-md font-bold text-center text-green-500">
                    { title }
                </h2>
            </ModalHeader>

            <ModalButton 
                className="bg-green-500 hover:bg-green-400 mt-5" 
                onClick={() => navigate("/")}
            >
                Continuar
            </ModalButton>
        </ModalContainer>
    )
}

export default SucessModal;