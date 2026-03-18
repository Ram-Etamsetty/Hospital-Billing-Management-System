const mongoose = require("mongoose")

mongoose.connect("mongodb://localhost:27017/billing")
.then(() => {
    console.log("mongoose connected");
})
.catch((e) => {
    console.log("failed to connect");
})

const PatientSchema = new mongoose.Schema({
    patientId: {
        type: String,
        required: true
    },
    patientName: {
        type: String,
        required: true
    },
    mobileNumber: {
        type: String,
        required: true
    },
    patientAge: {
        type: Number,
        required: true
    },
    patientGender: {
        type: String,
        required: true
    },
    dateOfAdmission: {
        type: Date,
        required: true
    },
    doctorName: {
        type: String,
        required: true
    },
    medicalCondition: {
        type: String,
        required: true
    }
})

const PatientDetails = new mongoose.model('PatientDetails', PatientSchema)
module.exports = PatientDetails