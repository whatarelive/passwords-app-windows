import fs from "node:fs";

interface IFile {
    iv: string;
    data: string;
}

function readFile(filePath: string) {
    // Comprobamos que el archivo a leer exista.
    if (!fs.existsSync(filePath)) return null;

    // Leemos la información del archivo.
    const data = fs.readFileSync(filePath, "utf-8");
    
    // Retornamos la data parseada.
    return JSON.parse(data) as IFile;
}

function writeFile(filePath: string, data: string, iv: Buffer<ArrayBufferLike>) {
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