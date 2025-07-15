// app/api/empresas/[id]/licencas/route.ts
import { NextResponse } from "next/server";
import { db } from "@/app/api/db";
import { licenca } from "@/app/api/db/schema";
import { eq } from "drizzle-orm";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const empresaId = Number(id);

    // Validação do ID
    if (isNaN(empresaId)) {
      return NextResponse.json(
        { error: "ID da empresa inválido" },
        { status: 400 }
      );
    }

    // Busca as licenças da empresa
    const licencas = await db.query.licenca.findMany({
      where: eq(licenca.empresaId, empresaId),
    });

    return NextResponse.json(licencas);
  } catch (error) {
    console.error("Erro ao buscar licenças:", error);
    return NextResponse.json(
      { error: "Falha ao buscar licenças da empresa" },
      { status: 500 }
    );
  }
}
