// import os from "node:os";
import path from "node:path";
import crypto from "node:crypto";
import { fileURLToPath } from "node:url";
import { readFile, writeFile } from "./file";
import { createhashFile } from "./file-hash";

// Clave secreta de 256 bytes.
const secretKey = crypto.randomBytes(32);

// Vector de inicialización de 16 bytes.
const iv = crypto.randomBytes(16);

/**
 * Crea una ruta completa para el archivo dado.
 * @param file - Nombre del archivo.
 * @returns Ruta completa del archivo.
 */
function createPath(file: string) {
    // const filePath = path.join(os.homedir(), ".config", "PasswordManager", file);
    const __dirname = path.dirname(fileURLToPath(import.meta.url));
    return path.join(__dirname, file);
}

/**
 * Cifra los datos y los guarda en un archivo.
 * @param data - Datos a cifrar.
 * @param file - Nombre del archivo donde se guardarán los datos cifrados.
 */
function encryptFile<T>(data: T, file: string) {
    // Ruta completa para el archivo dado.
    const filePath = createPath(file); 
    
    // Crear un cifrador con el algoritmo AES-256-CBC.
    const cipher = crypto.createCipheriv("aes-256-cbc", secretKey, iv);
    
    // Cifrar los datos.
    let encrypted = cipher.update(JSON.stringify(data), "utf-8", "hex");
    encrypted += cipher.final("hex");

    // Crear una firma HMAC del archivo cifrado.
    const signature = createhashFile(encrypted);
    
    // Escribir el archivo cifrado, la firma y el vector de inicialización en el disco.
    writeFile(filePath, encrypted, signature, iv);
}

/**
 * Descifra los datos de un archivo.
 * @param file - Nombre del archivo que contiene los datos cifrados.
 * @returns Datos descifrados o null si la verificación falla.
 */
function decryptFile<T>(file: string) {
    // Ruta completa para el archivo dado.
    const filePath = createPath(file);

    // Leer el contenido del archivo.
    const result = readFile(filePath);

    if (!result) return null;

    // Verificar la firma antes de descifrar
    if (createhashFile(result.data) !== result.signature) return null;
    
    // Crear un descifrador con el algoritmo AES-256-CBC.
    const decipher = crypto.createDecipheriv("aes-256-cbc", secretKey, Buffer.from(result.iv, "hex"));

    // Descifrar los datos.
    let decrypted = decipher.update(result.data, "hex", "utf8");
    decrypted += decipher.final("utf8");
    
    // Parsear los datos descifrados de JSON a un objeto.
    const data = JSON.parse(decrypted) as T;

    return data
}

export {
    encryptFile,
    decryptFile,
}
