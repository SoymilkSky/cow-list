const mysql2 = require('mysql2');

const connection = mysql2.createConnection({
  host: 'localhost',
  user: 'root',
  database: 'cowlist'
});

connection.connect((err) => {
  if (err) {
    console.log(err);
  } else {
    console.log('Connected to MySQL!')
  }
});

// Your Database Queries Here!!

const getAll = () => {
  return new Promise((resolve, reject) => {
    connection.query('SELECT * FROM cowlist', (err, cows) => {
      if (err) { reject(err) }
      else { resolve(cows) }
    })
  })
};

const create = (cow) => {
  return new Promise((resolve, reject) => {
    connection.query('INSERT INTO cowlist(cowname, cowtext) VALUES(?, ?)',
      [cow.cowname, cow.cowtext], (err, res) => {
        if (err) { reject(err) }
        else { resolve(res) }
    })
  })
};

const remove = (cow) => {

}

const update = (cow) => {

}

// Don't forget to export your functions!
module.exports = {
  connection: connection,
  get: getAll,
  post: create,
  delete: remove,
  patch: update
}
