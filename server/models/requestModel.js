import { Schema, model, models } from "mongoose";

const requestSchema = new Schema({
    sender: {
        type: Types.ObjectId,
        ref : 'User'
    },
    receiver: {
        type: Types.ObjectId,
        ref : 'User'
    },
    status : {
        type : String,
        default : "pending",
        enum : ['pending', 'accepted', 'rejected']
    }
}, {
    timestamps: true
})

export const Request = models.Request || model('Request', requestSchema)