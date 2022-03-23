const readline = require('readline');

const rl = readline.createInterface({
    input : process.stdin,
    output : process.stdout,
});

rl.question(`What is your name? `, (name)=>
 {
    rl.question(`your mobile number `, (mobile)=>
     {
         rl.question(`This your email? `, (email)=>
         {

         console.log(`Thank you ${name}, your mobile number is ${mobile}`);
         rl.close();
        });
    });
});
