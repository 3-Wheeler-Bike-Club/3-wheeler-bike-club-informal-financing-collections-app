import connectDB from "@/utils/db/mongodb"
import { middleware } from "@/utils/db/middleware"
import Contract from "@/model/contract"

export async function POST(
    req: Request,
) {
    const authResponse = middleware(req)
    if (authResponse.status !== 200) {
        return authResponse
    }

    const { id, owner, driver, vehicle, vin, license, deposit, start, end, duration, amount, status } = await req.json()

    try {
        await connectDB()
        const contract = await Contract.create({ 
            id: id,
            owner: owner,
            driver: driver,
            vehicle: vehicle,
            vin: vin,
            license: license,
            deposit: deposit,
            start: start,
            end: end,
            duration: duration,
            amount: amount,
            status: status,
        })
        return new Response(JSON.stringify(contract))
    } catch (error) {
        return new Response(JSON.stringify({ message: "Internal Server Error" }), { status: 500 })
    }
}
