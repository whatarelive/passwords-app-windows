import path from "node:path";
import crypto from "node:crypto";
import { fileURLToPath } from "node:url";
import { readFile, writeFile } from "./file";

// Clave secreta de 256 bytes.
const secretKey = crypto.randomBytes(32);

// Vector de inicialización.
const iv = crypto.randomBytes(16);

function createPath(file: string) {
    const __dirname = path.dirname(fileURLToPath(import.meta.url));
    return path.join(__dirname, file);
}

function encryptFile<T>(data: T, file: string) {
    const filePath = createPath(file); 
    
    const cipher = crypto.createCipheriv("aes-256-cbc", secretKey, iv);
    
    let encrypted = cipher.update(JSON.stringify(data), "utf-8", "hex");
    encrypted += cipher.final("hex");
    
    writeFile(filePath, encrypted, iv);
}

function decryptFile<T>(file: string) {
    const filePath = createPath(file);

    const result = readFile(filePath);

    if (!result) return null;

    const decipher = crypto.createDecipheriv("aes-256-cbc", secretKey, Buffer.from(result.iv, "hex"));

    let decrypted = decipher.update(result.data, "hex", "utf8");
    decrypted += decipher.final("utf8");
    
    const data = JSON.parse(decrypted) as T;

    return data
}

export {
    encryptFile,
    decryptFile,
}
