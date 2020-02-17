const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const queries = require('./queries');
const csrf = require('csurf');
const cookieParser = require('cookie-parser');
require('dotenv').config();

// CSRF middleware
var csrfProtection = csrf({cookie : true});

//POSTGRESQL
const { Pool, Client } = require('pg')
const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_DATABASE,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
  query_timeout: 5000
})

// Set body parser
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
)
app.use(cookieParser());
app.use(csrfProtection);


app.use(function(err, req, res, next) {
  if (err.code !== 'EBADCSRFTOKEN') return next(err);
  res.status(403).json({"error": "Error with token"});
});


// ROOT
app.get('/', function (req, res) {
  res.cookie('XSRF-TOKEN', req.csrfToken());
  res.send(req.csrfToken())
});

// get all events
app.get('/getEvents', function(req,res){
  const query = queries.getAllEventsQuery()
  console.log("Get all: "+ queries.getAllEventsQuery())
  pool.query(query, (error, results)=>{
    if(error){
      throw error;
    }
    res.json(results.rows)
  })
})

app.post('/newEvent', function(req, res) {
  var query = queries.createNewEventQuery(req.body.eventName,req.body.starting_date, req.body.ending_date)
  console.log("New Event: "+query)
  pool.query(query), (error) => {
    if(error){
      throw error;
    }
  };
  res.status(200).send()
})  

// GET EVENT BY NAME
app.get('/getEventByName/:name', function(req, res){
  const query = queries.getByNameQuery(req.params.name)
  pool.query(query, (error, results)=>{
    if(error){
      throw error;
    }
    else if(results.rows == ""){
      console.log("Its empty")
      res.send("This game does not appear on the list, is this the game your looking for?")
      return;
    }
  res.json(results.rows)
  })
})

// GET EVENTS BY DATE
app.get('/getEventByDate/:date', function(req, res){
  const query = queries.getByDateQuery(req.params.date)
  pool.query(query, (error, results)=>{
    if(error){
      throw error;
    }
    else if(results.rows == ""){
      console.log("Its empty")
      res.status(404).send()
      return;
    }
    else{
      res.json(results.rows)
    }
  })
})

// PUT
app.put('/updateEvent/:id', function (req, res) {
    //check for the name
    var id = req.params.id
    const query = queries.getByIdQuery(id)
    pool.query(query, (error, results)=>{
      if(error){
        throw error;
      }
      else if(results.rows == ""){
        console.log("Its empty")
        res.status(404).send()
        return;
      }
      else{
        var name, start, end, builtQuery;
        var values = [];
        name = req.body.eventName;
        start = req.body.starting_date;
        end = req.body.ending_date;
        // build query here
        builtQuery = 'UPDATE calendar SET ';
        values.push(id);
        console.log(values)
        if(name != ''){
          builtQuery += 'event_name = $2 ';
          values.push(name)
        }
        if(start != ''){
          if(name != ''){
            builtQuery +=',';
          }
          builtQuery += 'starting= $3'
          values.push(start)
        }
        if(end != ''){
          if(name || start != ''){
            builtQuery += ',';
          }
          builtQuery += 'ending = $4'
          values.push(end)
        }
        builtQuery += ' WHERE id = $1'
        var query = {
          text: builtQuery,
          values: values
        }
        console.log("New Event: "+builtQuery)
        pool.query(query), (error) => {
          if(error){
            throw error;
          }
        }
        res.status(200).send()
      }
    })
})

// DELETE EVENT
app.delete('/deleteEvent/:name', async (req, res)  =>{
    // check
    var name = req.params.name
    const query = queries.getByNameQuery(name)
    pool.query(query, (error, results)=>{
      if(error){
        throw error;
      }
      else if(results.rows == ""){
        console.log("Its empty")
        res.status(404).send()
        return;
      }
      else{
        var deletingQuery = queries.deleteByNameQuery(name)
        console.log("Query is: ",deletingQuery)
        pool.query(deletingQuery), (error, results) => {
        if(error){
          throw error;
        }
        console.log(results)
        }
        res.status(200).send()
      }
    })
  })

app.listen(3000, function () {
  console.log('Calendar app listening on port 3000!');
});
