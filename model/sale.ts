import mongoose from "mongoose"

const SaleSchema = new mongoose.Schema(
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
            color: {
                type: String,
            },
            vin: {
                type: String,
            },
        },
        customer: {
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
        },
        amount: {
            type: Number,
        },
        createdAt: {
            type: Date,
            default: Date.now,
        },
    },
    {
        timestamps: true, // Add timestamps
    }

)

const Sale = mongoose.models.Sale || mongoose.model("Sale", SaleSchema)

export default Sale