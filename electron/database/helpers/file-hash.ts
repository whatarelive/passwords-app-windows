import crypto from "node:crypto";

// Generar una clave HMAC de 256 bits (32 bytes) para la firma.
const HMAC_KEY = crypto.randomBytes(32);   

/**
 * Firma los datos con HMAC-SHA256.
 * @param data - Datos a firmar.
 * @returns Firma HMAC en formato hexadecimal.
 */
function createhashFile(data: string) {
    return crypto.createHmac("sha256", HMAC_KEY)
        .update(data)
        .digest("hex");
}

export {
    createhashFile,
}