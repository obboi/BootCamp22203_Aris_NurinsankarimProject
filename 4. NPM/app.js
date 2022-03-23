const validator = require('validator');

const readline = require('readline');

const rl = readline.createInterface({
    input : process.stdin,
    output : process.stdout,
});

rl.question(`What is your name? `, (name)=>
 {
    rl.question(`your mobile number `, (mobile)=>
     {
        validator.isMobilePhone(mobile);
        if (validator.isMobilePhone(mobile) == false);
        console.log()
        console.log('Nomor yang kamu masukan salah');
        rl.close();
        process.exit();

         rl.question(`This your email? `, (email)=>
         {
            validator.isEmail(email);
            if (validator.isEmail(email) == false);
            console.log()
            console.log('Email yang kamu masukan salah');
            rl.close();
            process.exit();

         console.log(`Thank you ${name}, your mobile number is ${mobile}`);
         rl.close();
        });
    });
});