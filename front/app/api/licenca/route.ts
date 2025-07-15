// app/api/licencas/route.ts
import { eq } from "drizzle-orm";
import { db } from "../db";
import { licenca } from "../db/schema";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const data = await request.json();

    // Validação básica
    if (!data.empresaId) {
      return NextResponse.json(
        { error: "ID da empresa é obrigatório" },
        { status: 400 }
      );
    }

    const [newLicenca] = await db.insert(licenca).values(data).$returningId(); // Retorna a licença criada

    return NextResponse.json(newLicenca, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: "Falha ao criar licença" },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const licencas = await db.select().from(licenca);
    return NextResponse.json(licencas);
  } catch (error) {
    return NextResponse.json(
      { error: "Falha ao buscar licenças" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const licencaId = Number(params.id);

    if (isNaN(licencaId)) {
      return NextResponse.json(
        { error: "ID da licença inválido" },
        { status: 400 }
      );
    }

    await db.delete(licenca).where(eq(licenca.id, licencaId));

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    console.error("Erro ao excluir licença:", error);
    return NextResponse.json(
      { error: "Falha ao excluir licença" },
      { status: 500 }
    );
  }
}
