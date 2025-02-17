import { decryptFile, encryptFile } from "../helpers/file-crypto";
import { convertHash, createHash } from "../helpers/hash";
import { WebAccount, type WebAccountSchema } from "../schemas/web-account";
import type { IAddWebAccount, IEditWebAccount } from "electron/interfaces";

const dbPath = "web_accounts.enc";

function addWebAccount({ userId, webName, webPassword, webUrl, webUser }: IAddWebAccount) {
    try {
        // Recuperamos la colección de cuentas.
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

function editWebAccount({ id, webName, webPassword, webUrl, webUser }: IEditWebAccount) {
    try {
        // Variable auxiliar.
        let isChanged: boolean = false;

        // Recuperamos la colección de cuentas.
        const data = decryptFile<WebAccountSchema[]>(dbPath) || [];
        
        // Si se encuentra la cuenta se actuliza sus propiedades.
        const updateData = data.map((account) => {
            // Comprobamos que para esta @(id) haya una cuenta;
            if (account.id !== id) return account;
            
            // Se actualiza la variable auxiliar para notificar que si se pudo actualizar.
            isChanged = true;
            
            // Se agrega la cuenta a la colección con la información actualizada.
            return {
                ...account,
                webUrl, webName, webUser,
                webPassword: createHash(webPassword),  // Hash de la contraseña de la cuenta.
            }
        });

        // Si no existe se notifica a la UI.
        if (!isChanged) {
            return { 
                ok: false,
                message: "No hay una cuenta existente con este id." 
            };
        }
        
        // Se actualiza la colección de cuentas.
        encryptFile<WebAccountSchema[]>(updateData, dbPath);
        
        // Se notifica del resultado a la UI
        return { 
            ok: true,
            message: "Cuenta actualizada",
        };
    } catch (error) {
        // Manejo de errores
        console.log(error);
        
        return { 
            ok: false,
            message: "Error al actualizar la cuenta",
        };
    }
}

function getAllWebAccounts({ userId }: Pick<IAddWebAccount, 'userId'>) {
    try {
        // Recuperamos la colección de usuarios.
        const data = decryptFile<WebAccountSchema[]>(dbPath) || [];
        
        // Filtramos por el id del usuario @(userId)
        const accountForUser = data.filter((account) => account.userId === userId); 
           
        // Si existe se notifica a la UI.
        if (!accountForUser || accountForUser.length === 0) {
            return { 
                ok: false,
                message: "No hay cuentas existentes para este usuario." 
            };
        }
        
        // Dehash de las contraseñas de las cuentas.
        const accountsWithConvertHashPassword = accountForUser.map((account) => {
            const { hash, salt } = account.webPassword;

            return {
                ...account,
                webPassword: convertHash(hash, salt),
            }
        });
        
        // Se notifica del resultado a la UI
        return { 
            ok: true,
            data: accountsWithConvertHashPassword,
        };
    } catch (error) {
        // Manejo de errores
        console.log(error);
        
        return { 
            ok: false,
            message: "Error al recuperar las cuentas",
        };
    }
}

export {
    addWebAccount,
    editWebAccount,
    getAllWebAccounts,
}