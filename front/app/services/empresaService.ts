// services/empresaService.ts
import { empresa } from "../api/db/schema";

const API_URL = "/api/empresa";

export const empresaService = {
  async getAll(): Promise<Empresa[]> {
    const response = await fetch(API_URL);

    if (!response.ok) {
      throw new Error("Falha ao buscar empresas");
    }

    return response.json();
  },

  async create(empresaData: Omit<Empresa, "id">): Promise<Empresa> {
    const response = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(empresaData),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || "Falha ao criar empresa");
    }

    return response.json();
  },
  async delete(id: number): Promise<void> {
    const response = await fetch(`/api/empresa/${id}`, {
      // Atualizei a URL para plural
      method: "DELETE",
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(
        errorData.error || "Falha ao excluir empresa e licenças relacionadas"
      );
    }
  },

  async getById(id: number): Promise<Empresa> {
    const response = await fetch(`${API_URL}/${id}`);

    if (!response.ok) {
      throw new Error("Empresa não encontrada");
    }

    return response.json();
  },

  async update(id: number, empresaData: Partial<Empresa>): Promise<Empresa> {
    const response = await fetch(`/api/empresa/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(empresaData),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || "Falha ao atualizar empresa");
    }

    return response.json();
  },
};
