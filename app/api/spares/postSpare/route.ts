import connectDB from "@/utils/db/mongodb"
import { middleware } from "@/utils/db/middleware"
import Spare from "@/model/spare"

export async function POST(
    req: Request,
) {
    const authResponse = middleware(req)
    if (authResponse.status !== 200) {
        return authResponse
    }

    const { branch, part, quantity, cost, msrp, waybill } = await req.json()

    try {
        await connectDB()
        const spare = await Spare.create({
            branch,
            part,
            quantity,
            cost,
            msrp,
            waybill,
        })
        return new Response(JSON.stringify(spare))
    } catch (error) {
        return new Response(JSON.stringify({ message: "Internal Server Error" }), { status: 500 })
    }
}
