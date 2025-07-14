"use client";

import { useState } from "react";
import Link from "next/link";
import { EditEmpresaModal } from "./components/EditEmpresaModal";
import { DeleteConfirmationModal } from "./components/DeleteLicencaModal";

interface Empresa {
  id: number;
  razaoSocial: string;
  cnpj: string;
  cep: string;
  cidade: string;
  estado: string;
  bairro: string;
  complemento: string;
}

function EmpresaCard({
  empresa,
  onEdit,
  onDelete,
}: {
  empresa: Empresa;
  onEdit: () => void;
  onDelete: () => void;
}) {
  return (
    <div className="card mb-3">
      <div className="card-body">
        <h5 className="card-title">{empresa.razaoSocial}</h5>
        <h6 className="card-subtitle mb-2 text-muted">CNPJ: {empresa.cnpj}</h6>
        <p className="card-text">
          {empresa.cidade} - {empresa.estado}
        </p>
        <div className="d-flex justify-content-between">
          <Link href={`/empresas/${empresa.id}`} className="btn btn-primary">
            Ver detalhes
          </Link>
          <div>
            <button onClick={onEdit} className="btn btn-outline-secondary me-2">
              Editar
            </button>
            <button onClick={onDelete} className="btn btn-outline-danger">
              Excluir
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function EmpresasPage() {
  const [empresas, setEmpresas] = useState<Empresa[]>([
    {
      id: 1,
      razaoSocial: "Empresa Exemplo 1",
      cnpj: "00.000.000/0001-00",
      cidade: "São Paulo",
      estado: "SP",
      cep: "01000-000",
      bairro: "Centro",
      complemento: "",
    },
    {
      id: 2,
      razaoSocial: "Empresa Exemplo 2",
      cnpj: "00.000.000/0001-01",
      cidade: "Rio de Janeiro",
      estado: "RJ",
      cep: "",
      bairro: "",
      complemento: "",
    },
  ]);

  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [currentEmpresa, setCurrentEmpresa] = useState<Empresa | null>(null);

  const handleEditClick = (empresa: Empresa) => {
    setCurrentEmpresa(empresa);
    setShowEditModal(true);
  };

  const handleDeleteClick = (empresa: Empresa) => {
    setCurrentEmpresa(empresa);
    setShowDeleteModal(true);
  };

  const handleSaveEmpresa = (updatedData: Empresa) => {
    setEmpresas((prev) =>
      prev.map((emp) => (emp.id === updatedData.id ? updatedData : emp))
    );
    setShowEditModal(false);
  };

  const handleDeleteEmpresa = () => {
    if (currentEmpresa) {
      setEmpresas((prev) => prev.filter((emp) => emp.id !== currentEmpresa.id));
      setShowDeleteModal(false);
    }
  };

  return (
    <main className="container mt-4">
      {currentEmpresa && (
        <>
          <EditEmpresaModal
            isOpen={showEditModal}
            onClose={() => setShowEditModal(false)}
            empresa={currentEmpresa}
            onSave={handleSaveEmpresa}
          />

          <DeleteConfirmationModal
            isOpen={showDeleteModal}
            onClose={() => setShowDeleteModal(false)}
            onConfirm={handleDeleteEmpresa}
          />
        </>
      )}

      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1 className="text-dark">Empresas</h1>
        <Link href="/empresas/nova" className="btn btn-success">
          Nova Empresa
        </Link>
      </div>

      <div className="row">
        <div className="col-md-8 mx-auto">
          {empresas.length === 0 ? (
            <div className="alert alert-info">Nenhuma empresa cadastrada.</div>
          ) : (
            empresas.map((empresa) => (
              <EmpresaCard
                key={empresa.id}
                empresa={empresa}
                onEdit={() => handleEditClick(empresa)}
                onDelete={() => handleDeleteClick(empresa)}
              />
            ))
          )}
        </div>
      </div>
    </main>
  );
}
