const mongoose  = require('mongoose');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const userSchema = new mongoose.Schema({
    fullname:{
        firstname:{
            type:String,
            required:true,
            // minLenght:[3,'First name must be at least 3 characters'],
        },
        lastname:{
            type:String,
            // minLenght:[3,'Last name must be at least 3 characters'],
        }
    },
    email:{
        type:String,
        required:true,
        // minLenght:[6,'Email must be at least 6 characters'],
        unique:true
    },
    password:{
        type:String,
        required:true,
        select:false
    },
    socketId:{
        type:String
    },
})

userSchema.methods.generateAuthToken = function(){
    const token = jwt.sign({_id:this._id},process.env.JWT_SECRET);
    return token;
}

userSchema.methods.comparePassword = async function(enteredPassword){
    return await bcrypt.compare(enteredPassword,this.password);
}

userSchema.statics.hashPassword = async function(password){
    return await bcrypt.hash(password,10);
}

const userModel = mongoose.model('User',userSchema);
module.exports = userModel; 