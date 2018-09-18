const knex = require('knex')({
  client: 'pg',
  connection: {
    host: 'localhost',
    user: 'development',
    password: 'development',
    database: 'test_db'
  }
});

knex('famous_people')
  .insert({
    first_name: `${process.argv[2]}`,
    last_name: `${process.argv[3]}`,
    birthdate: `${process.argv[4]}`,
  }, 'first_name')
  .then(name => {
    console.log(`Inserted '${name}' into famous_people`)
    knex.destroy();
  });