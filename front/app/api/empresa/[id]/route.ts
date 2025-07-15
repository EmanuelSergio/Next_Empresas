import { NextResponse } from "next/server";
import { db } from "../../db";
import { empresa, licenca } from "../../db/schema";
import { eq } from "drizzle-orm";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    // Extrai o ID de forma síncrona (não precisa de await)
    const { id: idString } = await params;
    const empresaId = Number(idString);

    // Validação do ID
    if (isNaN(empresaId)) {
      return NextResponse.json({ error: "ID inválido" }, { status: 400 });
    }

    const [empresaData] = await db
      .select()
      .from(empresa)
      .where(eq(empresa.id, empresaId))
      .limit(1);

    if (!empresaData) {
      return NextResponse.json(
        { error: "Empresa não encontrada" },
        { status: 404 }
      );
    }

    return NextResponse.json(empresaData);
  } catch (error) {
    console.error("Erro ao buscar empresa:", error);
    return NextResponse.json(
      { error: "Falha ao buscar empresa" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const empresaId = Number(params.id);

    // Validação do ID
    if (isNaN(empresaId)) {
      return NextResponse.json(
        { error: "ID da empresa inválido" },
        { status: 400 }
      );
    }

    // Inicia uma transação para garantir atomicidade
    await db.transaction(async (tx) => {
      // Primeiro deleta todas as licenças associadas
      await tx.delete(licenca).where(eq(licenca.empresaId, empresaId));

      // Depois deleta a empresa
      await tx.delete(empresa).where(eq(empresa.id, empresaId));
    });

    return NextResponse.json(
      { success: true, deletedId: empresaId },
      { status: 200 }
    );
  } catch (error) {
    console.error("Erro ao excluir empresa e licenças:", error);
    return NextResponse.json(
      { error: "Falha ao excluir empresa e licenças relacionadas" },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const empresaId = Number(params.id);
    const data = await request.json();

    // Validação do ID
    if (isNaN(empresaId)) {
      return NextResponse.json(
        { error: "ID da empresa inválido" },
        { status: 400 }
      );
    }

    // Atualiza a empresa
    await db.update(empresa).set(data).where(eq(empresa.id, empresaId));

    // Busca a empresa atualizada
    const [updatedEmpresa] = await db
      .select()
      .from(empresa)
      .where(eq(empresa.id, empresaId))
      .limit(1);

    return NextResponse.json(updatedEmpresa);
  } catch (error) {
    console.error("Erro ao atualizar empresa:", error);
    return NextResponse.json(
      { error: "Falha ao atualizar empresa" },
      { status: 500 }
    );
  }
}
