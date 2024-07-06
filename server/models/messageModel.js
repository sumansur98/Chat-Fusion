import { Schema, model, models } from "mongoose";

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

export const Message = models.Message || model('Message', userSchema)