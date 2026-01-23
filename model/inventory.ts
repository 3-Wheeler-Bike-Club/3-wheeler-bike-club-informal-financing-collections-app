import mongoose from "mongoose"

const ContractSchema = new mongoose.Schema(
    {
        branch: {
            type: String,
            enum: ["kasoa", "kumasi"],
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
        price: {
            type: Number,
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