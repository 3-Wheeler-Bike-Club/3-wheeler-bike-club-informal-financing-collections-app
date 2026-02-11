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

    const { _id } = await req.json()

    try {
        await connectDB()
        const spare = await Spare.findOneAndUpdate(
            { _id, quantity: { $gte: 1 } },
            { $inc: { quantity: -1 } },
            { new: true }
        )

        if (!spare) {
            return new Response(
                JSON.stringify({
                    error: "Spare not found",
                }),
                { status: 404 }
            );
        }


        return new Response(
            JSON.stringify(spare),
            { status: 200 }
        );

    } catch (error) {
        return new Response(JSON.stringify({ message: "Internal Server Error" }), { status: 500 })
    }
}
