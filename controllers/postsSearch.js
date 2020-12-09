const Post = require('../models/Post.js')

module.exports = async (req,res)=>{       
    var posts = await Post.find({ $or: [{title:/[req.body.search]/ }, {body:/[req.body.search]/}] }).populate('userid'); 
    console.log(posts) 
    if (posts!='') {
    req.flash('data', posts)    
    }  
    res.redirect('/posts/search')
}