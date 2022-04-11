// panggil modul express
const express = require("express");
const res = require("express/lib/response");
// panggil express library
const app = express()
// panggil database
const pool = require("./db")

app.use(express.json()) // => req.body
const port = 3000

// panggil server
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})

// instert data to database/add data
app.get("/addasync", async (req, res)=>{
    try{
    const name = "Rika Tresna Asih"
    const mobile = "08845468446"
    const email = "rktak@gmail.com"
    //digunakan untuk menambahkan data kepada postgresql
    const newCont = await pool.query(`INSERT INTO contacts VALUES ('${name}','${mobile}','${email}') RETURNING *`)
    res.json(newCont)
    }   catch(err){
        console.error(err.message)
    }
})

// list
app.get("/listasync", async (req, res)=>{
    try{
    //menampilkan form pada posgresql
    const listCont = await pool.query(`SELECT * FROM contacts`) 
    //rows digunakan untuk menampilkan seluruh isi baris 
    res.json(listCont.rows) 
    }   catch(err){
        console.error(err.message)
    }
})