import fs from "node:fs";

function readFile(filePath: string) {
    // Comprobamos que el archivo a leer exista.
    if (!fs.existsSync(filePath)) return null;

    // Leemos la información del archivo.
    const data = fs.readFileSync(filePath, "utf-8");
    
    // Retornamos la data parseada.
    return JSON.parse(data);
}

function writeFile<T>(filePath: string, data: T, iv: Buffer<ArrayBufferLike>) {
    // Se escribe la información en el archivo.
    fs.writeFileSync(
        filePath, 
        JSON.stringify({ 
            iv: iv.toString("hex"), 
            data 
        })
    );
}

export {
    readFile,
    writeFile,
}