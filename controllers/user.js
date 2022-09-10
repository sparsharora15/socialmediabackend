const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt')
const Users = require('../models/userSchema');


const secret = 'kbvliy712iw3rrhrwlfbo727';

exports.userSignIn = async (req, res) => {
    const { email, phone, password } = req.body
    let finalUser
    if (email) {
        finalUser = await Users.findOne({ email: email })
    }
    else {
        finalUser = await Users.findOne({ phone: phone })
    }
    if (!finalUser) {
        return res.status(401).json({ status: 'error', error: 'User is not registered' })

    }
    bcrypt.compare(password, finalUser.password, function (err, isMatch) {
        if (err) {
            throw err
        } else if (!isMatch) {
            return res.status(403).json({
                message: "The password is not correct"
            })
        } else {
            const token = jwt.sign(
                {
                    id: finalUser._id,
                    email: finalUser.email,
                },
                secret
            )

            return res.status(200).json({ status: 'ok', data: finalUser, token: token })
        }
    })
}
// user sign up 
exports.userSignup = async (req, res, next) => {
    try {
        // Phone number and email validation
        // Phone Number Validation
        const { phone, email } = req.body;
        const emailExists = await Users.exists({ email: email });
        const phoneExists = await Users.exists({ phone: phone });
        const phoneNo = /^[6-9]\d{9}$/.test(phone) //Only for indian numbers
        const emailAddr = /^\S+@\S+\.\S+$/.test(email)
        if (emailExists) {
            return res.status(409).json({
                status: "error",
                message: "User already exists with the same email."
            })
        }
        else if (phoneExists) {
            res.status(409).json({
                status: "error",
                message: "User already exists with the same phone number."
            })
        }

        else if (!phoneNo) {
            return res.status(400).json({
                status: "Error",
                message: "Invalid Phone Number"
            })
        }
        // Email validation
        else if (!emailAddr) {
            return res.status(400).json({
                status: "Error",
                message: "Invalid Email Address"
            })
        }
        const encryptedPassword = await bcrypt.hash(req.body.password, 10);
        const user = new Users({
            name: req.body.name,
            phone: req.body.phone,
            email: req.body.email.toLowerCase(),
            password: encryptedPassword,

        });
        await user
            .save()
        return res.status(200).json({
            message: "The user successfully registered"
        })
    }

    catch (err) {
        throw err
        console.log(err);
    }
}
