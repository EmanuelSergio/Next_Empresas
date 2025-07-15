import { NextResponse } from "next/server";
import { db } from "../db";
import { empresa } from "../db/schema";
import { eq } from "drizzle-orm";

export async function GET() {
  try {
    const empresas = await db.select().from(empresa);
    return NextResponse.json(empresas);
  } catch (error) {
    return NextResponse.json(
      { error: "Falha ao buscar empresas" },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const data = await request.json();
    const newEmpresa = await db.insert(empresa).values(data);
    return NextResponse.json(newEmpresa, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: "Falha ao criar empresa" },
      { status: 400 }
    );
  }
}

export async function DELETE(request: Request) {
  try {
    const { id } = await request.json();
    if (!id) {
      return NextResponse.json(
        { error: "ID da empresa é obrigatório" },
        { status: 400 }
      );
    }

    const deleted = await db.delete(empresa).where(eq(empresa.id, id));
    return NextResponse.json(deleted);
  } catch (error) {
    return NextResponse.json(
      { error: "Falha ao excluir empresa" },
      { status: 500 }
    );
  }
}
