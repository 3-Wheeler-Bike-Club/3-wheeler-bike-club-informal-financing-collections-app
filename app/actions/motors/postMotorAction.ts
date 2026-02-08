"use server"

export async function postMotorAction(
    branch: string,
    vehicle: {
        type: string
        model: string
        color: string
        vin: string
        engine: string
    },
    cost: number,
    msrp: number,
    waybill: string,
) {
    try {
        const response = await fetch(`${process.env.BASE_URL}/api/motors/postMotor`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "x-api-key": process.env.THREEWB_API_KEY
            },
            body: JSON.stringify({
                branch: branch,
                vehicle: vehicle,
                cost: cost,
                msrp: msrp,
                waybill: waybill,
            })
        })
        if (!response.ok) {
            throw new Error("Failed to post motor")
        }
        return response.json()
    } catch (error) { 
        console.log(error)
    }
}
