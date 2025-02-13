import z from "zod";

const RegisterSchema = z.object({
    user:  z.string()
        .min(8, { message: "El usuario debe tener al menos 8 caracteres." })
        .max(15, { message: "El usuario debe tener menos 15 de caracteres." }),
    password: z.string()
        .min(8, { message: "La contraseña debe tener al menos 8 caracteres." })
        .regex(/[a-z]/, { message: "La contraseña debe contener al menos una letra minúscula." })
        .regex(/[A-Z]/, { message: "La contraseña debe contener al menos una letra mayúscula." })
        .regex(/[0-9]/, { message: "La contraseña debe contener al menos un número." }),
    confirmPassword: z.string()
})
.refine((data) => data.password === data.confirmPassword, {
    message: "Las contraseñas no coinciden",
    path: ["confirmPassword"],
});

const AuthenticateSchema = z.object({
    user:  z.string(),
    password: z.string()
        .min(8, { message: "La contraseña debe tener al menos 8 caracteres" })
        .regex(/[a-z]/, { message: "La contraseña debe contener al menos una letra minúscula" })
        .regex(/[A-Z]/, { message: "La contraseña debe contener al menos una letra mayúscula" })
        .regex(/[0-9]/, { message: "La contraseña debe contener al menos un número" }),
});

export {
    RegisterSchema,
    AuthenticateSchema,
}