import os from "node:os";
import fs from "node:fs";
import path from "node:path";
import { exec } from "node:child_process";

// Type del Comando de Ejecución.
type Commnad = 'deny' | 'grant';

// Carpeta Home del Sistema Operativo. 
const HOME_DIR = os.homedir();

// Archivos de la aplicación.
const filesTo = [
  path.join(HOME_DIR, "PasswordManager", ".config", "secret.key"),
  path.join(HOME_DIR, "PasswordManager", ".config", "hmac.key"),
  path.join(HOME_DIR, "PasswordManager", ".data", "users.enc"),
  path.join(HOME_DIR, "PasswordManager", ".data", "activities.enc"),
  path.join(HOME_DIR, "PasswordManager", ".data", "web_accounts.enc"),
]

/**
 * Deniega y Otorga permisos de lectura y escritura a todos los usuarios para un archivo.
 * @param subComand - Tipo de comando a ejecutar.
 */
function changeReadWritePermissions(subComand: Commnad) {
    let command: string;

    for (const file of filesTo) {
        try {
            // Comprobamos que el archivo tenga el modo de lectura o escritura.
            // De no tener ningún modo este lanza un error.
            fs.accessSync(file, fs.constants.R_OK | fs.constants.W_OK);
            
            // Creamos el comando de ejecución.
            command = `icacls "${file}" /${subComand} *S-1-1-0:(R,W)`;
            
            // Habilitamos los permisos de lectura y escritura.
            exec(command, (error, stdout, stderr) => {
                if (error) {
                    console.error(`Error al cambiar permisos: ${error.message}`);
                    return;
                }
                if (stderr) {
                    console.error(`Error: ${stderr}`);
                    return;
                }
                console.log(`Permisos cambiados: ${stdout}`);
            });
        
        } catch (error) {
            // Si no presenta ningún modo, asumimos que el archivo no existe.
            // Entonces saltamos a la siguiente iteración.
            continue;
        }
    }
}

export {
    changeReadWritePermissions,
}