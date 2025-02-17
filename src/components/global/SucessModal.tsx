import type { FC } from "react";
import { useNavigate } from "react-router";
import { MdCheck } from "react-icons/md";
import { ModalButton, ModalContainer, ModalHeader } from "@/components/ui/modals";

interface IModalSucess {
    title: string;
    message: string;
    disableView: () => void;
}

const SucessModal: FC<IModalSucess> = ({ title, message, disableView }) => {
    const navigate = useNavigate();

    return (
        <ModalContainer>
          <div className="p-4">
            <ModalHeader>
                <span className="border-green-500 border-2 rounded-full p-0.5">
                    <MdCheck size={12} className="text-green-500"/>
                </span>
                
                <h2 className="text-xl font-bold text-center text-green-500">
                    { title }
                </h2>
            </ModalHeader>

            <p className="text-white text-md font-bold text-center">
              ( { message } ) 
            </p>
          </div>

            <ModalButton 
                className="bg-green-500 hover:bg-white hover:text-green-500" 
                onClick={() => {
                  disableView();
                  navigate("/");
                }}
            >
                Continuar
            </ModalButton>
        </ModalContainer>
    )
}

export default SucessModal;