const express = require('express')
const router = express.Router()
const {upload}  = require("../middleware/fileupload")

const {
    makeNewPost,
    comment,
    like,
    dislike,
    getAllPosts
} = require("../controllers/posts")

router.post("/newPost", upload.single("picture"), makeNewPost)
router.post("/comment", comment)
router.post("/like", like)
router.post("/unlike", dislike)
router.get("/getAllPosts", getAllPosts)


module.exports = router;    