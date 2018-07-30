var mongoose = require('mongoose');

var bcrypt = require('bcryptjs');

var Schema = mongoose.Schema;

var UserSchema = new Schema(
  {
    name: {type: String, required: true,min:3, max: 100}, //reference to the associated book
    email: {type: String, required: true},
    password: {type: String, required: true, min:8 ,max:250},
    role: {type: String, required: true, enum: ['ADMIN', 'Accountant'], default: 'Accountant'},
    createdAt: {type: Date, default: Date.now}

  }
);

//Export model
var User = module.exports = mongoose.model('User', UserSchema);

module.exports.createUser = function(newUser,callback){
    bcrypt.genSalt(10, function(err, salt) {
        bcrypt.hash(newUser.password, salt, function(err, hash) {
            // Store hash in your password DB.
            newUser.password = hash;
            newUser.save(callback);
        });
    });
};

module.exports.getUserByEmail = function(username,callback){
    var query = { name: username};
    User.findOne(query,callback);
};
module.exports.getUserById = function(id,callback){
    User.findById(id,callback);
};

module.exports.comparePassword = function(userPassword,hash, callback){
    bcrypt.compare(userPassword, hash, function(err, isMatch) {
        if(err) throw err;
        callback(null,isMatch);
    });
}
