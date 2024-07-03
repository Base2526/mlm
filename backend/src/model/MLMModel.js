import mongoose from 'mongoose';
const Schema = mongoose.Schema
const mlmSchema = new Schema({
    memberId: { type: Schema.Types.ObjectId, required:[true, "Member-Id is a required field"] },
    parentId: { type: Schema.Types.ObjectId },
    childs: [Schema.Types.ObjectId],
    level: Number
},
{
    timestamps: true
})

export default mongoose.model('mlm', mlmSchema,'mlm')