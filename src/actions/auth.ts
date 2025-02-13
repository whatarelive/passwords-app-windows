import { RegisterSchema } from "@/validations/auth";
import type { AuthenticateState, RegisterState } from "@/interfaces";

async function authenticate(_prevState: AuthenticateState, _formData: FormData) {
    
}

async function register(_prevState: RegisterState, formData: FormData) {
    const validatedFields = RegisterSchema.safeParse({
        ...Object.fromEntries(formData.entries())
    });

    if (!validatedFields.success) {
        return {
            errors: validatedFields.error.errors.flatMap((e) => e.message),
            message: "Campos de texto faltantes.",
        }
    }

    try {
        const { user, password } = validatedFields.data;
        const { ok, message } = await window.ipcRenderer.invoke('user-add', { name: user, password })
        
        if (!ok) {
            return {
                message: message as string, 
                errors: [message as string] 
            };
        }

        return { 
            message: message as string,
        };
    } catch (error) {
        console.log(error);
        
        return {
            message: "Error de conexión.",
        };
    }
}

export {
    register,
    authenticate,
}