// This code generates a new JWT (JSON Web Token) key and adds it to the .env file.
const crypto = require('crypto');
const fs = require('fs');
const path = require('path');
const secret = crypto.randomBytes(64).toString('hex');
const envPath = path.resolve(__dirname, '../.env');

let envContent = '';
if (fs.existsSync(envPath)) {
    envContent = fs.readFileSync(envPath, 'utf8');
}

const jwtSecretLine = `JWT_SECRET=${secret}`;
if (envContent.includes('JWT_SECRET=')) {
    envContent = envContent.replace(/JWT_SECRET=.*/, jwtSecretLine);
} else {
    envContent += `\n${jwtSecretLine}`;
}

fs.writeFileSync(envPath, envContent, 'utf8');

console.log('JWT_SECRET has been generated and added to .env file.');
