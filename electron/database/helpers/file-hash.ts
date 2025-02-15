import crypto from "node:crypto";
import { getHmacKey } from "./secrets";

// Generar una clave HMAC de 256 bits (32 bytes) para la firma.
const HMAC_KEY = getHmacKey();   

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