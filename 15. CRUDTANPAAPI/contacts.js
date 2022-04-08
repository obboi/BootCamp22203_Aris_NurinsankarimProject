const fs = require('fs');
const validator = require('validator');
// const readline = require('readline');
// let rl = readline.createInterface({
//     input: process.stdin,
//     output: process.stdout,
// });

const dirPath='./data';
if(!fs.existsSync(dirPath)){
    fs.mkdirSync(dirPath);
}

const dataPath = './data/contacts.json';
if(!fs.existsSync(dataPath)){
    fs.writeFileSync(dataPath,'[]','utf-8');
}

// const Wquestions = (ask) => {
//     return new Promise((resolve, reject) => {
//         rl.question(ask, (name) => {
//             resolve(name);
//         })
//     })
// };

// ambil contact.json
const loadContact = () => {
    const file = fs.readFileSync('data/contacts.json','utf-8');
    const contacts = JSON.parse(file);
    return contacts;
}

const listContact = () => {
    const contacts = loadContact();
    console.log('Contact List : ');
    contacts.forEach((contact, i) => {
        console.log(`${i+1}. ${contact.name} - ${contact.phone}`);
    });
};

// cari kontak berdasarkan nama
const findContact = (name) => {
    const contacts = loadContact()
    const contact = contacts.find((contact) => contact.name=== name);
    return contact;
}

// menuliskan/menimpa file contacts.json dengan data yang baru
const saveContacts = (contacts) => {
    fs.writeFileSync('data/contacts.json', JSON.stringify(contacts));
}

// update contact





// menambahkan data contact baru
const addContact = (contact)=>{
    const contacts = loadContact();
    contacts.push(contact);
    saveContacts(contacts);
}



// cekduplikat
const checkDuplicate = (name) =>{
    const contacts = loadContact();
    return contacts.find((contact) => contact.name === name);
}

const simpanContacts = (name, phone, email) => {
    const contact = {name, phone, email};
    // const file = fs.readFileSync('data/contacts.json','utf-8');
    // const contacts = JSON.parse(file);
    const contacts = loadContact();
    let duplicate = contacts.find((contact) => contact.name === name);
    
    //mengatasi duplikat data
    if(!duplicate) {
        console.log('Contact name is already recorded. Use another contact name.');
        return false;
    }

    //validasi nomor HP indo
    if (!validator.isMobilePhone(phone, 'id-ID')) {
        console.log('Nomor Hp Salah!');
        return false;
    }

    //validasi email jika ada
    if (typeof email === !null){
        if (!validator.isEmail(email)) {
            console.log('Email salah!');
            return false;
        }
    }
    
    contacts.push(contact);
    fs.writeFileSync(dataPath, JSON.stringify(contacts));
    console.log('Thank You');
 }

// proses delete contact
const deleteContact = (name)=>{
    const contacts = loadContact()
    const fileteredContacts = contacts.filter((contact) => contact.name !== name)
    saveContacts(fileteredContacts)
  }
  

  const updateContacts =(contactBaru) =>{
    const contacts = loadContact()
    // hilangkan contact lama yang namanya sama dengan oldName
    const fileteredContacts = contacts.filter((contact)=> contact.name!== contactBaru.oldName)
    delete contactBaru.oldName
    fileteredContacts.push(contactBaru)
    saveContacts(fileteredContacts)
}


 module.exports = {
    saveContacts,
    listContact,
    loadContact,
    findContact,
    addContact,
    simpanContacts,
    checkDuplicate,
    deleteContact,
    updateContacts,
}