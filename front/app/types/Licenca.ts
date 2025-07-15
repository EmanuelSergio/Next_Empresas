export type Licenca = {
  id: number;
  empresaId: number;
  numero: string;
  orgao: string;
  emissao: string; // ISO date string, e.g., '2024-06-01'
  validade: string; // ISO date string, e.g., '2025-06-01'
};
