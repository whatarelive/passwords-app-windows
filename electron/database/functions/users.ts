import crypto from "node:crypto";
import { createSession } from "./session";
import { createHash, verifyPassword } from "../helpers/hash";
import { encryptFile, decryptFile } from "../helpers/file-crypto";
import { type UserSchema, User } from "../schemas/user";
import { createActivity, deleteAllActivity } from "./activities";
import { UserActivity } from "../enums/activities";
import type { IAddUser, IDeleteUser } from "electron/interfaces";

const dbPath = 'users.enc';

/**
 * Agrega un nuevo usuario a la base de datos.
 * @param param0 - Objeto que contiene el nombre y la contraseña del usuario.
 * @returns Objeto con el estado de la operación y un mensaje.
 */
function addUser({ name, password }: IAddUser) {    
    try {
        // Recuperamos la colección de usuarios.
        const data = decryptFile<UserSchema[]>(dbPath) || [];

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
        
        // Se crea la session del usuario
        const session = createSession({ userId: newUser.id });

        if (!session) {
            return {
                ok: false,
                message: "Error al crear la session del usuario",
            }   
        }

        // Se registra la actividad de creación de la cuenta.
        createActivity({
            action: UserActivity.REGISTER,
            details: `Has creado el usuario: ${newUser.name}`,
            userId: session.userId,
        });

        // Se notifica del resultado a la UI
        return { 
            ok: true,
            message: "Usuario registrado",
            userId: session.userId,
        };
    } catch (error) {
        // Manejo de errores
        console.log(error);
        
        return { 
            ok: false,
            message: "Error al agregar el usuario",
        };
    }
}

/**
 * Verifica las credenciales de un usuario.
 * @param param0 - Objeto que contiene el nombre y la contraseña del usuario.
 * @returns Objeto con el estado de la operación y un mensaje.
 */
function verifyUser({ name, password }: IAddUser) {
    try {
        // Recuperamos la colección de usuarios.
        const data = decryptFile<UserSchema[]>(dbPath) || [];

        // Comprobamos que haya un usuario con este nuevo @(name)
        const existsUser = data.find((user) => user.name === name);

        // Si no existe se notifica a la UI.
        if (!existsUser) {
            return { 
                ok: false,
                message: "El usuario no existe" 
            };
        }

        // Si las contraseñas no son igaules se notifica a la UI.
        if (!verifyPassword(password, existsUser.password.hash, existsUser.password.salt)) {
            return { 
                ok: false,
                message: "Las credenciales no son validas" 
            };
        }

        // Se crea la session del usuario
        const session = createSession({ userId: existsUser.id });

        if (!session) {
            return {
                ok: false,
                message: "Error al crear la session del usuario",
            }   
        }

        // Se registra la actividad de creación de la cuenta.
        createActivity({
            action: UserActivity.LOGIN,
            details: `Has iniciado sesión con el usuario: ${existsUser.name}`,
            userId: session.userId,
        });

        // Se notifica del resultado a la UI
        return { 
            ok: true,
            message: "Usuario valido",
            userId: session.userId,
        };

    } catch (error) {
        // Manejo de errores.
        console.log(error);
        
        return {
            ok: false,
            message: "Error al verificar el usuario",
        }
    }
}

/**
 * Elimina a un usuario de la base de datos.
 * @param param0 - Objeto que contiene el id del usuario.
 * @returns Objeto con el estado de la operación y un mensaje.
 */
function deleteUser({ id }: IDeleteUser) {
    try {
        // Recuperamos la colección de usuarios.
        const data = decryptFile<UserSchema[]>(dbPath) || [];

        // Filtramos a los usuarios exeptuando al usuario con ese id.
        const userWithOutId = data.filter((user) => user.id !== id);

        // Se actualiza la colección de usuarios.
        encryptFile(userWithOutId, dbPath);

        // Eliminamos todas las actividades del usuario.
        deleteAllActivity({ userId: id });

        // Se notifica del resultado a la UI
        return {
            ok: true,
            message: "Usuario eliminado",
        }
        
    } catch (error) {
        // Manejo de errores.
        console.log(error);
        
        return {
            ok: false,
            message: "Error en la eliminación del usuario"
        }
    }
}

export {
    addUser,
    verifyUser,
    deleteUser,
}