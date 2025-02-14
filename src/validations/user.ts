import * as Yup from 'yup';

export const PasswordSchema = Yup.object({
    password: Yup.string()
        .min(8, "La contraseña debe tener al menos 8 caracteres.")
        .max(25, "La contraseña debe tener menos 25 de caracteres.")
        .required("La contraseña es requerida."),
    newPassword: Yup.string()
        .min(8, "La contraseña debe tener al menos 8 caracteres.")
        .max(25, "La contraseña debe tener menos 25 de caracteres.")
        .not([ Yup.ref("password") ], "La contraseña nueva debe ser distinta a la anterior.")
        .required("La nueva contraseña es requerida."),
    confirmPassword: Yup.string()
        .oneOf([ Yup.ref('newPassword') ], "Las contraseñas deben ser iguales.")
        .required("La confirmarción de la contraseña es requerida."),
});
