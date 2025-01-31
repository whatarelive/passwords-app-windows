import { useState } from "react";
import { useParams } from "react-router";
import { getWebAccountForId } from "@/actions/accounts";
import WebFormTitle from "@/components/webs/WebFormTitle";
import { SwitchWebAccount } from "@/components/ui/switch";
import { RangeInput, TextInput, TextInputWithPassword } from "@/components/ui/inputs";
import { ButtonForm, ButtonFormReset, ButtonResetPassword } from "@/components/ui/buttons";
import type { InputWebAccount, WebAccount } from '@/interfaces';

function EditAccountPage() {
  const { id } = useParams();
  const webAccount = getWebAccountForId(id as string) as WebAccount;

  const [inputChanged, setInputChanged] = useState(false);
  const [rangePass, setRangePass] = useState(webAccount?.webPassword.length);
  const [specialCaract, setSpecialCaract] = useState(webAccount?.webPassword.includes("#$%@!*&^."));

  const handleCreateRandomPassword = () => {}

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const input = e.target.name as InputWebAccount;

    if (e.target.value === webAccount[input]) {
      if (inputChanged) return setInputChanged(false);   
      
      return;
    };

    setInputChanged(true);
  }

  return (
    <section className="px-8 py-10">
      <WebFormTitle title="Editar Cuenta Guardada"/>
      
      <form action="" className="mt-12">
        <TextInput 
          label="Sitio Web" 
          name="webName" 
          placeholder="Ingrese el nombre del sitio web" 
          defaultValue={webAccount?.webName} 
          onChange={handleInputChange}
        />

        <TextInput 
          label="URL" 
          name="webUrl" 
          type="url" 
          placeholder="Ingrese la url del sitio web"
          defaultValue={webAccount?.webUrl}
          onChange={handleInputChange}
        />
        
        <TextInput 
          label="Usuario" 
          name="webUser" 
          placeholder="Ingrese su nombre de usuario"
          defaultValue={webAccount?.webUser}
          onChange={handleInputChange}
        />

        <div className="flex gap-4">
          <TextInputWithPassword 
            label="Contraseña" 
            name="webPassword" 
            placeholder="Ingrese su contraseña"
            defaultValue={webAccount?.webPassword}
            onChange={handleInputChange}
          />

          <ButtonResetPassword onClick={handleCreateRandomPassword}/>
        </div>

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

        <div className="grid grid-cols-2 gap-4">
          <ButtonForm children="Guardar Cambios" inputChange={!inputChanged} className="text-lg"/>
          <ButtonFormReset to="/"/>
        </div>
      </form>
    </section>
  )
}

export default EditAccountPage;