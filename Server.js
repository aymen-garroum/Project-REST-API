// MODULES AND PARAMETERS REQUIRED FOR DB CONNECTION AND EXPRESS SERVER

require('dotenv').config({path: './config/.env'})

let User = require('./models/Users')

const express = require('express')

const router = express.Router()

const PORT = process.env.PORT || 3000

// DB CONNECTION 

const db_connect = async() => {
    try{await require('mongoose').connect(process.env.DB_URI,{useNewUrlParser: true,useUnifiedTopology: true},(err,data)=>{
        console.log("Base de données connectée")
    })

    }catch(err){`L'erreur suivante est survenue ${err}`}
}

const app = express()

app.use(express.json());

db_connect()

// DOCUMENTS ADDED TO POPULATE USER COLLECTION

// const tab = [{name: "Aymen Garroum", email: "aymen@gmail.com", age: 37},
//             {name: "Ahmed Ben Salah", email: "ahmed@gmail.com", age: 30},
//             {name: "Housem El-Gasfi", email: "housem@gmail.com", age: 25},
//             {name: "Mokhtar Ayari", email: "mokhtar@gmail.com", age: 40}
//             ]

// const add_Users = async() => {
//     try{await User.create(tab, (err, docs)=> {
//         console.log("Utilisateurs ajoutés avec succès")
//     })
//     }catch(err){`L'erreur suivante est survenue ${err}`}
// }

// add_Users()

// GET ROUTE

router.get('/', (req, res)=> {
    User.find({}, (err, docs) => {
        if(err){res.send(`L'erreur suivante est survenue ${err}`)}
        res.send(docs)
    })
})

// POST ROUTE

router.post('/', (req,res)=>{
    
    let new_User = new User({name: req.body.name, email: req.body.email, age: req.body.age})

    new_User.save((err,docs)=>{
        if(err){res.send(`L'erreur suivante est survenue ${err}`)}
        res.send("Utilisateur ajouté avec succès")
    })
})

// PUT ROUTE

router.put('/users/:userId', async (req,res) => {
    try{const found_user = await User.findById(req.params.userId)

        if(req.body.name){found_user.name = req.body.name}
        if(req.body.email){found_user.email = req.body.email}
        if(req.body.age){found_user.age = req.body.age}

        await found_user.save()

        res.send("Données utilisateur modifiées avec succès")

    }catch(err){res.send(`L'erreur suivante est survenue ${err}`)}
})

//DELETE ROUTE

router.delete('/users/:userID', async(req,res) => {
    try{ const found_user = await User.findByIdAndDelete(req.params.userID, (err,docs)=>{
        if(docs){res.send("Utilisateur supprimé avec succès")}
    })

    }catch(err){res.send(`L'erreur suivante est survenue ${err}`)}
})

app.use(router)

app.listen(PORT)

