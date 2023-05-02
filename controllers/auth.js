const User = require("../models/user");

const { validationResult } = require("express-validator");

const jwt = require("jsonwebtoken");

var { expressjwt: expressJwt } = require("express-jwt");





exports.signUp = ( req , res ) => {

    const errors = validationResult(req);

    if(!errors.isEmpty()) return res.status(422).json({
        param: errors.array()[0].param,
        error: errors.array()[0].msg
    });

    const user = new User(req.body);

    user.save()
    .then( () => {
        res.json(user);
    })
    .catch( (err) => {
        res.status(400).json({
            err: "Unable to save"
        })
    });
    
};

exports.signIn = ( req , res ) => {

    const errors = validationResult(req);

    if(!errors.isEmpty()){
        return res.status(422).json({
            error: errors.array()[0].msg
        })
    }

    const { email , password} = req.body;

    var user;

    ( async() => {

     user = await User.findOne({email})

    })().then( () => {

    const token = jwt.sign( {id: user._id} , process.env.SECRET);

    res.cookie( "token" , token , {expire: new Date() + 9999});

    const {_id , name , role} = user;

    res.json({
        token , user:{ _id , name , email , role}
    });
    }).catch( (err) => {
        if( err||!user){
            return res.status(404).json({
                error: "Not found"
            })
        }
    
        if(!user.authenticate(password)){
            return res.status(404).json({
                error: "Password is Incorrect"
            })
        }
    })
};

exports.signOut = (req , res) => {
   res.clearCookie("token");
   res.json({
    message: "signed out sucessfully"
   })

};

exports.isSignedIn = expressJwt({
    secret: process.env.SECRET,
    userProperty: "auth",
    algorithms:["HS256"]

}
);



exports.isAuthenticated = ( req , res , next) => {

let allClear = req.profile && req.auth && req.profile._id == req.auth.id;
    if (!allClear) {
      return res.status(403).json({
        error: "ACCESS DENIED"
      });
    }
    next();
};


exports.isAdmin = ( req , res , next) => {

    if(!req.profile.role===1){
        return res.json({
            error: "Not an admin, Access Denied"
        })
    }
    next();
};



