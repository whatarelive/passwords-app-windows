import * as Yup from 'yup';

const RegisterSchema = Yup.object({
    name: Yup.string()
        .max(15, "El usuario debe tener menos 15 de caracteres.")
        .required("El usuario es requerido."),
    password: Yup.string()
        .min(8, "La contraseña debe tener al menos 8 caracteres.")
        .max(25, "La contraseña debe tener menos 25 de caracteres.")
        .required("La contraseña es requerida."),
    confirmPassword: Yup.string()
        .oneOf([ Yup.ref('password') ], "Las contraseñas deben ser iguales.")
        .required("La confirmarción de la contraseña es requerida."),
});

const LoginSchema = Yup.object({
    name: Yup.string()
        .max(15, "El usuario debe tener menos 15 de caracteres.")
        .required("El usuario es requerido."),
    password: Yup.string()
        .min(8, "La contraseña debe tener al menos 8 caracteres.")
        .max(25, "La contraseña debe tener menos 25 de caracteres.")
        .required("La contraseña es requerida."),
});

export {
    RegisterSchema,
    LoginSchema,
}