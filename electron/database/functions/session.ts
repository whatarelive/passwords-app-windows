import { decryptFile, encryptFile } from "../helpers/file-crypto";
import { Session, SessionSchema } from "../schemas/session";

const dbPath = "session.enc";


function createSession({ userId, userName }: Omit<SessionSchema, 'createTime'>) {
    try {
        // Recuperamos la sessión guradada en el archivo.
        let session = decryptFile<SessionSchema>(dbPath);

        console.log("Despues de crear la variable:", session);
        
        // Instate de tiempo en que se crea la session.
        const createTime = Date.now();

        // Creacíon del objeto que representa la session.
        session = new Session(userId, userName, createTime);

        console.log("Despues de reasignar la variable:", session);

        // Se guarda la información de la session en el archivo seguro.
        encryptFile(session, dbPath);

        // Se retorna la session.
        return session;

    } catch (error) {
        console.log(error);
        
        return null;
    }
}

function checkSession() {
    try {
        // Recuperamos la sessión guradada en el archivo.
        const session = decryptFile<SessionSchema>(dbPath);

        // Si la session no existe devuelve null.
        if (!session) return null;

        // Instate de tiempo en que se crea la session.
        const instantNow = Date.now();

        // Calculo del tiempo restante de la session.
        const result = instantNow - session.createTime;

        // Si el resultado excede la 1 hora se elimina la session guardada.
        if (result > 3600000) {
            encryptFile({ userId: null, userName: null, createTime: undefined }, dbPath);
            
            return null;
        };
        
        // Se retorna la session.
        return {
            userId: session.userId,
            userName: session.userName
        };

    } catch (error) {
        console.log(error);
        
        return null;
    }
}

function clearSession() {
    try {
        // Recuperamos la sessión guradada en el archivo.
        const session = decryptFile<SessionSchema>(dbPath);

        // Si la session no existe devuelve null.
        if (!session) return null;

        // Se elimina la session guardada.
        encryptFile({ userId: null, userName: null, createTime: undefined }, dbPath);
    
        return null;
        
    } catch (error) {
        console.log(error);
        
        return null;
    }
}

export {
    createSession,
    checkSession,
    clearSession,
}