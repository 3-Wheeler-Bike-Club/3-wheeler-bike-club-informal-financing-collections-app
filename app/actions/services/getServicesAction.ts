"use server"

export async function getServicesAction() {
    try {
        const response = await fetch(`${process.env.BASE_URL}/api/services/getServices`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "x-api-key": process.env.THREEWB_API_KEY
            }
        })
        if (!response.ok) {
            throw new Error("Failed to get services")
        }
        return response.json()
    } catch (error) {
        console.log(error)
    }
}
