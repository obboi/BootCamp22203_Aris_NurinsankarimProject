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
        contacts.saveContact(argv.name,argv.email,argv.mobile);
        const contact={
            name:argv.name,
            email:argv.email,
            mobile:argv.mobile,  
        };
        
        console.log(contact);
    },
});
yargs.parse();