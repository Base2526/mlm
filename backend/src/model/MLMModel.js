import mongoose from 'mongoose';
const Schema = mongoose.Schema

var childSchema  = new Schema({
    childId: { type: Schema.Types.ObjectId },
    updateTime : { type : Date, default: Date.now },
})

const mlmSchema = new Schema({
    parentId: { type: Schema.Types.ObjectId, default : null },
    childs: [childSchema],
    level: Number
},
{
    timestamps: true
})

export default mongoose.model('mlm', mlmSchema,'mlm')