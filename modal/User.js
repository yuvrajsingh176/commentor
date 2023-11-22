import mongoose from "mongoose";
import jwt from "jsonwebtoken"
const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true
    },
    username: {
        type: String,
        required: true,
        unique: true,
        
    },
    password: {
        type: String,
        required: true
    }
}, { timestamps: true });


userSchema.methods.createJWT = function () {
    console.log(this.username);
    return jwt.sign({ userId: this._id,username:this.username}, 'jai-shree-ram', {
      expiresIn: '1d',
    })
  }
  
const User = mongoose.model('User', userSchema);

export default User;