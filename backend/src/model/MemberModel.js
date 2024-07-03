import mongoose from 'mongoose';
const Schema = mongoose.Schema
const memberSchema = new Schema({
    username: { type: String, required:[true, "Username Request is a required field"] },
    password: { type: String, required:[true, "Password Request is a required field"] },
    email: { type: String, unique: true, required:[true, "Email Request is a required field"] },
    displayName: { type: String, required:[true, "Email Request is a required field"]},
    isActive: {
        type: Number,
        enum : [0, 1], // 0: FALSE, 1: TRUE
        default: 0
    },
    avatar :{
        url: { type: String },
        filename: { type: String },
        mimetype: { type: String },
        encoding: { type: String },
    },
    lockAccount: {
        lock: { type: Boolean, default: false },
        date: { type : Date, default: Date.now },
    },
    lastAccess : { type : Date, default: Date.now },
},
{
    timestamps: true
})

export default mongoose.model('member', memberSchema,'member')