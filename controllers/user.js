const User = require("../models/user");

exports.getUserById = ( req , res , next , id ) => {

 
  ( async() => {

     req.profile = await User.findById(id);
    
 })()
 .then(()=> {

   next();

 })
 .catch((err) => {
    
    if( err || !req.profile){
        return res.json({
            error: "Db not found"
        })
    }
 })
};

exports.getUser = (req , res) => {
   
    req.profile.encry_password = undefined;
    req.profile.salt = undefined;
    

    return res.json(req.profile)
};


exports.updateUser = ( req , res ) => {
   
    var updatedUser;
    ( async() => {
        updatedUser = await User.findByIdAndUpdate( {_id: req.profile._id}, {$set: req.body} ,{ new: true });
    })()
    .then( ( ) => {
        updatedUser.encry_password = undefined;
        updatedUser.salt = undefined;
        res.json({updatedUser});
    })
    .catch( ( err) => {
        if(err || !updatedUser){
            return res.status(404).json({
                error: "Unable to update"
            })
        }
    })

};