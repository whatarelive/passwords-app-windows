import { useState } from "react";
import WebFormTitle from "@/components/webs/WebFormTitle";
import { SwitchWebAccount } from "@/components/ui/switch";
import { RangeInput, TextInput, TextInputWithPassword } from "@/components/ui/inputs";
import { ButtonForm, ButtonFormReset, ButtonResetPassword } from "@/components/ui/buttons";

function AddAccountPage() {
  const [rangePass, setRangePass] = useState(15);
  const [specialCaract, setSpecialCaract] = useState(false);

  const handleCreateRandomPassword = () => {}

  return (
    <section className="px-8 py-10">
      <WebFormTitle title="Agregar Nueva Cuenta"/>
      
      <form action="" className="mt-12">
        <TextInput label="Sitio Web" name="webName" placeholder="Ingrese el nombre del sitio web"/>
        <TextInput label="URL" name="webUrl" type="url" placeholder="Ingrese la url del sitio web"/>
        <TextInput label="Usuario" name="webUser" placeholder="Ingrese su nombre de usuario"/>
      
        <div className="flex gap-4">
          <TextInputWithPassword label="Contraseña" name="password" placeholder="Ingrese su contraseña"/>
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
          <ButtonForm children="Guardar Cuenta" className="text-lg"/>
          <ButtonFormReset to="/"/>
        </div>
      </form>
    </section>
  )
}

export default AddAccountPage;