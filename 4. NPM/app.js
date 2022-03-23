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
        if (validator.isMobilePhone(mobile) == true)
        {
            rl.question(`This your email? `, (email)=>
            {
            if(validator.isEmail(email) == true){
            console.log(`Terimakasih ${name}, Nomor telephone kamu ${mobile}, Dengan email ${email}`);
            rl.close();
            process.exit();
            }else {
                console.log('Maaf email yang anda masukan salah');
            }
            });
        }else {
            console.log('Maaf nomor anda tidak terdaftar');
        }



    });
});