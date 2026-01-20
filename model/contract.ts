import mongoose from "mongoose"

const ContractSchema = new mongoose.Schema(
    {
        id: {
            type: String,
            required: true,
        },
        vehicle: {
            type: String,
            enum: ["motorcycle", "tricycle"],
        },
        vin: {
            type: String,
        },
        license: {
            type: String,
        },
        firstname: {
            type: String,
        },
        othername: {
            type: String,
        },
        lastname: {
            type: String,
        },
        phone: {
            type: String,
        },
        location: {
            type: String,
        },
        duration: {
            type: Number,
        },
        amount: {
            type: Number,
        },
        payment: {
            amount: {
              type: Number,
            },
            method: {
              type: String,
              enum: ["momo", "cash"],
            },
            reference: {
              type: Date,
            },
            status: {
              type: String,
              enum: ["full", "partial"],
            },
        },
        createdAt: {
            type: Date,
            default: Date.now,
        },
        updatedAt: {
            type: Date,
            default: Date.now,
        },
    },
    {
        timestamps: true, // Add timestamps
    }

)

const Contract = mongoose.models.Contract || mongoose.model("Contract", ContractSchema)

export default Contract