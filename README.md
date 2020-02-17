# personal_calendar_v2
*Updated version of older personal_calendar*

We use Express framework to manage our requests. Behind we have local PostgreSQL database to store data. New addition is CSRF token to 

## Setup
First of all, install nodeJs:
https://nodejs.org/en/download/

Install all necessary libraries:
```
npm i nodemon body-parser cookie-parser csurf dotenv express express-session pg 

```

Install PostgreSQL:
```
https://www.postgresql.org/download/
```
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
