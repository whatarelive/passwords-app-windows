import { mockData } from "@/data/mockData";

function getWebAccountForId(id: String) {
    try {
        const webAccount = mockData.find((account) => account.id === id);

        if (!webAccount) {
            throw new Error("No se encontro la cuenta");
        }

        return webAccount;

    } catch (error) {
        console.log(error);
    }
}

export {
    getWebAccountForId,
}