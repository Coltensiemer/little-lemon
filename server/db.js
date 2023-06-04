const Pool = require('pg').Pool;

const pool = new Pool({ 
	user: "coltensiemer",
	password: "Volc0m",
	host: "localhost",
	port: 5432,
	database: "reservationsll"
})

module.exports = pool; 