const express = require('express')
const app = express()
const cors = require("cors")
const pool = require("./db")
const port = 3100

//middleware 
app.use(cors())
app.use(express.json());


//Routes 

app.post('/reservations', async(req, res) => { 
	try {
		
		const { reservations } = req.body; 
		const newReservation = await pool.query("INSERT INTO reservations (reservations) VALUES($1)", [reservations] );
		
		 
		res.json(newReservation)

	} catch (error) {
		console.log(`You have an error message ${error.message}`)
		
	}
})





//add Reservations to reservations


app.listen(port, () => { 
	console.log(`port ${port} works!`)

})

console.log('hello')