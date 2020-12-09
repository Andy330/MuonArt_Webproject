const Post = require('../models/Post.js')

module.exports = async (req,res)=>{
    const posts = await Post.findById(req.params.id).populate('userid');
    console.log(posts)
    res.render('post',{
        posts
    });
}
