"use server"

export async function postInventoryAction(
    branch: string,
    vehicle: {
        type: "motorcycle" | "tricycle"
        model: string
        color: string
        vin: string
    },
    amount: number,
) {
    try {
        const response = await fetch(`${process.env.BASE_URL}/api/inventory/postInventory`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "x-api-key": process.env.THREEWB_API_KEY
            },
            body: JSON.stringify({ 
                branch: branch,
                vehicle: vehicle,
                amount: amount,
            })
        })
        if (!response.ok) {
            throw new Error("Failed to post inventory")
        }
        return response.json()
    } catch (error) { 
        console.log(error)
    }
}
