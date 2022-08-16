const express = require('express');
const bodyParser = require('body-parser');
const db = require('./queries.js');

const app = express();
const port = 3000;

app.use(bodyParser.json())

app.use(
	bodyParser.urlencoded({
		extended: true,
	})
)

app.get('/', (request, response) => {
	response.json({info: 'Node.js, express and Postgres API'});
})

app.get('/users', db.getAllUsers)
app.get('/users/:id', db.getUserById)
app.post('/users', db.createUser)
app.delete('/users/:id', db.deleteUser)

app.listen(port, () => {
	console.log(`App running on port ${port}`);
})