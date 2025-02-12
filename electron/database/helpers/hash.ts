import crypto from "node:crypto";

// Número de iteraciones que se utilizarán en el algoritmo PBKDF2.
// Un número mayor de iteraciones aumenta la seguridad pero también el tiempo de procesamiento.
const iterations = 100000;

// Longitud de la clave derivada en bytes.
// 64 bytes (512 bits) es una longitud adecuada para la mayoría de los casos de uso.
const keylen = 64;

// Algoritmo de hash que se utilizará en el algoritmo PBKDF2.
// SHA-512 es un algoritmo de hash seguro y ampliamente utilizado.
const digest = "sha512";

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

export {
    createHash,
    verifyPassword,
}