const httpStatus = require('http-status');
const userSchema = require('./userSchema')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const jwtKey = process.env.JWT_PRIVATE_KEY
const userController = {};

userController.register = async (req, res, next) => {
    try {
        const { name, email, password } = req.body
        const salt = await bcrypt.genSalt(10)
        const hashPassword = await bcrypt.hash(password, salt)
        let user = await userSchema.findOne({ email })
        if (user) return res.status(400).send({ success: false, result: 'Email already used' })
        user = new userSchema({
            name,
            email,
            password: hashPassword,
        })
        await user.save()
        const token = generateAuthToken();
        res.header('x-auth-token', token).send({ email, name, token })
    } catch (error) {
        next(error);
    }
};

userController.login = async (req, res, next) => {
    try {
        userSchema.findOne({ email: req.body.email }).then(data => {
            bcrypt.compare(req.body.password, data.password, function (err, result) {
                if (result == true) {
                    jwt.sign({ data }, jwtKey, { expiresIn: '500s' }, (err, token) => {
                        res.status(200).json({ name: data.name, email: data.email, token: token })
                    })
                } else {
                    res.send('Incorrect password')
                }
            })
        }).catch(err => { console.log(err); res.status(404).json({ message: 'Email not found' }) })
    } catch (error) {
        next(error);
    }
};


function generateAuthToken() {
    const token = jwt.sign({ _id: this.id, isAdmin: this.isAdmin }, jwtKey);
    return token;
}

module.exports = userController;
