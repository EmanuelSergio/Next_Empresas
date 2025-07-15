"use client";

import { Licenca } from "@/app/types/Licenca";
import React from "react";

interface SelectLicencaModalProps {
  isOpen: boolean;
  onClose: () => void;
  licencasDisponiveis: Licenca[];
  licencasVinculadas: Licenca[];
  onVincular: (licenca: Licenca) => void;
}

export function AddLicencaModal({
  isOpen,
  onClose,
  licencasDisponiveis,
  licencasVinculadas,
  onVincular,
}: SelectLicencaModalProps) {
  if (!isOpen) return null;

  const licencasFiltradas = licencasDisponiveis.filter(
    (licenca) => !licencasVinculadas.some((l) => l.id === licenca.id)
  );

  return (
    <div
      className="modal show d-block"
      tabIndex={-1}
      style={{ background: "rgba(0,0,0,0.5)" }}
    >
      <div className="modal-dialog modal-lg">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Selecionar Licença</h5>
            <button
              type="button"
              className="btn-close"
              onClick={onClose}
            ></button>
          </div>
          <div className="modal-body">
            {licencasFiltradas.length > 0 ? (
              <table className="table table-hover">
                <thead>
                  <tr>
                    <th>Número</th>
                    <th>Órgão</th>
                    <th>Emissão</th>
                    <th>Validade</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {licencasFiltradas.map((licenca) => (
                    <tr key={licenca.id}>
                      <td>{licenca.numero}</td>
                      <td>{licenca.orgao}</td>
                      <td>{licenca.emissao}</td>
                      <td>{licenca.validade}</td>
                      <td>
                        <button
                          className="btn btn-sm btn-success"
                          onClick={() => onVincular(licenca)}
                        >
                          Vincular
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <div className="alert alert-info">
                Todas as licenças disponíveis já estão vinculadas a esta
                empresa.
              </div>
            )}
          </div>
          <div className="modal-footer">
            <button className="btn btn-secondary" onClick={onClose}>
              Fechar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
