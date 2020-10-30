const fs = require('fs');
const crypto = require('crypto');

const password = '1234567'

const Salt = () => new Promise( (resolve, reject) => {
    crypto.randomBytes(64, (err, buf) => {
      resolve(buf.toString('base64')); 
    });
});

const encrpytPassword = salt => new Promise( (resolve, reject) => {
    crypto.pbkdf2(password, salt, 100000, 64, 'sha512', (err, key) => {
      resolve(key.toString('base64'));
    });
});

const writeFile =  encryptedPassword => new Promise( (resolve, reject) => {
    fs.writeFileSync(`encryptedPassword.txt`, encryptedPassword);
});


async function encrypt() {
    try {
        const salt = await Salt();
        const encryptedPassword = await encrpytPassword(salt);
        await writeFile(encryptedPassword);
    } catch(error) {
        console.error(error);
    }finally {
        console.log('완료');
    }
}

encrypt();