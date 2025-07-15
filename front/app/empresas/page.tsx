"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { EditEmpresaModal } from "./components/EditEmpresaModal";
import { DeleteConfirmationModal } from "./components/DeleteEmpresaModal";
import { AddEmpresaModal } from "./components/CreateEmpresaModal";
import { empresaService } from "../services/empresaService";

interface Empresa {
  id: number;
  razao_social: string;
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
        <h5 className="card-title">{empresa.razao_social}</h5>
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
  const [empresas, setEmpresas] = useState<Empresa[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchEmpresas = async () => {
    try {
      setLoading(true);
      const response = await empresaService.getAll();
      setEmpresas(response);
    } catch (error) {
      console.error(error);
      setError("Falha ao carregar empresas");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEmpresas();
  }, []);

  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [currentEmpresa, setCurrentEmpresa] = useState<Empresa | null>(null);

  const handleEditClick = (empresa: Empresa) => {
    setCurrentEmpresa(empresa);
    setShowEditModal(true);
  };

  const handleDeleteClick = (empresa: Empresa) => {
    setCurrentEmpresa(empresa);
    setShowDeleteModal(true);
  };

  if (loading) {
    return (
      <main className="container mt-4">
        <div className="d-flex justify-content-center">
          <div className="spinner-border" role="status">
            <span className="visually-hidden">Carregando...</span>
          </div>
        </div>
      </main>
    );
  }

  if (error) {
    return (
      <main className="container mt-4">
        <div className="alert alert-danger">{error}</div>
      </main>
    );
  }

  return (
    <main className="container mt-4">
      {currentEmpresa && (
        <>
          <EditEmpresaModal
            isOpen={showEditModal}
            onClose={() => setShowEditModal(false)}
            empresa={currentEmpresa}
            onSave={fetchEmpresas}
          />

          <DeleteConfirmationModal
            isOpen={showDeleteModal}
            empresaId={currentEmpresa.id}
            onClose={() => setShowDeleteModal(false)}
            onConfirm={fetchEmpresas}
          />
        </>
      )}

      <AddEmpresaModal
        isOpen={showAddModal}
        onClose={() => setShowAddModal(false)}
        onSave={fetchEmpresas}
      />

      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1 className="text-dark">Empresas</h1>
        <button
          onClick={() => setShowAddModal(true)}
          className="btn btn-success"
        >
          Nova Empresa
        </button>
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
