import { NextResponse } from "next/server";
import { runStrategyEngine } from "@/engine/dar/logic";

export async function POST(req: Request) {
  const { answers } = await req.json();
  const result = runStrategyEngine(answers);
  return NextResponse.json(result);
}
