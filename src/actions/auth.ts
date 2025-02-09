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
            errors: validatedFields.error.flatten().fieldErrors,
            message: 'Missing Fields. Faile to Register User',
        }
    }

    try {
        
    } catch (error) {
        return {
            error,
            message: 'Database Error: Failed to Register User.'
        };
    }

    return {};
}

export {
    register,
    authenticate,
}