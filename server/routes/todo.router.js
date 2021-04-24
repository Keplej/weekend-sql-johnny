// const { response } = require('express');
const express = require('express');
const todoRouter = express.Router();

// DB connection
const pool = require('../modules/pool');


// GET route
todoRouter.get('/', (req, res) => {
    let queryText = 'SELECT * FROM "todo" ORDER BY "notes";';
    pool.query(queryText).then(result => {
        // Send back the results in an object
        res.send(result.rows);
    })
    .catch(error => {
        console.log('error getting to do list', error);
        res.sendStatus(500);
    });
});

// POST route
todoRouter.post('/', (res, req) => {
    let newTodoPost = req.body;
    console.log('Adding new to list', newTodoPost);

    let queryText = `INSERT INTO "todo" ("notes", "completed") 
                    VALUES ($1, $2);`;

    pool.query(queryText, [newTodoPost.notes, newTodoPost.completed])
    .then(result => {
        res.sendStatus(201);
    })
    .catch(error => {
        console.log(`Error adding Task to server:`, error);
        res.sendStatus(500);
    });
});

// PUT route
todoRouter.put('/:id', (req, res) => {
    let id = req.params.id;
    let sqlText = `UPDATE "todo" SET "completed" = 'Yes' WHERE "id=$1";`;
    
    pool.query(queryText, [id])
    .then(response => {
        console.log('You updated a task!');
        res.sendStatus(201);
    })
    .catch(error => {
        console.log('Error in updating task', error);
        res.sendStatus(500);
    })
})

// DELETE route


module.exports = todoRouter;