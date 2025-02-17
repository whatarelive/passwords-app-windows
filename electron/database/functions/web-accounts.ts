import { decryptFile, encryptFile } from "../helpers/file-crypto";
import { encryptPassword, decryptPassword } from "../helpers/hash";
import { WebAccount, type WebAccountSchema } from "../schemas/web-account";
import type { IAddWebAccount, IEditWebAccount } from "electron/interfaces";

const dbPath = "web_accounts.enc";

function addWebAccount({ userId, webName, webPassword, webUrl, webUser }: IAddWebAccount) {
    try {
        // Recuperamos la colección de cuentas.
        const data = decryptFile<WebAccountSchema[]>(dbPath) || [];
        
        // Comprobamos que para esta @(webUrl) no haya un usuario con este nuevo @(webUser)
        const existsAccountForUrl = data.find((account) => 
            account.userId === userId // Las cuentas que tengan pertenescan a este usuario.
            && account.webUrl === webUrl // Que pertenescan a la misma página web.
            && account.webUser === webUser // Que tengan el mismo usuario.
        );

        // Si existe se notifica a la UI.
        if (existsAccountForUrl) {
            return { 
                ok: false,
                message: "Cuenta existente para esta página web." 
            };
        }
        
        // Encriptado de la contraseña de la cuenta.
        const passwordHash = encryptPassword(webPassword);
        
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
                webPassword: encryptPassword(webPassword),  // Encriptado de la contraseña de la cuenta.
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
        
        // Cuentas del Usuario con el valor del parametro @(userId).
        const accountForUser = data.filter((account) => {
            // Filtramos por el id del usuario @(userId)
            if (account.userId !== userId) return;

            // Extraemos las propiedades.
            const { iv, password } = account.webPassword;
    
            // Se retornan las cuentas con sus contraseñas desencriptadas.
            return {
                ...account,
                webPassword: decryptPassword(password, iv), // Desencriptado de las contraseñas de las cuentas.
            }
        }); 
           
        // Si existe se notifica a la UI.
        if (!accountForUser || accountForUser.length === 0) {
            return { 
                message: "No hay cuentas existentes para este usuario." 
            };
        }

        console.log(accountForUser);
        
        
        // Se notifica del resultado a la UI
        return { 
            data: accountForUser,
        };
    } catch (error) {
        // Manejo de errores
        console.log(error);
        
        return { 
            message: "Error al recuperar las cuentas",
        };
    }
}

function deleteWebAccount({ id }: Pick<IEditWebAccount, 'id'>) {
    try {
        // Recuperamos la colección de cuentas.
        const data = decryptFile<WebAccountSchema[]>(dbPath) || [];
        
        // Comprobamos que para esta @(id) haya una cuenta;
        // Si se encuentra la cuenta se elimina de la colección.
        const updateData = data.filter((account) => account.id !== id);

        // Si no se elimino se notifica a la UI.
        if (data.length === updateData.length) {
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
            message: "Cuenta eliminada",
        };
    } catch (error) {
        // Manejo de errores
        console.log(error);
        
        return { 
            ok: false,
            message: "Error al eliminar la cuenta",
        };
    }   
}

function deleteAllWebAccounts({ userId }: Pick<IAddWebAccount, 'userId'>) {
    try {
        // Recuperamos la colección de cuentas.
        const data = decryptFile<WebAccountSchema[]>(dbPath) || [];
        
        // Comprobamos que para esta @(userId) haya una cuenta;
        // Si se encuentra la cuenta se elimina de la colección.
        const updateData = data.filter((account) => account.userId !== userId);

        // Si no se elimino se notifica a la UI.
        if (data.length === updateData.length) {
            return { 
                ok: false,
                message: "No hay una cuentas existentes para ese usuario." 
            };
        }
        
        // Se actualiza la colección de cuentas.
        encryptFile<WebAccountSchema[]>(updateData, dbPath);
        
        // Se notifica del resultado a la UI
        return { 
            ok: true,
            message: "Cuentas del usuario eliminadas",
        };
    } catch (error) {
        // Manejo de errores
        console.log(error);
        
        return { 
            ok: false,
            message: "Error al eliminar todas las cuentas",
        };
    }   
}

export {
    addWebAccount,
    editWebAccount,
    getAllWebAccounts,
    deleteWebAccount,
    deleteAllWebAccounts,
}