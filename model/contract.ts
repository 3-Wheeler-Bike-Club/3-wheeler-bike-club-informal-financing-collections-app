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
            color: {
                type: String,
            },
            vin: {
                type: String,
            },
            license: {
                type: String,
            },
        },
        owner: {
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
        driver: {
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
            location: {
                type: String,
            },
            headshot:{
                type: String,
            },
            national:{
                type: String,
            }
        },
        guarantor: {
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
            location: {
                type: String,
            },
            headshot:{
                type: String,
            },
            national: {
                type: String,
            },
        },
        deposit: {
            type: Number,
        },
        start: {
            type: Date,
        },
        end: {
            type: Date,
        },
        duration: {
            type: Number,
        },
        amount: {
            type: Number,
        },
        installment: {
            type: Number,
        },
        payments: [
            {
                week: {
                    type: Number,
                },
                amount: {
                    type: Number,
                },
                method: {
                    type: String,
                    enum: ["momo", "cash"],
                },
                reference: {
                    type: Date,
                },
                status: {
                    type: String,
                    enum: ["full", "partial"],
                },
            }
        ],
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