import Service from "@/model/service";
import connectDB from "@/utils/db/mongodb";
import { middleware } from "@/utils/db/middleware";


export async function POST(
    req: Request,
) {
    const authResponse = middleware(req);
    if (authResponse.status !== 200) {
        return authResponse;
    }

    try {
        await connectDB();
        const services = await Service.find({});


        if (!services) {
            return new Response(
                JSON.stringify({
                    error: "Services not found",
                }),
                { status: 404 }
            );
        }


        return new Response(
            JSON.stringify(services),
            { status: 200 }
        );

    } catch (error) {
        return new Response(
            JSON.stringify({
                error: "Failed to fetch services",
                details: error
            }),
            { status: 500 }
        );

    }
}
