import CryptoJS from 'crypto-js';

var JsonFormatter = {
    stringify: function (cipherParams) {
        // create json object with ciphertext
        var jsonObj = { ct: cipherParams.ciphertext.toString(CryptoJS.enc.Base64) };

        // optionally add iv or salt
        if (cipherParams.iv) {
            jsonObj.iv = cipherParams.iv.toString();
        }

        if (cipherParams.salt) {
            jsonObj.s = cipherParams.salt.toString();
        }

        // stringify json object
        return JSON.stringify(jsonObj);
    },
    parse: function (jsonStr) {
        // parse json string
        var jsonObj = JSON.parse(jsonStr);

        // extract ciphertext from json object, and create cipher params object
        var cipherParams = CryptoJS.lib.CipherParams.create({
            ciphertext: CryptoJS.enc.Base64.parse(jsonObj.ct)
        });

        // optionally extract iv or salt

        if (jsonObj.iv) {
            cipherParams.iv = CryptoJS.enc.Hex.parse(jsonObj.iv);
        }

        if (jsonObj.s) {
            cipherParams.salt = CryptoJS.enc.Hex.parse(jsonObj.s);
        }

        return cipherParams;
    }
};

const encrypt = (cipherText) => {
    let encrypted = CryptoJS.AES.encrypt(cipherText, "Secret Passphrase", {
        format: JsonFormatter
    })
    return encrypted;
};

const decrypt = (decipherText) => {
    let decrypted = CryptoJS.AES.decrypt(decipherText, "Secret Passphrase", {
        format: JsonFormatter
    });

    return decrypted.toString(CryptoJS.enc.Utf8);
}




const encryptAES = (data) => {
    let encrypted = CryptoJS.AES.encrypt(data, "123");
    return encrypted;
}

const decryptAES = (data) => {
    let decrypted = CryptoJS.AES.decrypt(data, "123");
    let decipherText = decrypted.toString(CryptoJS.enc.Utf8);
    return decipherText;
}

export {
    encryptAES,
    decryptAES,
    encrypt,
    decrypt
};