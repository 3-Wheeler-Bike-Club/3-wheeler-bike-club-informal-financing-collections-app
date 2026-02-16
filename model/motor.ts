import mongoose from "mongoose"

const MotorSchema = new mongoose.Schema(
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

const Motor = mongoose.models.Motor || mongoose.model("Motor", MotorSchema)

export default Motor