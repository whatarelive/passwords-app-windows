import { Formik, Form } from "formik";
import { useParams } from "react-router";
import { MdRefresh, MdSettings } from "react-icons/md";
import { useMenuPasswordStore } from '@/store/menu-store';
import { EditWebAccountSchema } from "@/validations/webs";
import { getWebAccountForId } from "@/actions/accounts";
import { TextInput, TextInputWithPassword } from "@/components/ui/inputs";
import { ButtonForm, ButtonFormReset, ButtonPassword } from "@/components/ui/buttons";
import { SettingsModal } from "@/components/global/SettingsModal";
import { WebFormTitle } from "@/components/webs/WebFormTitle";

function EditAccountPage() {
  const { id } = useParams();
  const webAccount = getWebAccountForId(id as string);
  
  if (!webAccount) return <h1>Hola</h1>

  const { isOpen, setOpen } = useMenuPasswordStore();

  const handleCreateRandomPassword = () => {}  

  return (
    <>
      <section className="px-8">
        <WebFormTitle 
          title="Formulario de Edición" 
          subtitle="Edite los datos y génere una nueva contraseña más segura."
        />

        <Formik
          initialValues={{ ...webAccount }}
          onSubmit={(values) => console.log(values)}
          validationSchema={EditWebAccountSchema}
        >
          {({ handleReset}) => (
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

      { isOpen && <SettingsModal webPassword={webAccount.webPassword}/> }
    </>
  )
}

export default EditAccountPage;