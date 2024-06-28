const sendInfoToDB = require('./sendInfoToDB');

const main = async () => {
    try {
        const userName = 'John999';
        const email = 'john.duuuo@example.com';
        const password = 'password1';

        const user = await sendInfoToDB(userName, email, password);
        console.log('User created:', user);
    } catch (error) {
        console.error('Error:', error);
    }
};

main();
