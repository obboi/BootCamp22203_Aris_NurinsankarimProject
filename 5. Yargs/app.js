const { stringify } = require("querystring");
const { parse } = require("yargs");
const yargs = require ("yargs");
const contacts = require('./contacts.js');
// console.log(yargs.argv)
yargs.command({
    command:'add',
    describe:'add new contact',
    builder:{
        name:{
            describe:'contact name',
            demandOption:true,
            type:'string',
        },
        email:{
            describe:'contact email',
            demandOption:false,
            type:'string',
        },
        mobile:{
            describe:'contact mobile phone number',
            demandOption:true,
            type:'string',
        },
    },
    handler(argv){
        contacts.saveContact(argv.name,argv.mobile,argv.email);
        const contact={
            name:argv.name,
            email:argv.mobile,
            mobile:argv.email,  
        };
        
        console.log(contact);
    },
});
yargs.parse();