# personal_calendar_v2
*Updated version of older personal_calendar*

We use Express framework to manage our requests. Behind we have local PostgreSQL database to store data. New addition is CSRF token to 

## Setup
First of all, install nodeJs:
https://nodejs.org/en/download/

Install all necessary libraries:
```
npm i nodemon body-parser cookie-parser csurf dotenv express pg 

```

Install PostgreSQL: https://www.postgresql.org/download/

Setup Postgres Db with username, password, port and database name of your choice.
You need an .env file to include all connection info for Postgress. Add .env file with following content:
```
DB_USER=pgUserName
DB_PASSWORD=pgPassWord
DB_HOST=IP
DB_PORT=PORT
DB_DATABASE=pgDmName
```
Note for Windows user: pg will try to use Windows username as default username if .env file is not found. Make sure you install ```dotenv``` and fill the .env file correctly

To ease the development used nodemon to automatically restart my nodeJs whenever I saved my .js files.
To run with nodemon:
```
npm run devStart
```
Pretty usefull, recommend.

## Endpoints
/                       GET, root, returns a CSRF token.

/getEvents              GET, returns all entries from the database.

/getEventByName/name    GET, returns entries with certain event name.

/getEventByDate/date    GET, returns etries with certain starting date.

/getEventById/id        GET, returns etries with certain id.

/newEvent               POST, creates new calendar entry, requires JSON body with following form:
```
{
	"eventName": "Kimble",
	"starting_date": "15/02/2020 16:00",
	"ending_date": "15/02/2020 18:00"
}
```
NOTE: ending_date is not mandatory

/updateEvent/id         PUT, updates row selected by ID. This includes a checking before executing. If given ID does not exist, response returns 404 status. This endpoint uses JSON body as described above.

/deleteEvent/is       DELETE, deletes event with given ID. This includes checking before executing. If given ID does not exist, response returns 404 status.
