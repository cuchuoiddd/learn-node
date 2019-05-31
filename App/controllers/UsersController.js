// import user model
import User from '../models/users'
// import helper
import Helper from '../helpers/Helper'

module.exports = {
    index: (req, res) => {

        // return all users
        User.allUsers(users => {
            res.json(users)
        })
    }
} 
