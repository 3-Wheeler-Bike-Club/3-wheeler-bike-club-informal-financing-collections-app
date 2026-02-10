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
        },
        // Quantity of this spare at the given branch
        quantity: {
            type: Number,
        },
        cost: {
            type: Number,
        },
        msrp: {
            type: Number,
        },
        // One or more uploaded waybill file URLs
        waybill: {
            type: [String],
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

// Ensure each part number is unique per branch, so quantity is independent per branch
SpareSchema.index({ "part.no": 1, branch: 1 }, { unique: true })

const Spare = mongoose.models.Spare || mongoose.model("Spare", SpareSchema)

export default Spare;