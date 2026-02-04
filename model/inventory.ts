import mongoose from "mongoose"

const InventorySchema = new mongoose.Schema(
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
                unique: true,
            },
            engine: {
                type: String,
                unique: true,
            }
        },
        amount: {
            type: Number,
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

const Inventory = mongoose.models.Inventory || mongoose.model("Inventory", InventorySchema)

export default Inventory