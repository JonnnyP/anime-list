const Pool = require('pg-pool');

var pool = new Pool({
	database: 'animetest',
	user: 'jp',
	password: 'somepass',
	port: 5432,
})

const getAllUsers = (request, response) => {
	pool.query('SELECT * FROM users ORDER BY id ASC', (error, results) => {
		if(error) throw error;

		response.status(200).json(results.rows);
	})
}

const getUserById = (request, response) => {
	const id = parseInt(request.params.id)

	pool.query('SELECT * FROM users WHERE id = $1', (error, results) => {
		if(error) throw error;

		response.status(200).json(results.rows);
	})	
}

const createUser = (request, response) => {
	const {name, email} = request.body;

	pool.query('INSERT INTO users (name, email) VALUES ($1, $2) RETURNING *', [name, email] ,(error, results) => {
		if(error) {
			throw error;
		}

		response.status(200).send(`User added with ID: ${results}`);
		// response.status(201).send(`User added with ID: ${results}`);
	})
}

const deleteUser = (request, response) => {
	const id = parseInt(request.params.id)

	pool.query('DELETE FROM users WHERE id = $1', [id] ,(error, results) => {
		if(error) {
			throw error;
		}

		response.status(200).send(`User deleted with ID: ${id}`);
	})
}

module.exports = {
	getAllUsers,
	getUserById,
	createUser,
	deleteUser,
}