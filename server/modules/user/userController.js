const httpStatus = require('http-status');
const userSchema = require('./userSchema')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const jwtKey = process.env.JWT_PRIVATE_KEY
const crypto = require('crypto');

const CLIENT_ID = process.env.CLIENT_ID
const { OAuth2Client } = require('google-auth-library');
const client = new OAuth2Client(CLIENT_ID);
const otherHelper = require('../../helper/other.helper');

const userController = {};

userController.register = async (req, res, next) => {
    try {
        const { name, email, password, userType } = req.body
        const salt = await bcrypt.genSalt(10)
        const hashPassword = await bcrypt.hash(password, salt)
        let user = await userSchema.findOne({ email })
        if (user) return res.status(400).send({ success: false, result: 'Email already used' })
        user = new userSchema({
            name,
            email,
            userType,
            password: hashPassword,
        })
        await user.save()
        const token = generateAuthToken();
        res.header('x-auth-token', token).send({ email, name, userType, token })
    } catch (error) {
        next(error);
    }
};

userController.login = async (req, res, next) => {
    try {
        const user = await userSchema.findOne({ email: req.body.email }).lean()
        if (user) {
            const result = await bcrypt.compare(req.body.password, user.password)
            if (result == true) {
                jwt.sign({ user }, jwtKey, { expiresIn: '86400s' }, (err, token) => {
                    res.status(200).json({ name: user.name, email: user.email, token: token, userType: user.userType })
                })
            } else {
                return otherHelper.sendResponse(res, httpStatus.UNAUTHORIZED, true, null, 'Incorrect password', 'Incorrect password', null);
            }
        } else {
            return otherHelper.sendResponse(res, httpStatus.NOT_FOUND, true, null, 'Email Not Found', 'Email Not Found', null);
        }
    } catch (error) {
        next(error);
    }
};



userController.googleLogin = async (req, res, next) => {
    let token = req.body.token;
    async function verify() {
        const ticket = await client.verifyIdToken({
            idToken: token,
            audience: CLIENT_ID,
        });
        const payload = ticket.getPayload();
        const userid = payload['sub'];

        const { name, email } = payload
        console.log(email)
        const randomHex = await otherHelper.generateRandomHexString(10);
        const salt = await bcrypt.genSalt(10)
        const hashPassword = await bcrypt.hash(randomHex, salt)
        let user = await userSchema.findOne({ email })
        if (!user) {
            user = new userSchema({
                name,
                email,
                password: hashPassword,
            })
            await user.save()
        }
        // res.header('x-auth-token', token).send({ email, name, token })

    }
    verify().then(() => {
        res.cookie('session-token', token);
        res.send({ status: 'success' })
    }).catch(console.error)
};

userController.allUsers = async (req, res, next) => {
    try {
        const users = await userSchema.find().select('name email userType').lean()
        return otherHelper.sendResponse(res, httpStatus.OK, true, users, null, 'All Users Retrieved', null);
    } catch (error) {
        next(error);
    }
};

userController.loadLoggedInUser = async (req, res, next) => {
    try {
        const user_id = req.user.user._id
        const user = await userSchema.findById(user_id).select('_id name email userType').lean()
        return otherHelper.sendResponse(res, httpStatus.OK, true, user, null, 'Login User detail', null);
    } catch (error) {
        next(error);
    }
};



function generateAuthToken() {
    const token = jwt.sign({ _id: this.id, email: this.email }, jwtKey);
    return token;
}

module.exports = userController;
