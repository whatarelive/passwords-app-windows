import fs from "node:fs";
import crypto from "node:crypto";
import path from "node:path";
import { fileURLToPath } from "node:url";

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
    
    fs.writeFileSync(filePath, JSON.stringify({ iv: iv.toString("hex"), data: encrypted }));
}

// function decryptFile(file: string) {
//     const filePath = createPath(file);

//     // const {} = ;
// }

export {
    encryptFile,
    // decryptFile,
}
