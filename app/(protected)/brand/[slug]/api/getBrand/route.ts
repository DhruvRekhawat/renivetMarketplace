import prisma from "@/lib/db";

export async function POST(req: Request) {  // Changed to POST for sending a body
    let email;

    try {
        const body = await req.json();
        email = body.email;
    } catch (error) {
        return new Response(JSON.stringify({ error: "Invalid JSON input" }), { status: 400 });
    }

    if (!email) {
        return new Response(JSON.stringify({ error: "Email is required" }), { status: 400 });
    }

    const brand = await prisma.brand.findUnique({
        where: {
            email: email,
        },
    });

    if (!brand) {
        return new Response(JSON.stringify({ error: "Brand not found" }), { status: 404 });
    }

    return new Response(JSON.stringify(brand), { status: 200 });
}
