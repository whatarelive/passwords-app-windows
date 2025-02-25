import crypto from "node:crypto";
import { decryptFile, encryptFile } from "../helpers/file-crypto";
import { Activity, ActivitySchema } from "../schemas/activity";

const dbPath = "activities.enc";

function createActivity({ userId, action, details }: Omit<ActivitySchema, "id" | "date">) {
    try {
        const data = decryptFile<ActivitySchema[]>(dbPath) || [];

        const date = new Date();

        const newActivity = new Activity(crypto.randomUUID(), userId, action, date, details);

        data.push(newActivity);

        encryptFile(data, dbPath);

    } catch (error) {
        console.log("Error al registrar una acitivdad:" ,error);
    }
}

function getAllActivity({ userId }: Pick<ActivitySchema, "userId">) {
    try {
        const data = decryptFile<ActivitySchema[]>(dbPath) || [];

        const acititiesExcludedId = data.filter((actv) => actv.userId === userId);
        
        return acititiesExcludedId.slice(0, 10);

    } catch (error) {
        console.log("Error al devolver las actividades del ususario", error);
    }
}

function deleteAllActivity({ userId }: Pick<ActivitySchema, "userId">) {
    try {
        const data = decryptFile<ActivitySchema[]>(dbPath) || [];

        const acititiesExcludedId = data.filter((actv) => actv.userId !== userId);

        encryptFile(acititiesExcludedId, dbPath);

    } catch (error) {
        console.log("Error al eliminar las actividades del usuario:", error);
    }
}

export {
    createActivity,
    getAllActivity,
    deleteAllActivity,
}