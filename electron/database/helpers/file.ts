import fs from "node:fs";
import path from "node:path";

// Interfaz para la estructura del archivo.
interface IFile {
    iv: string;
    data: string;
    signature: string;
}

/**
 * Lee el contenido de un archivo y lo parsea a un objeto.
 * @param filePath - Ruta completa del archivo.
 * @returns Objeto con los datos del archivo o null si el archivo no existe.
 */
function readFile(filePath: string) {
    // Comprobamos que el archivo a leer exista.
    if (!fs.existsSync(filePath)) return null;

    // Leemos la información del archivo.
    const data = fs.readFileSync(filePath, "utf-8");
    
    // Retornamos la data parseada.
    return JSON.parse(data) as IFile;
}

/**
 * Escribe datos cifrados, firma y vector de inicialización en un archivo.
 * @param filePath - Ruta completa del archivo.
 * @param data - Datos cifrados.
 * @param signature - Firma HMAC de los datos.
 * @param iv - Vector de inicialización.
 */
function writeFile(filePath: string, data: string, signature: string, iv: Buffer<ArrayBufferLike>) {
      // Si el archivo no existe lo creamos.
    if (!fs.existsSync(filePath)) {
        fs.mkdirSync(path.dirname(filePath), { recursive: true });
    }
    // Se escribe la información en el archivo.
    fs.writeFileSync(
        filePath, 
        JSON.stringify({ 
            iv: iv.toString("hex"), 
            data,
            signature,
        })
    );

    // Ajustar permisos (solo el propietario puede leer/escribir)
    fs.chmodSync(filePath, 0o600);
}

export {
    readFile,
    writeFile,
}