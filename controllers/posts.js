const Posts = require('../models/postsSchema')

exports.makeNewPost = async (req, res) => {
    let data;
    console.log(req.file)
    if (req.file) {
        console.log(req.file)
        data = new Posts({
            userId: req.body.userId,
            data: req.body.data,
            picture: req.file.originalname,
        })
    } else {
        data = new Posts({
            userId: req.body.userId,
            data: req.body.data,
        })
    }
    await data.save()
    res.send('post uploaded')
}
exports.comment = async (req, res) => {
    await Posts.findOneAndUpdate({ _id: req.body.postId }, {
        $push: {
            comments: {
                data: req.body.comment,
                userId: req.body.userId,
            }
        }
    })
    res.send('commented')
}
exports.like = async (req, res) => {
    let post = await Posts.findOne({ _id: req.body.postId })
    let totalLikes = post.totalLikes + 1;
    await Posts.findOneAndUpdate({ _id: req.body.postId }, {
        totalLikes: totalLikes
    })
    res.send('liked')
}
exports.dislike = async (req, res) => {
    let post = await Posts.findOne({ _id: req.body.postId })
    let totalLikes = post.totalLikes - 1;
    await Posts.findOneAndUpdate({ _id: req.body.postId }, {
        totalLikes: totalLikes
    })
    res.send('disliked')
}
exports.getAllPosts = async (req, res) => {
    Posts.find({})
        .lean()
        .populate(
            {
                path: "userId",
                model: "User"
            }
        )
        .populate(
            {
                path: "comments",
                populate: [
                    {
                        path: "userId",
                        model: "User",
                        select: "name"
                    }
                ]
            }
        )
        .select('userId data picture totalLikes comments')
        .exec(function (err, posts) {
            if (err) {
                console.log(err)
            } else {
                res.send(posts)
            }
        })
}

exports.deletePost = async (req, res) => {
    try {
        console.log(req.body)
        await Posts.findOneAndDelete({ _id: req.body.postid })
        res.send('Deleted Successfully')
    }
    catch (e) {
        console.log(e)
    }
}
// exports.getAllCommentOnPost = async (req, res) => {
//     Posts.findAll({})
//         .lean()
//         .populate('userId','name')
//         .select('userId data picture totalLikes comments')
//         .exec(function (err, posts) {
//             if (err) {
//                 console.log(err)
//             } else {
//                 console.log(posts[0])
//                 res.send(posts)
//             }
//         })
// }