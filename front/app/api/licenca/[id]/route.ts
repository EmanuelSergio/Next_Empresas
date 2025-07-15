// app/api/licencas/[id]/route.ts
import { NextResponse } from "next/server";
import { db } from "../../db";
import { licenca } from "../../db/schema";
import { eq } from "drizzle-orm";

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const id = Number((await params).id);

    // Validação do ID
    if (isNaN(id)) {
      return NextResponse.json(
        { error: "ID da licença inválido" },
        { status: 400 }
      );
    }

    // Executa a exclusão
    const result = await db.delete(licenca).where(eq(licenca.id, id));

    return NextResponse.json({ success: true, deletedId: id }, { status: 200 });
  } catch (error) {
    console.error("Erro ao excluir licença:", error);
    return NextResponse.json(
      { error: "Falha ao excluir licença" },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const id = parseInt((await params).id);
    if (isNaN(id)) {
      return NextResponse.json({ error: "ID inválido" }, { status: 400 });
    }

    const body = await request.json();

    // Atualiza a licença no banco de dados
    await db
      .update(licenca)
      .set({
        numero: body.numero,
        orgao: body.orgaoAmbiental,
        emissao: new Date(body.emissao),
        validade: new Date(body.validade),
        empresaId: body.empresaId,
      })
      .where(eq(licenca.id, id));

    // Busca o registro atualizado
    const updatedLicenca = await db
      .select()
      .from(licenca)
      .where(eq(licenca.id, id));

    return NextResponse.json(updatedLicenca[0]);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Erro ao atualizar licença" },
      { status: 500 }
    );
  }
}
