import { NextResponse } from "next/server";

import { extractQuizData } from "@/helper";
import axios from "axios";

export async function GET() {
   const { data } = await axios.get("https://api.jsonserve.com/Uw5CrX");
   const quiz = extractQuizData(data);
   return NextResponse.json(quiz);
}
