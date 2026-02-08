"use server"

export async function postServiceAction(
    branch: string,
    part: {
        type: string
        model: string
        no: string
        serial: string
    },
    customer: {
        firstname: string
        othername: string
        lastname: string
        phone: string
    },
    amount: number,
    status: "paid in full" | "paid in installments",
) {
    try {
        const response = await fetch(`${process.env.BASE_URL}/api/services/postService`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "x-api-key": process.env.THREEWB_API_KEY
            },
            body: JSON.stringify({
                branch: branch,
                part: part,
                customer: customer,
                amount: amount,
                status: status,
            })
        })
        if (!response.ok) {
            throw new Error("Failed to post service")
        }
        return response.json()
    } catch (error) {
        console.log(error)
    }
}
