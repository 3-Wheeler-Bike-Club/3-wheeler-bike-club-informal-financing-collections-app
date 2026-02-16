import mongoose from "mongoose"

const ServiceSchema = new mongoose.Schema(
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
        part: {
            type: {
                type: String,
                enum: ["motorcycle", "scooter", "semi-auto", "tricycle", "general"]
            },
            model: {
                type: String,
            },
            no: {
                type: String,
            },
            serial: {
                type: String,
                unique: true,
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
        payments: [
            {
                amount: {
                    type: Number,
                },
                status: {
                    type: String,
                    enum: ["full", "partial"],
                },
                balance: {
                    type: Number,
                },
                due: {
                    type: Date,
                },
            }
        ],
        createdAt: {
            type: Date,
            default: Date.now,
        },
    },
    {
        timestamps: true, // Add timestamps
    }

)

const Service = mongoose.models.Service || mongoose.model("Service", ServiceSchema)

export default Service