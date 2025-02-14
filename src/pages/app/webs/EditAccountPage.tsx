import { Formik, Form } from "formik";
import { useParams } from "react-router";
import { MdRefresh, MdSettings } from "react-icons/md";
import { useMenuStore } from '@/store/menu-store';
import { EditWebAccountSchema } from "@/validations/webs";
import { getWebAccountForId } from "@/actions/accounts";
import { TextInput, TextInputWithPassword } from "@/components/ui/inputs";
import { ButtonForm, ButtonFormReset, ButtonPassword } from "@/components/ui/buttons";
import WebFormTitle from "@/components/webs/WebFormTitle";
import SettingsModal from "@/components/global/SettingsModal";

function EditAccountPage() {
  const { id } = useParams();
  const webAccount = getWebAccountForId(id as string);
  
  if (!webAccount) {
    return <h1>Hola</h1>
  }

  const { isOpen, setOpen } = useMenuStore();

  const handleCreateRandomPassword = () => {}  

  return (
    <>
      {
        isOpen && (
          <SettingsModal webPassword={webAccount.webPassword}/>
        )
      }

      <section className="px-8 py-10">
        <WebFormTitle title="Editar Cuenta Guardada"/>

        <div className="flex flex-col items-center mt-14 mb-8">
          <h3 className="text-2xl text-green-500 font-bold">
            Formulario de Edición
          </h3>
          <p className="text-gray-300 text-center">
            Edite los datos y génere una nueva contraseña más segura. 
          </p>
        </div>

        <Formik
          initialValues={{ ...webAccount }}
          onSubmit={(values) => console.log(values)}
          validationSchema={EditWebAccountSchema}
        >
          {() => (
            <Form>
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

              <div className="grid grid-cols-2 gap-4 mt-8">
                <ButtonForm type="submit" children="Guardar Cambios" className="text-lg" />
                <ButtonFormReset to="/"/>
              </div>
            </Form>
          )}
        </Formik>
      </section>
    </>
  )
}

export default EditAccountPage;