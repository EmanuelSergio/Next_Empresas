"use client";

import { useState } from "react";

interface Licenca {
  id: number;
  numero: string;
  orgaoAmbiental: string;
  emissao: string;
  validade: string;
  empresa: {
    id: number;
    razaoSocial: string;
  };
}

interface EmpresaOption {
  id: number;
  razaoSocial: string;
}

interface EditLicencaModalProps {
  isOpen: boolean;
  onClose: () => void;
  licenca: Licenca;
  empresas: EmpresaOption[];
  onSave: (data: Licenca) => void;
}

export default function EditLicencaModal({
  isOpen,
  onClose,
  licenca,
  empresas,
  onSave,
}: EditLicencaModalProps) {
  const [formData, setFormData] = useState(licenca);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
    onClose();
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
            <h5 className="modal-title">Editar Licença</h5>
            <button
              type="button"
              className="btn-close"
              onClick={onClose}
            ></button>
          </div>
          <div className="modal-body">
            <form onSubmit={handleSubmit}>
              <div className="row g-3">
                <div className="col-md-6">
                  <label className="form-label">Número da Licença</label>
                  <input
                    type="text"
                    className="form-control"
                    name="numero"
                    value={formData.numero}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="col-md-6">
                  <label className="form-label">Órgão Ambiental</label>
                  <input
                    type="text"
                    className="form-control"
                    name="orgaoAmbiental"
                    value={formData.orgaoAmbiental}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="col-md-6">
                  <label className="form-label">Empresa</label>
                  <select
                    className="form-select"
                    name="empresa"
                    value={formData.empresa.id}
                    onChange={(e) => {
                      const empresaId = parseInt(e.target.value);
                      const empresa = empresas.find(
                        (emp) => emp.id === empresaId
                      );
                      if (empresa) {
                        setFormData((prev: any) => ({
                          ...prev,
                          empresa: {
                            id: empresaId,
                            razaoSocial: empresa.razaoSocial,
                          },
                        }));
                      }
                    }}
                    required
                  >
                    {empresas.map((empresa) => (
                      <option key={empresa.id} value={empresa.id}>
                        {empresa.razaoSocial}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="col-md-3">
                  <label className="form-label">Data de Emissão</label>
                  <input
                    type="date"
                    className="form-control"
                    name="emissao"
                    value={formData.emissao}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="col-md-3">
                  <label className="form-label">Data de Validade</label>
                  <input
                    type="date"
                    className="form-control"
                    name="validade"
                    value={formData.validade}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>
              <div className="modal-footer mt-4">
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={onClose}
                >
                  Cancelar
                </button>
                <button type="submit" className="btn btn-primary">
                  Salvar Alterações
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
