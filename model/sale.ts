import mongoose from "mongoose"

const SaleSchema = new mongoose.Schema(
    {
        branch: {
            type: String,
            enum: [
                "head-office",
                "walantu-main",
                "walantu-annex",
                "escobar",
                "buduburam-liberia-camp",
                "dwenase-sefwi-wiawso",
            ],
        },        
        vehicle: {
            type: {
                type: String,
                enum: ["motorcycle", "scooter", "semi-auto", "tricycle"],
            },
            model: {
                type: String,
            },
            color: {
                type: String,
            },
            vin: {
                type: String,
                unique: true,
            },
            engine: {
                type: String,
                unique: true,
            }
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
        status: {
            type: String,
            enum: ["paid in full", "paid in installments"],
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