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
  let select = 'SELECT * FROM cowlist';
  return new Promise((resolve, reject) => {
    connection.query(select, (err, cows) => {
      if (err) { reject(err) }
      else { resolve(cows) }
    })
  })
};

const create = (cow) => {
  let create = 'INSERT INTO cowlist(cowname, cowtext) VALUES(?, ?)';
  return new Promise((resolve, reject) => {
    connection.query(create,
      [cow.cowname, cow.cowtext], (err, res) => {
        if (err) { reject(err) }
        else { resolve(res) }
    })
  })
};


const update = (data) => {
  let update = 'UPDATE cowlist SET cowname = ?, cowtext = ? WHERE cowname = ?';
  return new Promise((resolve, reject) => {
    connection.query(update, [data.newCow.cowname, data.newCow.cowtext, data.oldCow.cowname], (err, res) => {
      if (err) { reject(err) }
      else { resolve(res) }
    })
  })
}

const remove = (cow) => {
  // return new Promise((resolve, reject) => {
  //   connection.query('')
  // })
}


// Don't forget to export your functions!
module.exports = {
  connection: connection,
  get: getAll,
  post: create,
  delete: remove,
  patch: update
}
