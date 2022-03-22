const readline = require("readline");
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

rl.question("Masukan nama anda : ", function(name)
 {
    rl.question("Masukan alamat anda : ", function(country)
    {
         rl.question("Masukan hobi anda ", function(hobi)
        {
        console.log(`${name}, tinggalnya di ${country}, hobi nya ${hobi}`);
        rl.close();
        });
    });
});

rl.on("close", function() {
    console.log("\nBYE BYE !!!");
    process.exit(0);
});