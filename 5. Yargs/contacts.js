const validator = require('validator');
const fs = require('fs');
// const readline = require('readline');
// const rl = readline.createInterface({
//     input : process.stdin,
//     output : process.stdout,
// });

const dirPath = './data';
if(!fs.existsSync(dirPath)){
    fs.mkdirSync(dirPath);
}

const dataPath = './data/contacts.json';
if(!fs.existsSync(dataPath)){
    fs.writeFileSync(dataPath,'[]','utf-8')
}

//make a function to ask
// const question = (ask)=>{
//     return new Promise((resolve,reject)=>{
//         rl.question(ask,(inputVariable)=>{
//             resolve(inputVariable);
//         });
//     });
// };

const saveContact = (name,mobile,email) =>{
    const contact = {name, mobile, email};
    const file = fs.readFileSync('data/contacts.json','utf8')
    const contacts = JSON.parse(file);
    
    const duplicate=contacts.find((contact) => contact.name===name)
    if(duplicate){
        console.log('contact is already recorded. Use another contact name.')
        return false
    }


    if(!validator.isMobilePhone(mobile, 'id-ID')){
        console.log("Nomor Hp salah")
        return false
    }

    if(typeof email === !null){
        if(!validator.isEmail(email)){
            console.log("Email tidak ada")
            return false
        }
    }
    contacts.push(contact);
    fs.writeFileSync('data/contacts.json',JSON.stringify(contacts));
    console.log('Nuhun~~~~');
    // rl.close();
}   

module.exports = {saveContact}
