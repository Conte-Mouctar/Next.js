import { NextResponse } from "next/server";
import { createClient } from "@vercel/edge-config";

const edgeConfig = createClient(process.env.EDGE_CONFIG);

export const config = { matcher: "/welcome" };

export async function middleware() {
  if (!process.env.EDGE_CONFIG) {
    return NextResponse.json(
      { error: "EDGE_CONFIG is not defined" },
      { status: 500 }
    );
  }

  const greeting = await edgeConfig.get("greeting"); // ✅ Maintenant, il récupère bien les données
  return NextResponse.json({ message: greeting });
}
