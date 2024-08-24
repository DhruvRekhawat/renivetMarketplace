import prisma from "@/lib/db";

const validStatuses = ["PENDING", "APPROVED", "REMOVED"] as const;

export async function POST(req: Request) {
  try {
    const { id, status }: { id: number; status: any } = await req.json();

    if (!id || !status) {
      return new Response(JSON.stringify({ error: "ID and status are required" }), { status: 400 });
    }

    if (!validStatuses.includes(status as typeof validStatuses[number])) {
      return new Response(JSON.stringify({ error: "Invalid status value" }), { status: 400 });
    }

    // Update the brand's status
    const updatedBrand = await prisma.brand.update({
      where: { id },
      data: { status },
    });

    return new Response(JSON.stringify(updatedBrand), { status: 200 });
  } catch (error) {
    console.error("Error updating brand status:", error);
    return new Response(JSON.stringify({ error: "Failed to update brand status" }), { status: 500 });
  }
}