//Users controller
const dbPool= require('../config/db');
const { hash } = require('../utils/hash');  // Import the function to hashe passwords
//Hash functions hash encrypts, compare compares with preexistent

module.exports = {
    //get all users
    getAll: async (req, res) => {
        try {
            const [rows] = await dbPool.query('SELECT * FROM users');
            res.json(rows);
        } catch (err) {
            console.error(err);
            res.status(500).json({ error: 'Error while trying to call users' });
        }
    },

    //get one user
    getOne: async (req, res) => {
        try {
            const { id } = req.params;
            const [rows] = await dbPool.query('SELECT * FROM users WHERE id = ?', [id]);
            
            if (rows.length === 0) {
                return res.status(404).json({ error: 'User not found' });
            }

            res.json(rows[0]);

        } catch (err) {

            console.error(err);
            res.status(500).json({ error: 'Error while gettin the user' });
        }
    },

    //Creates a new user
    create: async (req, res) => {
        try {
            const { username, pass } = req.body;
            if (!username || !pass) {
                return res.status(400).json({ error: 'Name and password need to be completed' });
            }
            const hashedPass = await hash(pass); //Save the password hased/encrypted 
            const [result] = await dbPool.query('INSERT INTO users (username, pass) VALUES (?, ?)', [username, hashedPass]); //Save the information in the db
            res.json({ message: 'User created successfully', id: result.insertId });

        } catch (err) {

            console.error(err);
            res.status(500).json({ error: 'Error while creating the user' });
        }
    },

    //Updates user info
    update: async (req, res) => {
        try {
            const { id } = req.params;
            const { username, pass } = req.body;

            const hashedPass = await hash(pass); //Save the password hased/encrypted 
            const [result] = await dbPool.query('UPDATE users SET username = ?, pass = ? WHERE id = ?', [username, hashedPass, id]); //Save the information in the db

            if (result.affectedRows === 0) {
                return res.status(404).json({ error: 'User not found' });
            }

            res.json({ message: 'User updated' });

        } catch (err) {

            console.error(err);
            res.status(500).json({ error: 'Error while updating the user' });
        }
    },

    delete: async (req, res) => {
        try {
            const { id } = req.params;
            const [result] = await dbPool.query('DELETE FROM users WHERE id = ?', [id]);

            if (result.affectedRows === 0) {
                return res.status(404).json({ error: 'User not found' });
            }

            res.json({ message: 'User deleted' });

        } catch (err) {

            console.error(err);
            res.status(500).json({ error: 'Error while deleting the user' });
        }
    }
}
