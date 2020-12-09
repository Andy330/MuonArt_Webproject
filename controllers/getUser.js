const User = require('../models/User.js')

module.exports = async (req,res)=>{        
    var id = loggedIn;
    const user = await User.findById(id)
    console.log(user)
    res.render('profile',{
        user 
    });   

    
}