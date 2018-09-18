const pg = require("pg");
const settings = require("./settings"); // settings.json

const client = new pg.Client({
  user: settings.user,
  password: settings.password,
  database: settings.database,
  host: settings.hostname,
  port: settings.port,
  ssl: settings.ssl
});

client.connect((err) => {
  if (err) {
    return console.error("Connection Error", err);
  }
  console.log('Searching...');
  const query = `SELECT * FROM famous_people
    WHERE first_name ILIKE $1::text
    OR last_name ILIKE $1::text;`;
  client.query(query, [`%${process.argv[2]}%`], (err, result) => {
    if (err) {
      return console.error("error running query", err);
    }

    console.log(`Found ${result.rows.length} person(s) by the name ${process.argv[2]}`);
    let i = 1;
    result.rows.forEach(x => {
      const line = `- ${i} ${x.first_name} ${x.last_name}, born '${x.birthdate.toLocaleString().slice(0,-9)}'`;
      console.log(line);
      i ++;
    })
    client.end();
  });
});