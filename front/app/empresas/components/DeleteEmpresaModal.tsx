"use client";

import { deleteEmpresa } from "@/app/api/lib/actions";
import { empresaService } from "@/app/services/empresaService";
import { useState } from "react";

interface DeleteConfirmationModalProps {
  isOpen: boolean;
  onClose: () => void;
  empresaId: number;
  onConfirm: () => void;
}

export function DeleteConfirmationModal({
  isOpen,
  onClose,
  empresaId,
  onConfirm,
}: DeleteConfirmationModalProps) {
  const [isDeleting, setIsDeleting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleDelete = async (id: number) => {
    try {
      await empresaService.delete(id);
      onConfirm();
      onClose();
    } catch (err) {
      console.error("Erro ao excluir empresa:", err);
    }
  };

  if (!isOpen) return null;

  return (
    <div
      className="modal fade show"
      style={{ display: "block", backgroundColor: "rgba(0,0,0,0.5)" }}
    >
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Confirmar Exclusão</h5>
            <button
              type="button"
              className="btn-close"
              onClick={onClose}
              disabled={isDeleting}
            ></button>
          </div>
          <div className="modal-body">
            <p>
              Tem certeza que deseja excluir esta empresa? Esta ação não pode
              ser desfeita.
            </p>
            {error && <div className="alert alert-danger mt-3">{error}</div>}
          </div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-secondary"
              onClick={onClose}
              disabled={isDeleting}
            >
              Cancelar
            </button>
            <button
              type="button"
              className="btn btn-danger"
              onClick={() => handleDelete(empresaId)}
              disabled={isDeleting}
            >
              {isDeleting ? (
                <>
                  <span
                    className="spinner-border spinner-border-sm me-2"
                    role="status"
                    aria-hidden="true"
                  ></span>
                  Excluindo...
                </>
              ) : (
                "Confirmar Exclusão"
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
