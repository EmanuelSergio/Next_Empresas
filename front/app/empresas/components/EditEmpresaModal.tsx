"use client";
import { useEffect, useState } from "react";
// Componente do Modal de Edição
export function EditEmpresaModal({
  isOpen,
  onClose,
  empresa,
  onSave,
}: {
  isOpen: boolean;
  onClose: () => void;
  empresa: Empresa;
  onSave: (data: Empresa) => void;
}) {
  const [formData, setFormData] = useState<Empresa>(empresa);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
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
            <h5 className="modal-title">Editar Empresa</h5>
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
                  <label className="form-label">Razão Social</label>
                  <input
                    type="text"
                    className="form-control"
                    name="razao_social"
                    value={formData.razao_social}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="col-md-6">
                  <label className="form-label">CNPJ</label>
                  <input
                    type="text"
                    className="form-control"
                    name="cnpj"
                    value={formData.cnpj}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="col-md-3">
                  <label className="form-label">CEP</label>
                  <input
                    type="text"
                    className="form-control"
                    name="cep"
                    value={formData.cep}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="col-md-5">
                  <label className="form-label">Cidade</label>
                  <input
                    type="text"
                    className="form-control"
                    name="cidade"
                    value={formData.cidade}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="col-md-4">
                  <label className="form-label">Estado</label>
                  <input
                    type="text"
                    className="form-control"
                    name="estado"
                    value={formData.estado}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="col-md-6">
                  <label className="form-label">Bairro</label>
                  <input
                    type="text"
                    className="form-control"
                    name="bairro"
                    value={formData.bairro}
                    onChange={handleChange}
                    required
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
