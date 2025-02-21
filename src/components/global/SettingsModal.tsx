import type { FC } from "react";
import { RangeInput } from "@/components/ui/inputs";
import { SwitchWebAccount } from "@/components/ui/switch";
import { ModalContainer, ModalHeader, ModalButton } from "@/components/ui/modals";
import { useMenuPasswordStore } from "@/store/menu-store";
import { useRandomPassword } from "@/store/random-password-store";

export const SettingsModal: FC = () => {
    const setOpen = useMenuPasswordStore((state) => state.setOpen);
    const { rangePassword, specialCaracters, setConfigValue } = useRandomPassword();

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
                    range={rangePassword}
                    onChange={(e) => setConfigValue({ rangePassword: Number(e.target.value) })}
                />
                
                <SwitchWebAccount 
                    specialCaract={specialCaracters} 
                    onClick={() => {
                        setConfigValue({ specialCaracters })
                    }}
                />
            </div>

            <ModalButton 
                className="bg-green-500 hover:bg-white hover:text-green-500" 
                onClick={setOpen}
            >
                Guardar
            </ModalButton>
        </ModalContainer>
    )
}