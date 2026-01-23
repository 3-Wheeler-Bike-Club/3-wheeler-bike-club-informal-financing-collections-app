import mongoose from "mongoose"

const ContractSchema = new mongoose.Schema(
    {
        branch: {
            type: String,
            enum: ["kasoa", "kumasi"],
        },
        customer: {
            firstname: {
                type: Number,
            },
            othername: {
                type: Number,
            },
            lastname: {
                type: String,
            },
            phone: {
                type: String,
            },
        },
        vehicle: {
            type: {
                type: String,
                enum: ["motorcycle", "tricycle"],
            },
            model: {
                type: String,
            },
            year: {
                type: String,
            },
            color: {
                type: String,
            },
            vin: {
                type: String,
            },
        },
        amount: {
            type: Number,
        },
        status: {
            type: String,
            enum: ["pending", "active", "defaulted", "completed"],
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