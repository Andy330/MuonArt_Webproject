module.exports = (req, res) =>{  
    res.render('search',{        
        posts: req.flash('data'),
    })
}