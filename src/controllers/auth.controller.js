const {compare} = require('../utils/hash') // Import the function to compare hashed passwords
const dbPool = require('../config/db')

const login = async (req, res) => {
    try {
        const {username, pass} = req.body //Ask for the user and password for a login
        const [rows] = await dbPool.query('SELECT * FROM users WHERE username = ?', [username]) //Retrieve the user that mach with the information

        if (rows.length === 0) {
            return res.status(404).json({error: 'User not found'}) //If there isn´t a match
        }

        // Retrieve the first (and only) user from the query result
        const user = rows[0]

        // Compare the provided password with the stored hashed password
        const match = await compare(pass, user.pass)

        if (!match) {
            return res.status(401).json({error: 'Invalid password'})
        }

        res.json({message: 'Login successful', id: user.id})

    } catch (err) {
        console.error(err)
        res.status(500).json({error: 'Error while trying to login'})
    }
}