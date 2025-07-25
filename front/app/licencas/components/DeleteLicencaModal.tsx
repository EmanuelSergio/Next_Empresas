"use client";

interface DeleteLicencaModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  licencaNumero: string;
}

export default function DeleteLicencaModal({
  isOpen,
  onClose,
  onConfirm,
  licencaNumero,
}: DeleteLicencaModalProps) {
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
            ></button>
          </div>
          <div className="modal-body">
            <p>
              Tem certeza que deseja excluir a licença{" "}
              <strong>{licencaNumero}</strong>? Esta ação não pode ser desfeita.
            </p>
          </div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-secondary"
              onClick={onClose}
            >
              Cancelar
            </button>
            <button
              type="button"
              className="btn btn-danger"
              onClick={onConfirm}
            >
              Confirmar Exclusão
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
