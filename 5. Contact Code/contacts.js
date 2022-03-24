const fs = require('fs');
const readline = require('readline');
const rl = readline.createInterface({
    input : process.stdin,
    output : process.stdout,
});

//make a function to ask
const question = (ask)=>{
    return new Promise((resolve,reject)=>{
        rl.question(ask,(inputVariable)=>{
            resolve(inputVariable);
        });
    });
};

const saveContact = (name,mobile,email) =>{
    const contact = {name, mobile, email};
    const file = fs.readFileSync('data/contacts.json','utf8')
    const contacts = JSON.parse(file);
    contacts.push(contact);
    fs.writeFileSync('data/contacts.json',JSON.stringify(contacts));
    console.log('Nuhun~~~~');
    rl.close();
}

module.exports = {saveContact, question}