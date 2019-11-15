const mailgun = require('mailgun-js');
const DOMAIN = 'hakaya.news';
const mg = mailgun({ apiKey: '2750611af90327ca1537e5ab636baaa2-c50f4a19-62a64063', domain: DOMAIN, host: "api.eu.mailgun.net" });
export function sendMail(mail, resetCode) {
    const data = {
        from: 'Hakaya mail@hakaya.news',
        to: `${mail}`,
        subject: 'Reset Password',
        text: ` Hi , 
        Your code is ${resetCode} .`
    };
    mg.messages().send(data, (error, body) => {
        console.log(body);
    });
}
