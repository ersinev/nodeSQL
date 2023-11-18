const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const mysql= require('mysql2')
require('dotenv').config();
const port = process.env.PORT ||5000

app.use(bodyParser.json());
const userTableCreation = require('./table_creations/userTableCreation')
const userDataInsertion = require('./data_insertion/userDataInsertion')
const getUserById = require('./queries/getSpecificUser');
const productsTableCreation = require('./table_creations/productsTableCreation');
const productsDataInsertion= require('./data_insertion/productsDataInsertion')
const connection = mysql.createConnection({
    host : "127.0.0.1",
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: "nodesql"
})

connection.connect((err)=>{
    if(err){
        console.error('Error conecting to database:', err)
        return
    }
    console.log("Connected to database")
})
//TABLE CREATION
connection.query(userTableCreation, (error, results, fields)=>{
    if(error){
        console.error('Error executing table creation query:', error)
    }else{
        console.log('User table created successfully')
    }
})

connection.query(productsTableCreation, (error, result)=>{
    if (error) {
        console.error('Failed to create products table')
        
    }else{
        console.log('products table created succesfully')
    }

})

//INSERTING DATA
app.post('/adduser', (req,res)=>{
    const userData = req.body
    const query = userDataInsertion(userData)
    connection.query(query,(insertError, insertResults)=>{
        if(insertError){
            console.error('Error inserting data', insertError)
            res.status(500).send('Error inserting data')
            return
        }else{
            console.log('Data inserted successfully')
            res.send('User added successfully')
        }
    })
  

})


app.get('/addproducts',(req,res)=>{
    connection.query(productsDataInsertion,(err, result)=>{
        if (err) {
            console.error('Failed to add products', err)
            
       }else{
        console.log('Products successfully added')
       }
    })

})

app.get('/user/:id',(req,res)=>{
    connection.query()
})

app.listen(port,()=>{
    console.log(`server is running on ${port}`)
})

app.get('/',(req,res)=>{
    res.send('homepage')
})

