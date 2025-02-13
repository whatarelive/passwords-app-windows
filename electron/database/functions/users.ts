import crypto from "node:crypto";
import { createHash } from "../helpers/hash";
import { encryptFile, decryptFile } from "../helpers/file-crypto";
import { type UserSchema, User } from "../schemas/user";
import type { IAddUser } from "electron/interfaces";

const dbPath = 'users.enc';

function addUser({ name, password }: IAddUser) {    
    try {
        // Recuperamos la colección de usuarios.
        let data = decryptFile<UserSchema[]>(dbPath) || [];
        
        // Comprobamos que haya un usuario con este nuevo @(name)
        const existsUser = data.find((user) => user.name === name);
        
        // Si existe se notifica a la UI.
        if (existsUser) {
            return { 
                ok: false,
                message: "Usuario existente" 
            };
        }
        
        // Hash de la contraseña del usuario.
        const passwordHash = createHash(password);
        
        // Creamos el nuevo usuario según el Schema.
        const newUser = new User(crypto.randomUUID(), name, passwordHash);

        // Se agrega el usuario a la colección. 
        data.push(newUser);

        // Se actualiza la colección de usuarios.
        encryptFile<UserSchema[]>(data, dbPath);
        
        // Se notifica del resultado a la UI
        return { 
            ok: true,
            message: "Usuario registrado",
        };
    } catch (error) {
        // Manejo de errores
        console.log(error);
        
        return { 
            ok: false,
            message: "Error al agregar el usuario",
            error: error,
        };
    }
}

export {
    addUser,
}