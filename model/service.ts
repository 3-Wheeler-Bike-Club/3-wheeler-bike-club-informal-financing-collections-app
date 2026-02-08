import mongoose from "mongoose"

const ServiceSchema = new mongoose.Schema(
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

const Service = mongoose.models.Service || mongoose.model("Service", ServiceSchema)

export default Service