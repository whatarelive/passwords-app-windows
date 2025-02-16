import { decryptFile, encryptFile } from "../helpers/file-crypto";
import { createHash } from "../helpers/hash";
import { WebAccount, type WebAccountSchema } from "../schemas/web-account";
import type { IAddWebAccount } from "electron/interfaces";

const dbPath = "web_accounts.enc";

function addWebAccount({ userId, webName, webPassword, webUrl, webUser }: IAddWebAccount) {
    try {
        // Recuperamos la colección de usuarios.
        const data = decryptFile<WebAccountSchema[]>(dbPath) || [];
        
        // Comprobamos que para esta @(webUrl) no haya un usuario con este nuevo @(webUser)
        const existsAccountForUrl = data
            .filter((account) => account.userId === userId) // Primero filtramos por el id del Usuario.
            .find((account) => account.webUrl === webUrl && account.webUser === webUser); // Luego comprobamos la existencia.

        // Si existe se notifica a la UI.
        if (existsAccountForUrl) {
            return { 
                ok: false,
                message: "Cuenta existente para esta página web." 
            };
        }
        
        // Hash de la contraseña de la cuenta.
        const passwordHash = createHash(webPassword);
        
        // Creamos la nueva cuenta según el Schema.
        const newWebAccount = new WebAccount(crypto.randomUUID(), userId, webName, webUser, passwordHash, webUrl);

        // Se agrega la cuenta a la colección. 
        data.push(newWebAccount);

        // Se actualiza la colección de cuentas.
        encryptFile<WebAccountSchema[]>(data, dbPath);

        console.log(data);
        
        // Se notifica del resultado a la UI
        return { 
            ok: true,
            message: "Cuenta creada",
        };
    } catch (error) {
        // Manejo de errores
        console.log(error);
        
        return { 
            ok: false,
            message: "Error al crear la cuenta",
        };
    }
}

export {
    addWebAccount,
}