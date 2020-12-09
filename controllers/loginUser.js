const bcrypt = require('bcrypt')
const User = require('../models/User')

module.exports = (req, res) =>{
        const { username, password } = req.body;

User.findOne({username:username}, (error,user) => {      
      if (user){ 
        bcrypt.compare(password, user.password, (error, same) =>{
          if(same){ 
            req.session.userId = user._id 
            res.redirect('/')
          }
          else{
            if (password){
            req.flash('validationErrors', 'Wrong password') 
          }
            else{
              req.flash('validationErrors', 'Please provide password')
            }
            res.redirect('/auth/login')  
          }
        })
      }
      else{
        if (username) {
        req.flash('validationErrors', "This username doesn't exist") 
        }
        else{
          req.flash('validationErrors', "Please provide username")
        }

        res.redirect('/auth/login')
      }
    })
}
  