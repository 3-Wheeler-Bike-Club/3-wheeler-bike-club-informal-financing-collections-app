"use server"

export async function postSaleAction(
    branch: string,
    vehicle: {
        type: "motorcycle" | "tricycle"
        model: string
        color: string
        vin: string
    },
    customer: {
        firstname: string
        othername: string
        lastname: string
        phone: string
    },
    amount: number,
) {
    try {
        const response = await fetch(`${process.env.BASE_URL}/api/sales/postSale`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "x-api-key": process.env.THREEWB_API_KEY
            },
            body: JSON.stringify({ 
                branch: branch,
                vehicle: vehicle,
                customer: customer,
                amount: amount,
            })
        })
        if (!response.ok) {
            throw new Error("Failed to post sale")
        }
        return response.json()
    } catch (error) { 
        console.log(error)
    }
}
