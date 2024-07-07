import mongoose,{ Schema, model, Types } from "mongoose";

const msgSchema = new Schema({
    sender: {
        type: Types.ObjectId,
        ref : 'User'
    },
    chat : {
        type: Types.ObjectId,
        ref : 'Chat'
    },

    attachments : [
        {
            public_id: {
                type: String,
                required: true
            },
            url: {
                type: String,
                required: true
            }
        }
    ]
}, {
    timestamps: true
})

export const Message = mongoose.models.Message || model('Message', userSchema)