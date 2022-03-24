// const fs = require('fs');
// const readline = require('readline');
// const rl = readline.createInterface({
//     input : process.stdin,
//     output : process.stdout,
// });

// const dirPath = './data';
// if(!fs.existsSync(dirPath)){
//     fs.mkdirSync(dirPath);
// }

// const dataPath = './data/contacts.json';
// if(!fs.existsSync(dataPath)){
//     fs.writeFileSync(dataPath,'[]','utf-8')
// }



// rl.question('What is your name?',(name)=>{
//     rl.question('your mobile number',(mobile)=>{
//         const contact = {name,mobile}
//         const file = fs.readFileSync('data/contacts.json', 'utf8')
//         const contacts = JSON.parse(file);
//         contacts.push(contact);
//         fs.writeFileSync('data/contacts.json',JSON.stringify(contacts));
//         console.log('terimakasih sudah memasukan data!');
//         rl.close();
//     });
// });

const contacts = require('./contacts');

const main = async () =>{
    const name = await contacts.question('Saha ngaran maneh saha? \n');
    const email = await contacts.question('naon email maneh? \n');
    const mobile = await contacts.question('boga wa teu? \n');
     
    contacts.saveContact(name, email, mobile);
};

main();
