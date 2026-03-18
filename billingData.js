const mongoose = require("mongoose")

mongoose.connect("mongodb://localhost:27017/billing")
.then(() => {
    console.log("mongoose connected");
})
.catch((e) => {
    console.log("failed to connect");
})

const LoginSchema = new mongoose.Schema({
    patientName: {
        type: String,
        required: true
    },
    patientId: {
        type: String,
        required: true
    },
    mobileNumber: {
        type: String,
        required: true
    },
    doctorName: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        required: true
    },
    labTests: {
        type: Number,
        required: true
    },
    medicines: {
        type: Number,
        required: true
    },
    consultationFees: {
        type: Number,
        required: true
    },
    roomCost: {
        type: Number,
        required: true
    }
})

const BillingData = new mongoose.model('BillingData', LoginSchema)
module.exports = BillingData