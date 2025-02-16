import os from "node:os";
import fs from "node:fs";
import path from "node:path";
import crypto from "node:crypto";

// Ruta del archivo que almacenará la clave secreta.
const secretKeyPath = path.join(os.homedir(), "PasswordManager", ".config", "secret.key");
const hmacKeyPath = path.join(os.homedir(), "PasswordManager", ".config", "hmac.key");

function getSecretKey() {
    if (fs.existsSync(secretKeyPath)) {
        // Leer la clave secreta desde el archivo.
        return fs.readFileSync(secretKeyPath);

    } else {
        // Generar una nueva clave secreta.
        const newSecretKey = crypto.randomBytes(32);
        
        // Guardar la clave secreta en el archivo.    
        fs.writeFileSync(secretKeyPath, newSecretKey);
        
        return newSecretKey;
    }
}

function getHmacKey() {
    if (fs.existsSync(hmacKeyPath)) {
        // Leer la clave secreta desde el archivo.
        return fs.readFileSync(hmacKeyPath);
    
    } else {
        // Generar una nueva clave secreta.
        const newhmacKey = crypto.randomBytes(32);
        
        // Guardar la clave secreta en el archivo.    
        fs.writeFileSync(hmacKeyPath, newhmacKey);
        
        return newhmacKey;
    }
}

export {
    getSecretKey,
    getHmacKey,
}