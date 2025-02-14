import { useState } from "react";
import { Formik, Form } from "formik";
import { AddWebAccountSchema } from "@/validations/webs";
import WebFormTitle from "@/components/webs/WebFormTitle";
import { SwitchWebAccount } from "@/components/ui/switch";
import { RangeInput, TextInput, TextInputWithPassword } from "@/components/ui/inputs";
import { ButtonForm, ButtonFormReset, ButtonPassword } from "@/components/ui/buttons";
import { MdRefresh } from "react-icons/md";

function AddAccountPage() {
  const [rangePass, setRangePass] = useState(15);
  const [specialCaract, setSpecialCaract] = useState(false);

  const handleCreateRandomPassword = () => {}

  return (
    <section className="px-8 py-10">
      <WebFormTitle title="Agregar Nueva Cuenta"/>
      
      <Formik
        initialValues={{ webName: "", webUrl: "", webUser: "", webPassword: "" }}
        onSubmit={async(values) => console.log(values)}
        validationSchema={AddWebAccountSchema}
      >
        {() => (
          <Form className="mt-12">
            <TextInput label="Sitio Web" name="webName" placeholder="Ingrese el nombre del sitio web"/>
            <TextInput label="URL" name="webUrl" type="url" placeholder="Ingrese la url del sitio web"/>
            <TextInput label="Usuario" name="webUser" placeholder="Ingrese su nombre de usuario"/>
          
            <div className="flex gap-4">
              <TextInputWithPassword label="Contraseña" name="webPassword" placeholder="Ingrese su contraseña"/>
              <ButtonPassword onClick={handleCreateRandomPassword}>
                <MdRefresh size={20}/>
              </ButtonPassword>
            </div>
                
            <div className="grid grid-cols-2 gap-4">
              <ButtonForm children="Guardar Cuenta" className="text-lg"/>
              <ButtonFormReset to="/"/>
            </div>
          </Form>
        )}
      </Formik>
    </section>
  )
}

export default AddAccountPage;