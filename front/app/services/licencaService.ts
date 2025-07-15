import { Licenca } from "../types/Licenca";

const API_URL = "/api/licenca";

export const licencaService = {
  async create(licencaData: Omit<Licenca, "id">): Promise<Licenca> {
    const response = await fetch(`${API_URL}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(licencaData),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || "Falha ao criar licença");
    }

    return response.json();
  },

  async getAll(): Promise<Licenca[]> {
    const response = await fetch(API_URL);

    if (!response.ok) {
      throw new Error("Falha ao buscar licenças");
    }

    return response.json();
  },

  async getByEmpresaId(empresaId: number): Promise<Licenca[]> {
    const response = await fetch(`/api/empresa/${empresaId}/licencas`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || "Falha ao buscar licenças da empresa");
    }

    return response.json();
  },
  async delete(id: number): Promise<void> {
    const response = await fetch(`/api/licenca/${id}`, {
      method: "DELETE",
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || "Falha ao excluir licença");
    }
  },

  async update(
    id: number,
    data: Partial<Omit<Licenca, "id">>
  ): Promise<Licenca> {
    const response = await fetch(`/api/licenca/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error("Falha ao atualizar licença");
    }

    return response.json();
  },
};
