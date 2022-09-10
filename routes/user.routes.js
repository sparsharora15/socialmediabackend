const { userSignup  , userSignIn } = require('../controllers/user')
const express = require('express')
const router = express.Router()


router.post("/signup", userSignup)
router.post("/login", userSignIn)


module.exports = router;    