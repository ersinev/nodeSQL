const express = require('express')
const app = express()
const port = 3005
const mysql= require('mysql2')

const userTableCreation = require('./table_creations/userTableCreation')
const userDataInsertion = require('./data_insertion/userDataInsertion')

const connection = mysql.createConnection({
    host : "127.0.0.1",
    user: "root",
    password: "1234",
    database: "nodesql"
})

connection.connect((err)=>{
    if(err){
        console.error('Error conecting to database:', err)
        return
    }
    console.log("Connected to database")
})

connection.query(userTableCreation, (error, results, fields)=>{
    if(error){
        console.error('Error executing table creation query:', error)
    }else{
        console.log('User table created successfully')
    }
})

app.get('/adduser', (req,res)=>{
    connection.query(userDataInsertion,(insertError, insertResults)=>{
        if(insertError){
            console.error('Error inserting data', insertError)
        }else{
            console.log('Data inserted successfully')
        }
    })
    res.send('users added succesfully')

})





app.listen(port,()=>{
    console.log(`server is running on ${port}`)
})

app.get('/',(req,res)=>{
    res.send('homepage')
})

