import { NextResponse } from "next/server";
import { runDyhEngine } from "@/dyh/logic/run-dyh-engine";
import { generateDar } from "@/dyh/logic/dar-engine";
import { StrategyMeta } from "@/dyh/logic/ss-schema";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const strategyResult = runDyhEngine(body);

    const dar = await generateDar({
      userInputs: body,
      strategy: strategyResult.strategy as StrategyMeta,
      calculations: strategyResult.calculations,
    });

    return NextResponse.json(
      {
        success: true,
        strategy: strategyResult.strategy,
        calculations: strategyResult.calculations,
        dar,
      },
      { status: 200 }
    );
  } catch (error: any) {
    console.error("run-dar error:", error);

    return NextResponse.json(
      {
        success: false,
        error: error?.message ?? "Unknown error",
      },
      { status: 500 }
    );
  }
}

