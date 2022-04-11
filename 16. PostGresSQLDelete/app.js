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
    const name = "Dodi"
    const mobile = "088454123446"
    const email = "dod@gmail.com"
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
    //menampilkan from pada posgresql
    const listCont = await pool.query(`SELECT * FROM contacts`) 
    //rows digunakan untuk menampilkan seluruh isi baris 
    res.json(listCont.rows) 
    }   catch(err){
        console.error(err.message)
    }
})

//ditel kontak
app.get("/detailasync/:name", async (req, res)=>{
    try{
    //meload database berdasarkan kondisi(WHERE) name from pada posgresql
    const listCont = await pool.query(`SELECT * FROM contacts WHERE name ='${req.params.name}'`) 
    //rows digunakan untuk menampilkan seluruh isi baris 
    res.json(listCont.rows) 
    }   catch(err){
        console.error(err.message)
    }
})

//menghapus berdasarkan name
app.get("/deleteasync/:name", async (req, res)=>{
    try{
    //menghapus berdasarkan name
    const deleteCont = await pool.query(`DELETE FROM contacts WHERE name ='${req.params.name}'`) 
    // menampilkan sisa data yg ada pada tabel
    const listCont = await pool.query(`SELECT * FROM contacts`) 
    //rows digunakan untuk menampilkan seluruh isi baris 
    res.json(listCont.rows)
    }   catch(err){
        console.error(err.message)
    }
})