import { Schema, model, models, mongoose } from 'mongoose';

const bookingSchema = new Schema({
    customerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'customer',
        default: null
    },
    shiftingFor: {
        type: String,
        required: true,
        trim: true,
    },
    shiftingFrom: {
        type: String,
        required: false,
        trim: true,
    },
    shiftingTo: {
        type: String,
        required: false,
        trim: true,
    },
    shiftingOn: {
        type: Date,
        required: false,
    },
    currentFloor: {
        type: String,
    },
    isLiftAvailableOnCurrentFloor: {
        type: Boolean,
    },
    movingOnFloor: {
        type: String,
    },
    isLiftAvailableOnMovingFloor: {
        type: Boolean,
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
        collection: "booking",
    });

const Booking = models.booking || model('booking', bookingSchema);

export default Booking;