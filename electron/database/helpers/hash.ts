import crypto from "node:crypto";

const salt = crypto.randomBytes(16).toString('hex');
const iterations = 100000;
const keylen = 64;
const digest = "sha512";

function createHash(value: string) {
    return new Promise<string>((resolve, reject) => {
        crypto.pbkdf2(value, salt, iterations, keylen, digest, (error, derivedKey) => {
            if (error) return reject(error);

            resolve(derivedKey.toString("hex"));
        })
    })
}

function verifyPassword(password: string, hash: string) {
    return new Promise<boolean>((resolve, reject) => {
        crypto.pbkdf2(password, salt, iterations, keylen, digest, (error, derivedKey) => {
            if (error) return reject(error);

            resolve(derivedKey.toString("hex") === hash);
        })
    })
}

export {
    createHash,
    verifyPassword,
}