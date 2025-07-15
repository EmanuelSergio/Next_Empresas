"use client";

import { useState } from "react";
import { Licenca } from "@/app/types/Licenca";

interface EmpresaOption {
  id: number;
  razaoSocial: string;
}

interface AddLicencaModalProps {
  isOpen: boolean;
  onClose: () => void;
  empresas: EmpresaOption[];
  onCreate: (licenca: Omit<Licenca, "id">) => Promise<void>;
}

export function AddLicencaModal({
  isOpen,
  onClose,
  empresas,
  onCreate,
}: AddLicencaModalProps) {
  const [formData, setFormData] = useState<Omit<Licenca, "id">>({
    numero: "",
    orgao: "",
    emissao: "",
    validade: "",
    empresaId: empresas[0]?.id || 0, // Define o primeiro como padrão
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      await onCreate(formData);
      onClose();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Falha ao criar licença");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  if (!isOpen) return null;

  return (
    <div
      className="modal show d-block"
      style={{ background: "rgba(0,0,0,0.5)" }}
    >
      <div className="modal-dialog modal-lg">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Adicionar Nova Licença</h5>
            <button
              type="button"
              className="btn-close"
              onClick={onClose}
              disabled={loading}
            ></button>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="modal-body">
              {error && <div className="alert alert-danger mb-3">{error}</div>}

              <div className="mb-3">
                <label className="form-label">Empresa</label>
                <select
                  name="empresaId"
                  value={formData.empresaId}
                  onChange={handleChange}
                  className="form-select"
                  required
                  disabled={loading}
                >
                  {empresas.map((empresa) => (
                    <option key={empresa.id} value={empresa.id}>
                      {empresa.razaoSocial}
                    </option>
                  ))}
                </select>
              </div>

              <div className="mb-3">
                <label className="form-label">Número da Licença</label>
                <input
                  type="text"
                  name="numero"
                  value={formData.numero}
                  onChange={handleChange}
                  className="form-control"
                  required
                  disabled={loading}
                />
              </div>

              <div className="mb-3">
                <label className="form-label">Órgão Ambiental</label>
                <input
                  type="text"
                  name="orgao"
                  value={formData.orgao}
                  onChange={handleChange}
                  className="form-control"
                  required
                  disabled={loading}
                />
              </div>

              <div className="row mb-3">
                <div className="col-md-6">
                  <label className="form-label">Data de Emissão</label>
                  <input
                    type="date"
                    name="emissao"
                    value={formData.emissao}
                    onChange={handleChange}
                    className="form-control"
                    required
                    disabled={loading}
                  />
                </div>
                <div className="col-md-6">
                  <label className="form-label">Data de Validade</label>
                  <input
                    type="date"
                    name="validade"
                    value={formData.validade}
                    onChange={handleChange}
                    className="form-control"
                    required
                    disabled={loading}
                  />
                </div>
              </div>
            </div>

            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                onClick={onClose}
                disabled={loading}
              >
                Cancelar
              </button>
              <button
                type="submit"
                className="btn btn-primary"
                disabled={loading}
              >
                {loading ? "Salvando..." : "Salvar Licença"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
