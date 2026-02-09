import mongoose from "mongoose"

const SpareSchema = new mongoose.Schema(
    {
        branch: {
            type: String,
            enum: ["head-office-kasoa", "walantu-kasoa", "escobar-kasoa", "buduburam-liberia-camp", "dwenase-sefwi-wiawso"],
        },
        part: {
            type: {
                type: String,
                enum: ["motorcycle", "scooter", "semi-auto", "tricycle"],
            },
            no: {
                type: String,
            },
            description: {
                type: String,
            },
            date: {
                type: String,
            },
            batch: {
                type: String,
            },
            d: {
                type: String,
            },
            code: {
                type: String,
            },
            t: {
                type: String,
            },
            serial: {
                type: String,
            }, 
        },              
        cost: {
            type: Number,
        },
        msrp: {
            type: Number,
        },
        waybill: {
            type: String,
        },
        status: {
            type: String,
            enum: ["in stock", "out of stock"],
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

const Spare = mongoose.models.Spare || mongoose.model("Spare", SpareSchema)

export default Spare;