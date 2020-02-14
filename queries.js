module.exports = {

  getByNameQuery: function (a){
  const query = {
  text: "SELECT event_name, TO_CHAR(starting, 'YYYY-MM-DD HH24:MI:SS'), TO_CHAR(ending, 'DD/MM/YYYY HH24:MI') FROM calendar WHERE event_name = $1",
  values: [a]
  }
  return query
  },

createNewEventQuery: function (a,b,c){
  const query = {
  text : "INSERT INTO calendar (event_name, starting, ending) VALUES ($1, TO_DATE($2, 'DD-MM-YYYY HH24:MI'), TO_DATE($3, 'DD-MM-YYYY HH24:MI'))",
  values: [a,b,c]
  }
  console.log(query)
  return query;
  },

getAllEventsQuery: function (){
  const query = {
  text : "SELECT * FROM calendar"
  }
  return query;
  },

  getByIdQuery: function (a){
  const query = {
  text : 'SELECT * FROM calendar WHERE id = $1',
  values: [a]
  }
  return query;
  },

getByDateQuery: function (a){
  const query ={
    text: "SELECT * FROM calendar WHERE starting= $1 OR ending= $1",
    values: [a]
  }
  console.log(query)
  return query;
  },

deleteByNameQuery: function(a){
  const query = {
    text : 'DELETE FROM calendar WHERE event_name = $1',
    values: [a]
  }
  return query;
}

}