import crypto from "node:crypto";
import { getSecretKey } from "./secrets";

// Número de iteraciones que se utilizarán en el algoritmo PBKDF2.
// Un número mayor de iteraciones aumenta la seguridad pero también el tiempo de procesamiento.
const iterations = 100000;

// Longitud de la clave derivada en bytes.
// 64 bytes (512 bits) es una longitud adecuada para la mayoría de los casos de uso.
const keylen = 64;

// Algoritmo de hash que se utilizará en el algoritmo PBKDF2.
// SHA-512 es un algoritmo de hash seguro y ampliamente utilizado.
const digest = "sha512";

// Declaración del algoritmo de encriptado.
const algorithm = 'aes-256-cbc';

// Genera un vector de inicialización (IV) aleatorio de 16 bytes.
const iv = crypto.randomBytes(16);

/**
 * Crea un hash de la contraseña utilizando un salt único.
 * @param value - Contraseña a hashear.
 * @returns Objeto con el hash de la contraseña y el salt utilizado.
*/
function createHash(value: string) {
    const salt = crypto.randomBytes(16).toString('hex');
    const derivedKey = crypto.pbkdf2Sync(value, salt, iterations, keylen, digest);
    return { hash: derivedKey.toString("hex"), salt };
}

/**
 * Verifica si la contraseña coincide con el hash almacenado.
 * @param password - Contraseña a verificar.
 * @param hash - Hash almacenado.
 * @param salt - Salt utilizado para generar el hash.
 * @returns Verdadero si la contraseña es válida, falso en caso contrario.
 */
function verifyPassword(password: string, hash: string, salt: string) {
    const derivedKey = crypto.pbkdf2Sync(password, salt, iterations, keylen, digest);
    return derivedKey.toString("hex") === hash;
}

/**
 * Cifra una contraseña utilizando el algoritmo AES-256-CBC.
 * @param password - Contraseña a cifrar.
 * @returns Objeto con el IV utilizado y la contraseña cifrada.
 */
function encryptPassword(password: string) {
    // Obtiene la clave secreta para el cifrado.
    const secretKey = getSecretKey();
    
    // Crea un objeto de cifrado utilizando el algoritmo, la clave secreta y el IV.
    const cipher = crypto.createCipheriv(algorithm, secretKey, iv);
    
    // Cifra la contraseña.
    let encrypted = cipher.update(password, 'utf8', 'hex');
    
    // Finaliza el proceso de cifrado.
    encrypted += cipher.final('hex');

    // Devuelve el IV y la contraseña cifrada.
    return { iv: iv.toString('hex'), password: encrypted };
}

/**
 * Descifra una contraseña cifrada utilizando el algoritmo AES-256-CBC.
 * @param encryptedData - Contraseña cifrada.
 * @param iv - IV utilizado para cifrar la contraseña.
 * @returns Contraseña descifrada.
 */
function decryptPassword(encryptedData: string, iv: string) {
    // Obtiene la clave secreta para el descifrado.
    const secretKey = getSecretKey();
    
    // Crea un objeto de descifrado utilizando el algoritmo, la clave secreta y el IV.
    const decipher = crypto.createDecipheriv(algorithm, secretKey, Buffer.from(iv, 'hex'));
    
    // Descifra la contraseña.
    let decrypted = decipher.update(encryptedData, 'hex', 'utf8');
    
    // Finaliza el proceso de descifrado.
    decrypted += decipher.final('utf8');

    // Devuelve la contraseña descifrada.
    return decrypted;
}

export {
    createHash,
    verifyPassword,
    encryptPassword,
    decryptPassword,
}