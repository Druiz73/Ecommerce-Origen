import mongoose from 'mongoose';

const userSchema = mongoose.Schema({
   
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { 
        type: String,
        required: true,
        unique: true,
        match: /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/
     },
     password: {
         type: String,
         required: true
     },
     contact: { type: String },
     profilePic: { type: String },
     createdAt: Date,
     updatedAt: Date
});

const userModel= mongoose.model('User', userSchema);
export default userModel;