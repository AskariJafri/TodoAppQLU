const pgp = require('pg-promise')(/* options */)
const db = pgp('postgres://postgres:Billi[8]@localhost:5432/TodoDB')

// Insert Query 
// db.none(`Insert INTO public."Users"(username,password,userId) VALUES($1,$2,$3)`,
//  ['Jafar Hasnain','qwerty123','37432']);

// For Multiple Results or None returned from the query 


const getData = () => {
    console.log("getting data")
    db.manyOrNone(`SELECT * FROM public."Users"
    ORDER BY "userid" ASC `)
        .then((data) => {
            console.log('DATA:', data)
            return data
        })
        .catch((error) => {
            console.log('ERROR:', error)
        })
}


module.exports = { getData }