import crypto from "node:crypto";
import { decryptFile, encryptFile } from "../helpers/file-crypto";
import { Activity, ActivitySchema } from "../schemas/activity";

const dbPath = "activities.enc";

function createActivity({ userId, action, details }: Omit<ActivitySchema, "id" | "date">) {
    const data = decryptFile<ActivitySchema[]>(dbPath) || [];

    const date = new Date();

    const newActivity = new Activity(crypto.randomUUID(), userId, action, date, details);

    data.push(newActivity);

    encryptFile(data, dbPath);
}

function getAllActivity({ userId }: Pick<ActivitySchema, "userId">) {
    try {
        const data = decryptFile<ActivitySchema[]>(dbPath) || [];

        const acititiesExcludedId = data.filter((actv) => actv.userId === userId);
        
        return {
            ok: true,
            data: acititiesExcludedId.slice(
                acititiesExcludedId.length - 11, 
                acititiesExcludedId.length - 1
            ),
        } 

    } catch (error) {
        console.log(error);

        return {
            ok: false,
            message: "Error al recuperar la actividad de este usuario"
        }
    }
}

function deleteAllActivity({ userId }: Pick<ActivitySchema, "userId">) {
    const data = decryptFile<ActivitySchema[]>(dbPath) || [];

    const acititiesExcludedId = data.filter((actv) => actv.userId !== userId);

    encryptFile(acititiesExcludedId, dbPath);
}

export {
    createActivity,
    getAllActivity,
    deleteAllActivity,
}