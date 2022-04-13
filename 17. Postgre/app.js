const express = require('express')
var expressLayouts = require('express-ejs-layouts')
const { url } = require('inspector')
const path = require('path')
const fs = require('fs')
const pool = require('./db')
const morgan = require('morgan')
const app = express()
const port = 3000
const { body, validationResult, check } = require('express-validator');
const session = require ('express-session')
const cookieParser = require ('cookie-parser')
const flash = require ('connect-flash')


app.use(express.static(__dirname + '/public'));
app.use(express.urlencoded({extended: true})) //menampilkan console hasil inputan
app.use(express.json())

//pesan cepat(popup)
app.use(cookieParser('secret'))
app.use(
    session({
        cookie : {maxAge : 6000},
        secret : 'secret',
        resave : true,
        saveUninitialized : true
    })
)
app.use(flash())

//pengecakan ada/tidak ada file json
const dirPath='./data';
if(!fs.existsSync(dirPath)){
    fs.mkdirSync(dirPath);
}
//membuat file json jika tidak ada data
const dataPath = './data/contacts.json';
if(!fs.existsSync(dataPath)){
    fs.writeFileSync(dataPath,'[]','utf-8');
}

//membaca file json yg sudah ada
const loadContact = () => {
    const file = fs.readFileSync('data/contacts.json','utf-8');
    const contacts = JSON.parse(file);
    return contacts;
}

async function getAll() {
    const all = await pool.query(`
    SELECT * 
    FROM contacts
    `)
    return all
}

const saveContacts = (contacts) => {
    fs.writeFileSync('data/contacts.json', JSON.stringify(contacts));
}

const details = (name) => {
    const contacts = loadContact();
    let find = contacts.find((contact) => contact.name === name);
    return find;
}

const store = (name) => {
    let contacts = loadContact();
    let duplicate = contacts.find((contact) => contact.name === name);
    
    if(duplicate) {
        console.log('Kontak sudah ada');
        return false;
    }

    const push = contacts.push(name);
    if (push.length < 1){
        console.log('error');
    }else{
        fs.writeFileSync('./data/contacts.json', JSON.stringify(contacts))
    }
}





//instalation EJS dengan views
app.set('view engine','ejs') 
app.use(expressLayouts)
app.set("layout extractScripts", true)
app.use(morgan('dev'))

app.use((req, res, next) => {
    console.log('Time:', Date.now())
    next()
  })

//Home
app.get('/', async (req, res) => {
    try {
        const nama = 'Aris Nur Insan Karim'
        let index = 1
        const {rows : kontak } = await pool.query(`
        SELECT name, email, mobile
        FROM contacts
        `)
        res.render('index', {
            title: 'Home',
            nama,
            index,
            kontak,
            layout: 'layout/gabung',
        })
    }catch (err) {
        console.error(err.message)
    }
})
//About
app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        layout: 'layout/gabung',
    })
})
//Contact
app.get('/contact', async (req, res) => {
    try {
        const {rows : contact } = await pool.query(`
        SELECT name, email, mobile
        FROM contacts
        `)
        let index = 1
        res.render('contact', {
            title: 'Contact',
            index,
            contact,
            layout: 'layout/gabung',
            msg: req.flash('msg'),
        })
        console.log(contact)
    }catch (err) {
        console.error(err.message)
    }
})
app.get('/contact/add-contact', (req, res) => {
    res.render('add-contact', {
        title: 'New Contact',
        layout: 'layout/gabung',
    })
})
//Add contact
app.post('/contact/store',
[
    body('name').custom(async (value, ) => {
        const select = await pool.query(`
        SELECT name FROM contacts WHERE name = '${value}'
        `)
        if (select.rowCount > 0) {
            throw new Error('Nama ini sudah digunakan')
        }
        return true
    }),
    check('mobile', 'nomor tidak ditemukan!').isMobilePhone(),
    check('email', 'email tidak valid!').isEmail()
],
    async(req, res) => {

    try {
        const err = validationResult(req)
    if(!err.isEmpty()){
        res.render('add-contact', {
            title: 'New Contact',
            layout: 'layout/gabung',
            err: err.array(), 
        })
    }else{
        console.log(req.body.name)
        const newCont = await pool.query(`
        INSERT INTO contacts values('${req.body.name}','${req.body.mobile}','${req.body.email}')
        `)
        req.flash('msg', 'Data berhasil ditambahkan')
        res.redirect('/contact')
    }
    } catch (err) {
        console.error(err.message)
    } 
})
//Details contact
app.get('/details/:name', async (req, res) => {
    try {
        const name = (req.params.name)
        const {rows : select} = await pool.query(`
        SELECT name, mobile, email
        FROM contacts
        WHERE name='${name}'
        `)
        select.map(kontak => {
            res.render('details', {
                title: 'Details',
                kontak,
                layout: 'layout/gabung',
            })
        })
    }catch (err) {
        console.error(err.message)
    }
})
//Delete Contact
app.get('/contact/delete/:name', async (req, res) => {
    const deleted = await pool.query(`
    DELETE FROM contacts
    WHERE name='${req.params.name}'
    `)
    if(!deleted) {
        req.flash('msg', 'Gagal Hapus!')
        res.redirect('/contact')
    }else{
        req.flash('msg', 'Berhasil dihapus')
        res.redirect('/contact')
    }
})
//edit contact
app.get('/contact/edit/:name', async (req, res) => {
    try {
        const name = (req.params.name)
        const {rows : select} = await pool.query(`
        SELECT name, mobile, email
        FROM contacts
        WHERE name='${name}'
        `)
        // untuk bisa menampilkan data yang tidak diketahui propertiesnya nampilin objek
        select.map(kontak => {
            res.render('edit', {
                title: 'Edit Contact',
                kontak,
                layout: 'layout/gabung',
            })
        })
    }catch (err) {
        console.error(err.message)
    }
})

//update contact
app.post('/contact/update',
[
    body('name').custom((value, {req}) => {
        const select = pool.query(`
        SELECT name FROM contacts
        WHERE name='${value}'
        `)
        if (value !== req.body.oldName && select) {
            throw new Error('Nama ini sudah digunakan')
        }
        return true
    }),
    check('mobile', 'nomor tidak ditemukan!').isMobilePhone('id-ID'),
    check('email', 'email tidak valid!').isEmail()
],
    async(req, res) => {
        try {
            const err = validationResult(req)
            if(!err.isEmpty()){
                res.render('edit', {
                    title: 'Form Edit',
                    layout: 'layout/gabung',
                    err: err.array(), 
                    kontak: req.body,
                })
            }else{
                const update = await pool.query(`
                UPDATE contacts 
                SET name = '${req.body.name}', mobile ='${req.body.mobile}', email ='${req.body.email}' 
                WHERE name='${req.body.oldName}'
                `)
                req.flash('msg', 'Data berhasil diubah')
                res.redirect('/contact')
            }
        } catch (err) {
            console.error(err.message)
        }    
})

//Checkbox Delete masal
app.post('/cekboxDelete', async (req, res) => {
    try {
        let {name} = req.body
        console.log(name)
        
        if(Array.isArray(name)){
            name.forEach(kontak => {
                destroy(kontak)
                req.flash('msg', 'Beberapa berhasil dihapus')
                res.redirect('/contact')
            });
        }else{
            const del1 = await pool.query(`
            DELETE FROM contacts
            WHERE name='${name}'`)
            req.flash('msg', 'Berhasil dihapus')
            res.redirect('/contact')
        } 
    } catch (err) {
        console.error(err.message)       
    }
})

async function destroy(value) {
    try {
        const destroy = await pool.query(`
        DELETE FROM contacts
        WHERE name='${value}'
        `)
        return destroy
    } catch (err) {
        console.error(err.message)        
    }
}


app.get('/product/:product_id', (req, res) => {
    res.send('product id : ' + req.params.product_id + '<br> category id : ' + req.query.category)
})

//error routes
app.use('/', (req, res) => {
    res.status(404);
    res.send('<h2>404 - Page Not Found!!</h2>');
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})