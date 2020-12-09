const User = require('../models/User.js')

module.exports = async (req,res)=>{ 
	//console.log(req.body.confirm);

	    let arr = [];
        var a = true;
        const user = await User.find({username:req.body.username});
        console.log(user);

        if(!req.body.name){                      
            arr.push('Please provide Name');
            a=false;
        }   
        if(!req.body.lastname){                      
            arr.push('Please provide Lastname');
            a=false;     
        } 
        if(!req.body.username){                      
            arr.push('Please provide username');
            a=false;       
        }
        if(!req.body.password){                      
            arr.push('Please provide password');
            a=false;     
        }   
        if(req.body.password.length<6){                      
            arr.push('Password must be at least 6 characters');
            a=false;     
        }        
        if(!req.body.confirm){                      
            arr.push('Please confirm password');
            a=false;
        }  
        if(req.body.password!=req.body.confirm){                      
            arr.push('Passwords need match');
            a=false;
        }  
        if(user!=''){                      
            arr.push('This user already exists');
            a=false;
        }  

    if(a==false){
    	    req.flash('validationErrors',arr) 
            req.flash('data',req.body)            
            return res.redirect('/auth/register')  
    }
    else{
    User.create(req.body, (error, user) => {                 
        res.redirect('/')        
      })          
    }     
}