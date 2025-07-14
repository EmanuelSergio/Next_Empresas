"use client";

import { useState } from "react";
import Link from "next/link";
import EditLicencaModal from "./components/EditLicencaModal";
import DeleteLicencaModal from "./components/DeleteLicencaModal";
import NewLicencaModal from "./components/NewLicencaModal";

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

export default function LicencasPage() {
  const [licencas, setLicencas] = useState<Licenca[]>([
    {
      id: 1,
      numero: "LIC-2023-001",
      orgaoAmbiental: "CETESB",
      emissao: "2023-01-10",
      validade: "2026-01-10",
      empresa: {
        id: 1,
        razaoSocial: "Empresa Exemplo Ltda",
      },
    },
    {
      id: 2,
      numero: "LIC-2023-002",
      orgaoAmbiental: "IBAMA",
      emissao: "2023-03-15",
      validade: "2025-03-15",
      empresa: {
        id: 2,
        razaoSocial: "Outra Empresa SA",
      },
    },
  ]);

  const empresasOptions: EmpresaOption[] = [
    { id: 1, razaoSocial: "Empresa Exemplo Ltda" },
    { id: 2, razaoSocial: "Outra Empresa SA" },
    { id: 3, razaoSocial: "Terceira Empresa ME" },
  ];

  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showNewModal, setShowNewModal] = useState(false);
  const [currentLicenca, setCurrentLicenca] = useState<Licenca | null>(null);

  const handleEditClick = (licenca: Licenca) => {
    setCurrentLicenca(licenca);
    setShowEditModal(true);
  };

  const handleDeleteClick = (licenca: Licenca) => {
    setCurrentLicenca(licenca);
    setShowDeleteModal(true);
  };

  const handleSaveLicenca = (updatedData: Licenca) => {
    setLicencas((prev) =>
      prev.map((lic) => (lic.id === updatedData.id ? updatedData : lic))
    );
    console.log("Licença atualizada:", updatedData);
  };

  const handleCreateLicenca = (newLicencaData: {
    numero: string;
    orgaoAmbiental: string;
    emissao: string;
    validade: string;
    empresaId: number;
  }) => {
    const newLicenca: Licenca = {
      id: Math.max(...licencas.map((l) => l.id)) + 1,
      numero: newLicencaData.numero,
      orgaoAmbiental: newLicencaData.orgaoAmbiental,
      emissao: newLicencaData.emissao,
      validade: newLicencaData.validade,
      empresa: {
        id: newLicencaData.empresaId,
        razaoSocial:
          empresasOptions.find((e) => e.id === newLicencaData.empresaId)
            ?.razaoSocial || "",
      },
    };

    setLicencas((prev) => [...prev, newLicenca]);
    setShowNewModal(false);
    console.log("Nova licença criada:", newLicenca);
  };

  const handleDeleteLicenca = () => {
    if (currentLicenca) {
      setLicencas((prev) => prev.filter((lic) => lic.id !== currentLicenca.id));
      console.log("Licença excluída:", currentLicenca.id);
      setShowDeleteModal(false);
    }
  };

  return (
    <main className="container mt-4">
      {/* Modal de Nova Licença */}
      <NewLicencaModal
        isOpen={showNewModal}
        onClose={() => setShowNewModal(false)}
        empresas={empresasOptions}
        onSave={handleCreateLicenca}
      />

      {/* Modais de Edição e Exclusão */}
      {currentLicenca && (
        <>
          <EditLicencaModal
            isOpen={showEditModal}
            onClose={() => setShowEditModal(false)}
            licenca={currentLicenca}
            empresas={empresasOptions}
            onSave={handleSaveLicenca}
          />

          <DeleteLicencaModal
            isOpen={showDeleteModal}
            onClose={() => setShowDeleteModal(false)}
            onConfirm={handleDeleteLicenca}
            licencaNumero={currentLicenca.numero}
          />
        </>
      )}

      {/* Cabeçalho */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1 className="text-dark">Licenças Ambientais</h1>
        <button
          onClick={() => setShowNewModal(true)}
          className="btn btn-success"
        >
          Nova Licença
        </button>
      </div>

      {/* Tabela de Licenças */}
      <div className="row">
        <div className="col-md-12">
          {licencas.length > 0 ? (
            <div className="table-responsive">
              <table className="table table-striped table-hover">
                <thead className="table-dark">
                  <tr>
                    <th>Número</th>
                    <th>Órgão Ambiental</th>
                    <th>Empresa</th>
                    <th>Emissão</th>
                    <th>Validade</th>
                    <th>Ações</th>
                  </tr>
                </thead>
                <tbody>
                  {licencas.map((licenca) => (
                    <tr key={licenca.id}>
                      <td>{licenca.numero}</td>
                      <td>{licenca.orgaoAmbiental}</td>
                      <td>
                        <Link href={`/empresas/${licenca.empresa.id}`}>
                          {licenca.empresa.razaoSocial}
                        </Link>
                      </td>
                      <td>{new Date(licenca.emissao).toLocaleDateString()}</td>
                      <td>{new Date(licenca.validade).toLocaleDateString()}</td>
                      <td>
                        <div className="d-flex gap-2">
                          <button
                            onClick={() => handleEditClick(licenca)}
                            className="btn btn-sm btn-outline-primary"
                          >
                            Editar
                          </button>
                          <button
                            onClick={() => handleDeleteClick(licenca)}
                            className="btn btn-sm btn-outline-danger"
                          >
                            Excluir
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="alert alert-info">
              Nenhuma licença cadastrada no sistema.
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
