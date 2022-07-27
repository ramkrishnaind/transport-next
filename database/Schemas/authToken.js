import { array } from 'joi';
import { Schema, model, models, mongoose } from 'mongoose';

const authTokenSchema = new Schema({
    customerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'customer',
        default: null,
    },
    token: {
        type: String,
        required: true,
        trim: true,
    },
    expireTime: {
        type: Date,
        required: true,
        trim: true,
    },
},
    {
        timestamps: {
            createdAt: "createdAt",
            updatedAt: "updatedAt",
        },
        id: false,
        toJSON: {
            getters: true,
            virtuals: true,
        },
        toObject: {
            getters: true,
            virtuals: true,
        },
    },
    {
        collection: "authToken",
    });

const AuthToken = models.authToken || model('authToken', authTokenSchema);

export default AuthToken;
