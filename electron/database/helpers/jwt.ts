import crypto from "node:crypto";

interface ICreateJwt {
    payload: {
        userId: crypto.UUID,
    };
    expiresIn: number;
}

interface IVerifyJwt {
    token: string;
}

const algoritm = "HS256";

function createEncode(obj: any) {
    return Buffer.from(JSON.stringify(obj))
    .toString("base64")
    .replace(/=+$/, "")
    .replace("/\+/g", "-")
    .replace("/\//g", "_");
}

function createEncrypted(headerEncoded: string, payloadEncoded: string) {
    const signaturedBase = `${headerEncoded}.${payloadEncoded}`;
    const secret = process.env.SECRET_JWT;

    return crypto.createHmac("sha256", secret)
        .update(signaturedBase)
        .digest("base64")
        .replace(/=+$/, "")
        .replace("/\+/g", "-")
        .replace("/\//g", "_");
}

// Función para crear el JSON Web Token.
function createJwt({ payload, expiresIn }: ICreateJwt) {
    // Creación del header encriptado con la información del hash de encriptación.
    const headerEncoded = createEncode({ alg: algoritm, typ: "jwt" });

    // Calculo de la expiración en segundos.
    const exp = Math.floor(Date.now() / 1000) * expiresIn;

    // Creación del payload encriptado con la data proporcionada y el tiempo de expiración.
    const payloadEncoded = createEncode({ ...payload, exp });

    // Creación de la firma
    const signature = createEncrypted(headerEncoded, payloadEncoded);

    // Retorna la cadena de texto que define al JSON Web Token.
    return `${headerEncoded}.${payloadEncoded}.${signature}`;
}

// Función para verificar el JSON Web Token. 
function verifyJwt({ token }: IVerifyJwt) {
    // Se deviden las partes que componen al token.
    const [ headerEncoded, payloadEncoded, signature ] = token.split(".");

    // Si una de las partes no se encuentra, no es valido el token.
    if (!headerEncoded || !payloadEncoded || !signature) return null;

    // Se creada una nueva firma con los valores del token proporcionado.
    const expectedSignatured = createEncrypted(headerEncoded, payloadEncoded);

    // Se comprueba que la firma del token proporcionado sea igual a la firma creada anteriormente.
    if (expectedSignatured !== signature) return null;

    try {
        // Se extrean los valores del payload en formato JSON.
        const payload = JSON.parse(Buffer.from(payloadEncoded, "base64").toString());
        
        // Se obtiene la fecha actual.
        const dateNow = Math.floor(Date.now() / 1000);

        // Se verifica si el token ha expirado.
        if (payload.exp && payload.exp < dateNow) return null

        // Si es valido se retorna el payload.
        return payload;

    } catch (error) {
        return null;
    }
}

export {
    createJwt,
    verifyJwt,
}