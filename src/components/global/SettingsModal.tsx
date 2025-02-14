import { useState, type FC } from "react";
import { RangeInput } from "@/components/ui/inputs";
import { SwitchWebAccount } from "@/components/ui/switch";
import { ModalContainer, ModalHeader, ModalButton } from "@/components/ui/modals";
import { useMenuPasswordStore } from "@/store/menu-store";

interface IProps {
    webPassword?: string;
}

export const SettingsModal: FC<IProps> = ({ webPassword }) => {
    const setOpen = useMenuPasswordStore((state) => state.setOpen);
    const [rangePass, setRangePass] = useState(webPassword?.length || 15);
    const [specialCaract, setSpecialCaract] = useState(webPassword?.includes("#$%@!*&^.") || false);

    return (
        <ModalContainer>
            <div className="p-4">
                <ModalHeader>
                    <h2 className="text-xl font-bold text-center text-green-500">
                        Configuración de Contraseña 
                    </h2>
                </ModalHeader>
            </div>

            <div className="w-full px-8">
                <RangeInput 
                    range={rangePass}
                    onChange={(e) => setRangePass(Number(e.target.value))}
                />
                
                <SwitchWebAccount 
                    specialCaract={specialCaract} 
                    onClick={(e) => {
                        e.preventDefault();
                        setSpecialCaract(!specialCaract);
                    }}
                />
            </div>

            <ModalButton 
                className="bg-green-500 hover:bg-white hover:text-green-500" 
                onClick={setOpen}
            >
                Continuar
            </ModalButton>
        </ModalContainer>
    )
}