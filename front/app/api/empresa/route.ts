// app/api/empresa/route.ts
import { NextResponse } from "next/server";
import { db } from "../db";
import { empresa } from "../db/schema";

export async function GET() {
  const empresas = await db.select().from(empresa);
  return NextResponse.json(empresas);
}

export async function POST(request: Request) {
  const data = await request.json();
  const newEmpresa = await db.insert(empresa).values(data);
  return NextResponse.json(newEmpresa);
}
