import * as Yup from 'yup';

const AddWebAccountSchema = Yup.object({
    webName: Yup.string()
        .required("El nombre de la página es requerido."),
    webUrl: Yup.string()
        .url("La URL no tiene un formato valido.")
        .required("La URL de la página es requerida."),
    webUser: Yup.string()
        .required("El usuario es requerido."),
    webPassword: Yup.string()
        .min(8, "La contraseña debe tener al menos 8 caracteres.")
        .max(25, "La contraseña debe tener menos 25 de caracteres.")
        .required("La contraseña es requerida."),
});

const EditWebAccountSchema = AddWebAccountSchema.optional();

export {
    AddWebAccountSchema,
    EditWebAccountSchema,    
}