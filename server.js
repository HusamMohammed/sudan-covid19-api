const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
const knx = require('knex');
const total = require('./controllers/total')
const latest = require('./controllers/latest')
const todayCases = require('./controllers/todayCases')


const knex = knx({
    client: 'pg',
    connection: {
        host: '127.0.0.1',
        user: 'husam',
        password: 'husam',
        database: 'covid19-sudan'
    }
});

const app = express();


// middleware
app.use(bodyParser.json());
app.use(cors());


app.get('/total', total.handleTotal(knex));

app.get('/latest', latest.handleLatest(knex));

app.post('/todaycases', todayCases.handleTodayCases(knex));


app.listen(process.env.PORT || 5000);