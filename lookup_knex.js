const knex = require('knex')({
  client: 'pg',
  connection: {
    host: 'localhost',
    user: 'development',
    password: 'development',
    database: 'test_db'
  }
});
knex.select()
  .from('famous_people')
  .where('first_name', 'ILIKE', `%${process.argv[2]}%`)
  .orWhere('last_name', 'ILIKE', `%${process.argv[2]}%`)
  .then( rows => {
    let i = 1;
    rows.forEach(person => {
      const line = `- ${i} ${person.first_name} ${person.last_name}, born '${person.birthdate.toLocaleString().slice(0, -9)}'`;
      console.log(line);
      i++;
    })
    knex.destroy();
  });
