import type { FC } from "react";
import { MdErrorOutline } from "react-icons/md";
import { ModalButton, ModalContainer, ModalHeader } from "@/components/ui/modals";

interface IModalError {
  title: string;
  message?: string;
  disableView: () => void;
}

const ErrorModal: FC<IModalError> = ({ title, message, disableView }) => {
  return (
    <ModalContainer>
      <div className="p-4">
        <ModalHeader>
            <MdErrorOutline size={24} className="text-red-500"/>
            
            <h2 className="text-xl font-bold text-center text-red-500">
              { title } <br/>
            </h2>
        </ModalHeader>

        <p className="text-white text-md font-bold text-center">
          ( { message } ) 
        </p>
      </div>

      <ModalButton className="bg-red-500 hover:bg-white hover:text-red-500" onClick={disableView}>
          Reintentar
      </ModalButton>
    </ModalContainer>
  )
}

export default ErrorModal;