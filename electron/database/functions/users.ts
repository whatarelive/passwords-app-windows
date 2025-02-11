import path from "node:path";
import crypto from "node:crypto";
import { fileURLToPath } from "node:url";
import { readFile, writeFile } from "node:fs/promises";
import { type UserSchema, User } from "../schemas/user";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const dbPath = path.join(__dirname, '../electron/database/jsons/users.json');

async function readDB(): Promise<{ data?: UserSchema[], message?: string }> {
    try {
        const data = await readFile(dbPath, "utf-8");
        const resp: UserSchema[] = JSON.parse(data);
        
        return { data: resp };
        
    } catch (error) {
        console.log(error);
        return { message: "Error al leer la información" }
    }
}

async function writeDB(users: UserSchema[]) {
    try {
        await writeFile(dbPath, JSON.stringify(users, null, 2));   

        return { message: "Usuario registrado con exito" }
        
    } catch (error) {
        return { message: "Error al registrar el usuario" }
    }
}

async function addUser(name: string, password: string) {
    // Recuperamos la colección de usuarios.
    const { data, message } = await readDB();
    
    // Si no se pudo acceder a la data se notifica a la UI.
    if (!data) {
        return {
            ok: false,
            message
        }
    }

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
    const passwordHash = '';
   
    // Creamos el nuevo usuario según el Schema.
    const newUser = new User(crypto.randomUUID(), name, passwordHash)

    // Se agrega el usuario a la colección. 
    data.push(newUser);

    // Se actualiza la colección de usuarios.
    const result = await writeDB(data);

    // Se notifica del resultado a la UI
    return result.message;
}

export {
    addUser,
}