import connectDB from "@/utils/db/mongodb"
import { middleware } from "@/utils/db/middleware"
import Motor from "@/model/motor"

export async function POST(
    req: Request,
) {
    const authResponse = middleware(req)
    if (authResponse.status !== 200) {
        return authResponse
    }

    const { branch, vehicle, cost, msrp, waybill } = await req.json()

    try {
        await connectDB()
        const motor = await Motor.create({
            branch: branch,
            vehicle: vehicle,
            cost: cost,
            msrp: msrp,
            waybill: waybill,
            status: "in stock",
        })
        return new Response(JSON.stringify(motor))
    } catch (error) {
        return new Response(JSON.stringify({ message: "Internal Server Error" }), { status: 500 })
    }
}
