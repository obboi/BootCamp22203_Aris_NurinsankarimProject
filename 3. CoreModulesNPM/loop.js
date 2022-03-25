const validator = require('validator');
const readline = require('readline');
const rl = readline.createInterface({
    input : process.stdin,
    output : process.stdout,
});

function waitForInputName(){
    rl.question("Masukan ID : ", (nameAnswer) =>{
        waitForUserInputNumber();

        function waitForUserInputNumber(){
            validator.isMobilePhone, rl.question("Masukan Nomer Hp/WA :", (numberAnswer) =>{
                if(!validator.isMobilePhone(numberAnswer)){
                    console.log("Coba lagi");
                    waitForInputNumber();
                }else{
                    waitForInputName()
                }
                function waitForInputEmail(){
                    validator.isEmail, rl.question("Masukan Email :", (emailAnswer) =>{
                        if(!validator.isEmail(emailAnswer)){
                            console.log(`Dengan Bapak/Ibu \n ${namaAnswer}`,` dengan nomor hp \n ${numberAnswer}`,`dan alamat email \n ${emailAnswer}`);
                            rl.close();
                        }

                    })
                }
            });
        }
    })
}
waitForInputName