"use server"

export async function postSpareAction(
    branch: string,
    part: {
        type: string
        model: string
        no: string
        serial: string
    },
    cost: number,
    msrp: number,
    waybill: string,
) {
    try {
        const response = await fetch(`${process.env.BASE_URL}/api/spares/postSpare`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "x-api-key": process.env.THREEWB_API_KEY
            },
            body: JSON.stringify({
                branch: branch,
                part: part,
                cost: cost,
                msrp: msrp,
                waybill: waybill,
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
