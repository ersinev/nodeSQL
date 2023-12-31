const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mysql = require('mysql2');
require('dotenv').config();
const port = process.env.PORT || 5000;

app.use(bodyParser.json());

const userTableCreation = require('./table_creations/userTableCreation');
const userDataInsertion = require('./data_insertion/userDataInsertion');
const getUserById = require('./queries/getSpecificUser');
const productsTableCreation = require('./table_creations/productsTableCreation');
const productsDataInsertion = require('./data_insertion/productsDataInsertion');

const connection = mysql.createConnection({
    host: "127.0.0.1",
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: "nodesql"
});

connection.connect((err) => {
    if (err) {
        console.error('Error connecting to database:', err);
        return;
    }
    console.log("Connected to database");
});

//-------------------------------- TABLE CREATION ------------------------------------------------
connection.query(userTableCreation, (error, results, fields) => {
    if (error) {
        console.error('Error executing table creation query:', error);
    } else {
        console.log('User table created successfully');
    }
});

connection.query(productsTableCreation, (error, result) => {
    if (error) {
        console.error('Failed to create products table');
    } else {
        console.log('Products table created successfully');
    }
});

//---------------------------- INSERTING DATA ------------------------------------------------------
app.post('/adduser', (req, res) => {
    const userData = req.body;

    connection.query(userDataInsertion(userData), (insertError, insertResults) => {
        if (insertError) {
            console.error('Error inserting data', insertError);
            res.status(500).send('Error inserting data');
            return;
        } else {
            console.log('Data inserted successfully');
            res.send('User added successfully');
        }
    });
});

app.post('/addproduct', (req, res) => {
    const productData = req.body;
    connection.query(productsDataInsertion(productData), (err, result) => {
        if (err) {
            console.error('Failed to add products', err);
            res.status(500).send('Failed to add products');
        } else {
            console.log('Products successfully added');
            res.send('Products added successfully');
        }
    });
});

//--------------------------- GET USER BY ID ----------------------------------------------------
app.get('/user/:id', (req, res) => {
    const userId = req.params.id;

  
    const query = getUserById(userId);

    console.log('SQL Query:', query.sql);
    console.log('Query Values:', query.values);

    connection.query(query.sql, query.values, (err, result) => {
        if (err) {
            console.error('Error querying database:', err);
            res.status(500).send('Internal Server Error');
        } else {
            if (result.length > 0) {
                console.log(`User with ID ${userId}:`, result);
                res.status(200).json(result);
            } else {
                console.log(`User with ID ${userId} not found`);
                res.status(404).send('User not found');
            }
        }
    });
});

app.listen(port, () => {
    console.log(`Server is running on ${port}`);
});

app.get('/', (req, res) => {
    res.send('Homepage');
});
