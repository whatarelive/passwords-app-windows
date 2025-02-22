import { Formik, Form } from "formik";
import { useParams } from "react-router";
import { MdRefresh, MdSettings } from "react-icons/md";
import { useAccountsStore } from "@/store/accounts-store";
import { useRandomPassword } from "@/store/random-password-store";
import { EditWebAccountSchema } from "@/validations/webs";
import { TextInput, TextInputWithPassword } from "@/components/ui/inputs";
import { ButtonForm, ButtonFormReset, ButtonPassword } from "@/components/ui/buttons";
import { SettingsModal } from "@/components/global/SettingsModal";
import { WebFormTitle } from "@/components/webs/WebFormTitle";
import ErrorModal from "@/components/global/ErrorModal";
import SucessModal from "@/components/global/SucessModal";
import WarningModal from "@/components/global/WarningModal";
import type { WebAccount } from "@/interfaces";

function EditAccountPage() {
  const { id } = useParams();
  const { isOpen, setOpen, createRandomPassword } = useRandomPassword();
  const { view, message, getAccountWithId, editAccount, dispatchError, disableView } = useAccountsStore();
  
  const webAccount = getAccountWithId(id);
  
  if (!webAccount) return <h1>Hola</h1>
  
  const handleSubmit = async ({ id, webName, webUrl, webUser, webPassword }: Omit<WebAccount, 'userId'>) => {
    if (
      webAccount.webName === webName 
      && webAccount.webUrl === webUrl
      && webAccount.webUser === webUser
      && webAccount.webPassword === webPassword
    ) {
      return dispatchError("Los datos no han sido cambiados");
    }
    
    await editAccount(id, webName, webPassword, webUrl, webUser);
  }

  return (
    <>
      { 
        view === "ERROR" && (
          <ErrorModal title="Error de Creación de Cuenta" message={message!} disableView={disableView}/>
        )
      }
      {
        view === "SUCESS" && (
          <SucessModal title="Cuenta actualizada" message={message!} disableView={disableView}/>
        )
      }
      {
        view === "WARNING" && (
          <WarningModal title="Advertencia de Actualización" message={message!} disableView={disableView}/>
        )
      }

      <section className="px-14">
        <WebFormTitle 
          title="Formulario de Edición" 
          subtitle="Edite los datos y génere una nueva contraseña más segura."
        />

        <Formik
          initialValues={{ ...webAccount }}
          onSubmit={handleSubmit}
          validationSchema={EditWebAccountSchema}
        >
          {({ handleReset, setFieldValue }) => (
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

                  <ButtonPassword type="button" 
                    onClick={() => { 
                      const password = createRandomPassword();
                      setFieldValue("webPassword", password);
                    }}
                    >
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

export default EditAccountPage;