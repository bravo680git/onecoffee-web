import { revalidateTag } from "next/cache";

export async function POST(
  req: Request,
  { params }: { params: { tag: string } },
) {
  const { tag } = params;
  revalidateTag(tag);

  return Response.json(
    {
      status: true,
      tag,
      timestamp: new Date().toISOString(),
    },
    {
      status: 200,
      headers: {
        "Access-Control-Allow-Origin": process.env.ADMIN_DOMAIN,
        "Access-Control-Allow-Methods": "POST, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type, token, authorization",
      },
    },
  );
}

export async function OPTIONS() {
  return new Response(null, {
    status: 204,
    headers: {
      "Access-Control-Allow-Origin": process.env.ADMIN_DOMAIN,
      "Access-Control-Allow-Methods": "POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type, token, authorization",
    },
  });
}
