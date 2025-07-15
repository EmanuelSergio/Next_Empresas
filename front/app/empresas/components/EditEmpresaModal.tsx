"use client";

import { useState } from "react";
import { empresaService } from "@/app/services/empresaService";

interface EditEmpresaModalProps {
  isOpen: boolean;
  onClose: () => void;
  empresa: Empresa;
  onSave: () => Promise<void> | void;
}

export function EditEmpresaModal({
  isOpen,
  onClose,
  empresa,
  onSave,
}: EditEmpresaModalProps) {
  const [formData, setFormData] = useState<Empresa>(empresa);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const validateForm = () => {
    if (!formData.razao_social.trim()) {
      setError("Razão social é obrigatória");
      return false;
    }

    if (!formData.cnpj.trim()) {
      setError("CNPJ é obrigatório");
      return false;
    }

    if (!formData.cep.trim()) {
      setError("CEP é obrigatório");
      return false;
    }

    if (!formData.cidade.trim()) {
      setError("Cidade é obrigatória");
      return false;
    }

    if (!formData.estado.trim()) {
      setError("Estado é obrigatório");
      return false;
    }

    if (!formData.bairro.trim()) {
      setError("Bairro é obrigatório");
      return false;
    }

    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!validateForm()) return;

    setLoading(true);

    try {
      await empresaService.update(empresa.id, formData);
      await onSave();
      onClose(); // Fecha o modal
    } catch (err) {
      console.error("Erro ao atualizar empresa:", err);
      setError(
        err instanceof Error ? err.message : "Erro ao atualizar empresa"
      );
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div
      className="modal fade show"
      style={{ display: "block", backgroundColor: "rgba(0,0,0,0.5)" }}
    >
      <div className="modal-dialog modal-lg">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Editar Empresa</h5>
            <button
              type="button"
              className="btn-close"
              onClick={onClose}
              disabled={loading}
            ></button>
          </div>
          <div className="modal-body">
            {error && (
              <div className="alert alert-danger mb-3">
                <i className="bi bi-exclamation-triangle-fill me-2"></i>
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit}>
              <div className="row g-3">
                <div className="col-md-12">
                  <label className="form-label">Razão Social*</label>
                  <input
                    type="text"
                    className="form-control"
                    name="razao_social"
                    value={formData.razao_social}
                    onChange={handleChange}
                    required
                    disabled={loading}
                  />
                </div>

                <div className="col-md-6">
                  <label className="form-label">CNPJ*</label>
                  <input
                    type="text"
                    className="form-control"
                    name="cnpj"
                    value={formData.cnpj}
                    onChange={handleChange}
                    required
                    disabled={loading}
                  />
                </div>

                <div className="col-md-6">
                  <label className="form-label">CEP*</label>
                  <input
                    type="text"
                    className="form-control"
                    name="cep"
                    value={formData.cep}
                    onChange={handleChange}
                    required
                    disabled={loading}
                  />
                </div>

                <div className="col-md-6">
                  <label className="form-label">Cidade*</label>
                  <input
                    type="text"
                    className="form-control"
                    name="cidade"
                    value={formData.cidade}
                    onChange={handleChange}
                    required
                    disabled={loading}
                  />
                </div>

                <div className="col-md-6">
                  <label className="form-label">Estado*</label>
                  <input
                    type="text"
                    className="form-control"
                    name="estado"
                    value={formData.estado}
                    onChange={handleChange}
                    required
                    disabled={loading}
                  />
                </div>

                <div className="col-md-6">
                  <label className="form-label">Bairro*</label>
                  <input
                    type="text"
                    className="form-control"
                    name="bairro"
                    value={formData.bairro}
                    onChange={handleChange}
                    required
                    disabled={loading}
                  />
                </div>

                <div className="col-md-6">
                  <label className="form-label">Complemento</label>
                  <input
                    type="text"
                    className="form-control"
                    name="complemento"
                    value={formData.complemento}
                    onChange={handleChange}
                    disabled={loading}
                  />
                </div>
              </div>

              <div className="modal-footer mt-4">
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
                  {loading ? (
                    <>
                      <span
                        className="spinner-border spinner-border-sm me-2"
                        role="status"
                        aria-hidden="true"
                      ></span>
                      Salvando...
                    </>
                  ) : (
                    "Salvar Alterações"
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
