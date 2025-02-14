import { Formik, Form } from "formik";
import { MdRefresh, MdSettings } from "react-icons/md";
import { useMenuPasswordStore } from "@/store/menu-store";
import { AddWebAccountSchema } from "@/validations/webs";
import { TextInput, TextInputWithPassword } from "@/components/ui/inputs";
import { ButtonForm, ButtonFormReset, ButtonPassword } from "@/components/ui/buttons";
import { SettingsModal } from "@/components/global/SettingsModal";
import { WebFormTitle } from "@/components/webs/WebFormTitle";

function AddAccountPage() {
  const { isOpen, setOpen } = useMenuPasswordStore();
  const handleCreateRandomPassword = () => {}

  return (
    <>
      <section className="px-8">
        <WebFormTitle 
          title="Formulario de Creación" 
          subtitle="Registre una nueva cuenta con una contraseña segura."
        />
        
        <Formik
          initialValues={{ webName: "", webUrl: "", webUser: "", webPassword: "" }}
          onSubmit={async(values) => console.log(values)}
          validationSchema={AddWebAccountSchema}
        >
          {({ handleReset }) => (
            <Form className="flex flex-col justify-between h-[500px]">
              <div>
                <TextInput 
                  label="Sitio Web" 
                  name="webName" 
                  placeholder="Ingrese el nombre del sitio web" 
                />

                <TextInput 
                  label="URL" 
                  name="webUrl" 
                  type="url" 
                  placeholder="Ingrese la url del sitio web"
                />
                
                <TextInput 
                  label="Usuario" 
                  name="webUser" 
                  placeholder="Ingrese su nombre de usuario"
                />

                <div className="flex gap-4">
                  <TextInputWithPassword 
                    label="Contraseña" 
                    name="webPassword" 
                    placeholder="Ingrese su contraseña"
                  />

                  <ButtonPassword type="button" onClick={handleCreateRandomPassword}>
                    <MdRefresh size={20}/>
                  </ButtonPassword>
                  
                  <ButtonPassword type="button" onClick={setOpen}>
                    <MdSettings size={20}/>
                  </ButtonPassword>
                </div>
              </div>

              <div className="flex gap-4">
                <ButtonForm type="submit" className="text-lg">
                  Guardar Cambios
                </ButtonForm>
                
                <ButtonFormReset onClick={handleReset}>
                  Cancelar
                </ButtonFormReset>
              </div>
            </Form>
          )}
        </Formik>
      </section>

      { isOpen && <SettingsModal/> }
    </>
  )
}

export default AddAccountPage;