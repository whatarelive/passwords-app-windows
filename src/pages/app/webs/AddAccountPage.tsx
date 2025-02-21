import { Formik, Form } from "formik";
import { MdRefresh, MdSettings } from "react-icons/md";
import { useAccountsStore } from "@/store/accounts-store";
import { useRandomPassword } from "@/store/random-password-store";
import { AddWebAccountSchema } from "@/validations/webs";
import { TextInput, TextInputWithPassword } from "@/components/ui/inputs";
import { ButtonForm, ButtonFormReset, ButtonPassword } from "@/components/ui/buttons";
import { SettingsModal } from "@/components/global/SettingsModal";
import { WebFormTitle } from "@/components/webs/WebFormTitle";
import SucessModal from "@/components/global/SucessModal";
import ErrorModal from "@/components/global/ErrorModal";

function AddAccountPage() {
  const { view, message, addAccount, disableView } = useAccountsStore();
  const { isOpen, setOpen, createRandomPassword } = useRandomPassword();

  return (
    <>
      { 
        view === "ERROR" && (
          <ErrorModal title="Error de Creación de Cuenta" message={message!} disableView={disableView}/>
        )
      }
      {
        view === "SUCESS" && (
          <SucessModal title={message!} message="Cuenta creada correctamente" disableView={disableView}/>
        )
      }
      
      <section className="px-14">
        <WebFormTitle 
          title="Formulario de Creación" 
          subtitle="Registre una nueva cuenta con una contraseña segura."
        />
        
        <Formik
          initialValues={{ webName: "", webUrl: "", webUser: "", webPassword: "" }}
          onSubmit={async({ webUrl, webName, webUser, webPassword }) => await addAccount(webName, webPassword, webUrl, webUser)}
          validationSchema={AddWebAccountSchema}
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
                    }}>
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