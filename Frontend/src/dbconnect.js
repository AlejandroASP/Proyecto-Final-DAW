const mysql = require('mysql');

const db = mysql.createConnection({
  host: 'localhost',
  user: 'Vortex_Admin',
  password: 'Vortex_7788.',
  database: 'vortexdb'
});

db.connect((err) => {
  if (err) {
    throw err;
  }
  console.log('Conexión a la base de datos VortexDB establecida');
});

module.exports = db;
