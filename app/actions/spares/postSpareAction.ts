"use server"

// Matches SpareSchema: branch, part, quantity, cost, msrp, waybill
export async function postSpareAction(
    branch: string,
    part: {
        type: string
        no: string
        description?: string
    },
    quantity: number,
    cost: number,
    msrp: number,
    waybill: string[],
) {
    try {
        const response = await fetch(`${process.env.BASE_URL}/api/spares/postSpare`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "x-api-key": process.env.THREEWB_API_KEY
            },
            body: JSON.stringify({
                branch,
                part,
                quantity,
                cost,
                msrp,
                waybill,
            })
        })
        if (!response.ok) {
            throw new Error("Failed to post spare")
        }
        return response.json()
    } catch (error) {
        console.log(error)
    }
}
