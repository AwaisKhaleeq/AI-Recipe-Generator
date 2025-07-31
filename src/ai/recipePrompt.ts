import { NextResponse } from "next/server";
import { generateRecipe } from "@/lib/generateRecipe";

export async function POST(req: Request) {
  const { ingredients } = await req.json();

  if (!ingredients || !Array.isArray(ingredients)) {
    return NextResponse.json({ error: "Invalid ingredients" }, { status: 400 });
  }

  try {
    const recipe = await generateRecipe(ingredients);
    return NextResponse.json({ recipe });
  } catch (error) {
    console.error("Recipe generation failed:", error);
    return NextResponse.json({ error: "Failed to generate recipe" }, { status: 500 });
  }
}
