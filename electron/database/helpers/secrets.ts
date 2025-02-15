import os from "node:os";
import path from "node:path";
import crypto from "node:crypto";
import fs from "node:fs";

// Ruta del archivo que almacenará la clave secreta.
const secretKeyPath = path.join(os.homedir(), ".config", "PasswordManager", "secret.key");
const hmacKeyPath = path.join(os.homedir(), ".config", "PasswordManager", "hmac.key")

function getSecretKey() {
    if (fs.existsSync(secretKeyPath)) {
        console.log("Leer secret");
        
        // Leer la clave secreta desde el archivo.
        return fs.readFileSync(secretKeyPath);
    
    } else {
        console.log("Crear secret");

        // Generar una nueva clave secreta.
        const newSecretKey = crypto.randomBytes(32);
        
        // Guardar la clave secreta en el archivo.    
        fs.writeFileSync(secretKeyPath, newSecretKey);
        
        return newSecretKey;
    }
}

function getHmacKey() {
    if (fs.existsSync(hmacKeyPath)) {
        console.log("Leer secret hmac");
        
        // Leer la clave secreta desde el archivo.
        return fs.readFileSync(hmacKeyPath);
    
    } else {
        console.log("Crear secret hmac");

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