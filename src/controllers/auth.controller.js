const {compare} = require('../utils/hash')
const dbPool = require('../config/db')

const login = async (req, res) => {
    try {
        const {username, pass} = req.body
        const [rows] = await dbPool.query('SELECT * FROM users WHERE username = ?', [username])

        if (rows.length === 0) {
            return res.status(404).json({error: 'User not found'})
        }

        const user = rows[0]

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