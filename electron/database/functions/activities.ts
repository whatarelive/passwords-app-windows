import crypto from "node:crypto";
import { decryptFile, encryptFile } from "../helpers/file-crypto";
import { Activity, type ActivitySchema } from "../schemas/activity";
import type { IAddActivity } from "electron/interfaces";

const dbPath = "activities.enc";

/**
 * Crea una nueva actividad y la guarda en el archivo cifrado.
 * @param param0 - Objeto que contiene userId, action y details de la actividad.
 */
function createActivity({ userId, action, details }: IAddActivity) {
    // Desencripta el archivo y obtiene los datos existentes.
    const data = decryptFile<ActivitySchema[]>(dbPath) || [];

    // Obtiene la fecha actual.
    const date = new Date();

    // Formatear la fecha
    const dateFormat = new Intl.DateTimeFormat('es-ES', {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",}
    ).format(date);

    const hourFormat = new Intl.DateTimeFormat('es-ES', {
        hour: "2-digit",
        minute: "2-digit",
        hour12: false
    }).format(date);

    // Concatenar la fecha y hora
    const dateResult = `${dateFormat} : ${hourFormat}`;

    // Crea una nueva actividad.
    const newActivity = new Activity(crypto.randomUUID(), userId, action, dateResult, details);

    // Agrega la nueva actividad a los datos existentes.
    data.push(newActivity);

    // Encripta los datos actualizados y los guarda en el archivo.
    encryptFile(data, dbPath);
}

/**
 * Obtiene todas las actividades de un usuario específico.
 * @param param0 - Objeto que contiene el userId del usuario.
 * @returns Objeto con un estado ok y los datos de las actividades, o un mensaje de error.
 */
function getAllActivity({ userId }: Pick<ActivitySchema, "userId">) {
    try {
        // Desencripta el archivo y obtiene los datos existentes.
        const data = decryptFile<ActivitySchema[]>(dbPath) || [];

        // Filtra las actividades para obtener solo las del usuario especificado.
        const activitiesExcludedId = data.filter((actv) => actv.userId === userId);
        
        // Devuelve las últimas 10 actividades del usuario.
        return {
            ok: true,
            data: activitiesExcludedId.slice(
                activitiesExcludedId.length - 5, 
                activitiesExcludedId.length
            ),
        };

    } catch (error) {
        console.log(error);

        // Devuelve un mensaje de error si ocurre un problema.
        return {
            ok: false,
            message: "Error al recuperar la actividad de este usuario"
        };
    }
}

/**
 * Elimina todas las actividades de un usuario específico.
 * @param param0 - Objeto que contiene el userId del usuario.
 */
function deleteAllActivity({ userId }: Pick<ActivitySchema, "userId">) {
    // Desencripta el archivo y obtiene los datos existentes.
    const data = decryptFile<ActivitySchema[]>(dbPath) || [];

    // Filtra las actividades para excluir las del usuario especificado.
    const activitiesExcludedId = data.filter((actv) => actv.userId !== userId);

    // Encripta los datos actualizados y los guarda en el archivo.
    encryptFile(activitiesExcludedId, dbPath);
}

export {
    createActivity,
    getAllActivity,
    deleteAllActivity,
}