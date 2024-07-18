const formData = require('form-data');
const Mailgun = require('mailgun.js');
const mailgun = new Mailgun(formData);
const mg = mailgun.client({username: '3900', key: process.env.MAILGUN_API_KEY || 'c1ba069654c85d54cb983009a9d63e5d-91fbbdba-80fe85b5'});

mg.messages.create('sandbox3747d344533a475382f1db5f00911f48.mailgun.org', {
from: "Zehua Zhou <mailgun@sandbox3747d344533a475382f1db5f00911f48.mailgun.org>",
to: ["bzzzz19322@gmail.com"],
subject: "Hello",
text: "Testing some Mailgun awesomeness!",
html: "<h1>Testing some Mailgun awesomeness!</h1>"
})
.then(msg => console.log(msg)) // logs response data
.catch(err => console.log(err)); // logs any error