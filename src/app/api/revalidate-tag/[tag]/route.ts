import { revalidateTag } from "next/cache";

export async function GET(
  req: Request,
  { params }: { params: { tag: string } },
) {
  const { tag } = params;
  revalidateTag(tag);

  return Response.json({
    status: true,
    tag,
    timestamp: new Date().toISOString(),
  });
}
