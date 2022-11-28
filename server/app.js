const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const { getData } = require('./database')
var cors = require('cors')

const pgp = require('pg-promise')(/* options */)
const db = pgp('postgres://postgres:Billi[8]@localhost:5432/TodoDB')

app.use(cors())

// Insert Query 
// db.none(`Insert INTO public."Users"(username,password,userId) VALUES($1,$2,$3)`,
//  ['Jafar Hasnain','qwerty123','37432']);

// For Multiple Results or None returned from the query 




app.use(bodyParser.urlencoded())
app.use(bodyParser.json())
// app.use(cors)



const port = process.env.PORT || 3001
app.listen(port, () => {
    console.log(`Listening on port ${port}...`)
})


app.get('/', (req, res) => {
    res.send('working')
})



// Get all users 
app.get('/users', (req, res) => {
    db.manyOrNone(`SELECT * FROM public."Users"
    ORDER BY "userid" ASC `)
        .then((data) => {
            console.log('DATA:', data)
            res.json(data)
        })
        .catch((error) => {
            console.log('ERROR:', error)
            res.json(error)
        })
})

// get a specific user from id
app.get('/users/:id', (req, res) => {
    db.one(`select  * FROM public."Users" where userid = '${req.params.id}'`)
        .then((data) => {
            console.log('DATA:', data)
            res.json(data)
        })
        .catch((error) => {
            console.log('ERROR:', error)
            res.json(error)
        })
})

// get all the tasks of a specific user
app.get('/users/:id/tasks', (req, res) => {
    db.many(`select t.content, t.status,t.id FROM public."Users" u 
    inner join public."Tasks" t on t.u_id = u.userid
    where userid = '${req.params.id}'`)
        .then((data) => {
            console.log('DATA:', data)
            res.json(data)
        })
        .catch((error) => {
            console.log('ERROR:', error)
            res.json(error)
        })
})                                                  

// post in db when added a new task
app.post('/tasks',(req,res)=>{
    console.log(`insert into "Tasks" ("status","content","u_id") values ('${req.body.status}', '${req.body.content}','${req.body.u_id}' )`)
    console.log(`${JSON.stringify(req.body)}`)
    db.one(`insert into "Tasks" values ('${req.body.status}', '${req.body.content}','${req.body.u_id}' ) RETURNING id`)
    .then((data)=>{
        console.log(data)
        res.send(data)
    })
    .catch((error) => {
        console.log('ERROR:', error)
        res.json(error)
    })
})

// check user
app.post('/userAuth',(req,res)=>{   
//    console.log(`select  * FROM public."Users" where "Users".username LIKE '${req.body.username}' AND "Users".password LIKE '${req.body.password}'`)
    db.one(`select  * FROM public."Users" where "Users".username LIKE '${req.body.username}' AND "Users".password LIKE '${req.body.password}'`)
    .then((data)=>{
        res.send({userid:data.userid,username:data.username})        
    })
    .catch((error)=>{
        console.log(error)
        res.sendStatus(404)
    })
})

// // post user on login
// app.post('/usersins',(req,res)=>{
//     db.oneOrNone(`insert into "Users" values ('${req.body.id}', '${req.body.username}', '${req.body.password}')`)
//     .then((data)=>{
//         console.log(data)
//         res.json(data)
//     })
//     .catch((error) => {
//         console.log('ERROR:', error)
//         res.json(error)
//     })
// })

// delete specific task
app.post('/deleteTask/:id',(req,res)=>{   
       console.log(`DELETE FROM "Tasks" WHERE id = ${req.params.id};`)
       db.none(`DELETE FROM "Tasks" WHERE id = ${req.params.id};`)
       .then(()=>{
        console.log("deleted task")
       }).catch((error)=>{
        console.log(error)
       })
    })

// update content of a specific task
app.put('/updateStatus/',(req,res)=>{
    console.log(`Update "Tasks" SET status = '${req.body.status}' where id = ${req.body.id}`)   
    db.none(`Update "Tasks" SET status = '${req.body.status}' where id = ${req.body.id}`)
    .then(()=>{
     console.log("updatedStatus")
    }).catch((error)=>{
     console.log(error)
    })
})

app.put('/updateContent/',(req,res)=>{
    console.log(`Update "Tasks" SET  "content" = '${req.body.content}' where id = ${req.body.id}`) 
    db.none(`Update "Tasks" SET  "content" = '${req.body.content}' where id = ${req.body.id}`)
    .then(()=>{
     console.log("updatedContent")
    }).catch((error)=>{
     console.log(error)
    })
})