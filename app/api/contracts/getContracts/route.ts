import connectDB from "@/utils/db/mongodb";
import { middleware } from "@/utils/db/middleware";
import Contract from "@/model/contract";


export async function POST(
    req: Request,
) {
    const authResponse = middleware(req);
    if (authResponse.status !== 200) {
        return authResponse;
    }

    try {
        await connectDB();
        const contracts = await Contract.find({});
        

        if (!contracts) {
            return new Response(
                JSON.stringify({
                    error: "Contracts not found",
                }),
                { status: 404 }
            );
        }


        return new Response(
            JSON.stringify(contracts),
            { status: 200 }
        );

    } catch (error) {
        return new Response(
            JSON.stringify({
                error: "Failed to fetch contracts",
                details: error
            }),
            { status: 500 }
        );

    }
}