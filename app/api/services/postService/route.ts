import connectDB from "@/utils/db/mongodb"
import { middleware } from "@/utils/db/middleware"
import Service from "@/model/service"

export async function POST(
    req: Request,
) {
    const authResponse = middleware(req)
    if (authResponse.status !== 200) {
        return authResponse
    }

    const { branch, part, customer, amount, status } = await req.json()

    try {
        await connectDB()
        const service = await Service.create({
            branch: branch,
            part: part,
            customer: customer,
            amount: amount,
            status: status,
        })
        return new Response(JSON.stringify(service))
    } catch (error) {
        return new Response(JSON.stringify({ message: "Internal Server Error" }), { status: 500 })
    }
}
