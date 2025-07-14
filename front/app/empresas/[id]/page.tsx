"use client";

import { useState } from "react";
import Link from "next/link";
import { EditEmpresaModal } from "../components/EditEmpresaModal";
import { DeleteConfirmationModal } from "../components/DeleteLicencaModal";
import { SelectLicencaModal } from "../components/AddLicencaModal";

interface Licenca {
  id: number;
  numero: string;
  orgaoAmbiental: string;
  emissao: string;
  validade: string;
}

export default function EmpresaDetalhesPage() {
  const [empresa, setEmpresa] = useState<Empresa>({
    id: 1,
    razaoSocial: "Empresa Exemplo Ltda",
    cnpj: "00.000.000/0001-00",
    cep: "00000-000",
    cidade: "São Paulo",
    estado: "SP",
    bairro: "Centro",
    complemento: "Sala 1001",
  });

  const [licencas, setLicencas] = useState<Licenca[]>([
    {
      id: 1,
      numero: "LIC-2023-001",
      orgaoAmbiental: "CETESB",
      emissao: "10/01/2023",
      validade: "10/01/2026",
    },
    {
      id: 2,
      numero: "LIC-2023-002",
      orgaoAmbiental: "IBAMA",
      emissao: "15/03/2023",
      validade: "15/03/2025",
    },
  ]);

  // Modal de seleção de licença
  const [showSelectModal, setShowSelectModal] = useState(false);

  // Simulação de licenças disponíveis para vincular
  const licencasDisponiveis: Licenca[] = [
    {
      id: 3,
      numero: "LIC-2023-003",
      orgaoAmbiental: "SMA",
      emissao: "01/05/2023",
      validade: "01/05/2026",
    },
    {
      id: 4,
      numero: "LIC-2023-004",
      orgaoAmbiental: "FEPAM",
      emissao: "20/06/2023",
      validade: "20/06/2025",
    },
  ];

  const handleVincularLicenca = (licenca: Licenca) => {
    setLicencas((prev) => [...prev, licenca]);
  };

  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const handleSaveEmpresa = (updatedData: Empresa) => {
    setEmpresa(updatedData);
    console.log("Empresa atualizada:", updatedData);
  };

  const handleDeleteEmpresa = () => {
    console.log("Empresa excluída:", empresa.id);
    window.location.href = "/empresas";
  };

  return (
    <main className="container mt-4">
      <EditEmpresaModal
        isOpen={showEditModal}
        onClose={() => setShowEditModal(false)}
        empresa={empresa}
        onSave={handleSaveEmpresa}
      />

      <DeleteConfirmationModal
        isOpen={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        onConfirm={handleDeleteEmpresa}
      />

      <SelectLicencaModal
        isOpen={showSelectModal}
        onClose={() => setShowSelectModal(false)}
        licencasDisponiveis={licencasDisponiveis}
        licencasVinculadas={licencas}
        onVincular={handleVincularLicenca}
      />

      {/* Conteúdo principal */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1 className="text-dark">Detalhes da Empresa</h1>
        <Link href="/empresas" className="btn btn-outline-secondary">
          Voltar
        </Link>
      </div>

      <div className="row justify-content-center">
        <div className="col-md-8">
          <div className="card">
            <div className="card-header bg-primary text-white">
              <h5 className="mb-0">{empresa.razaoSocial}</h5>
            </div>
            <div className="card-body">
              <div className="row mb-4">
                <div className="col-md-6">
                  <p>
                    <strong>CNPJ:</strong> {empresa.cnpj}
                  </p>
                  <p>
                    <strong>CEP:</strong> {empresa.cep}
                  </p>
                  <p>
                    <strong>Cidade/Estado:</strong> {empresa.cidade}/
                    {empresa.estado}
                  </p>
                </div>
                <div className="col-md-6">
                  <p>
                    <strong>Bairro:</strong> {empresa.bairro}
                  </p>
                  <p>
                    <strong>Complemento:</strong> {empresa.complemento}
                  </p>
                </div>
              </div>

              <div className="d-flex justify-content-end mb-3 gap-2">
                <button
                  onClick={() => setShowEditModal(true)}
                  className="btn btn-primary"
                >
                  Editar Empresa
                </button>
                <button
                  onClick={() => setShowDeleteModal(true)}
                  className="btn btn-danger"
                >
                  Excluir Empresa
                </button>
                <button
                  onClick={() => setShowSelectModal(true)}
                  className="btn btn-success"
                >
                  Vincular Licença Existente
                </button>
              </div>

              <h5 className="mt-4 mb-3">Licenças Ambientais</h5>

              {licencas.length > 0 ? (
                <div className="table-responsive">
                  <table className="table table-striped">
                    <thead>
                      <tr>
                        <th>Número</th>
                        <th>Órgão Ambiental</th>
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
                          <td>{licenca.emissao}</td>
                          <td>{licenca.validade}</td>
                          <td>
                            <button className="btn btn-sm btn-outline-primary me-2">
                              Editar
                            </button>
                            <button className="btn btn-sm btn-outline-danger">
                              Excluir
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <div className="alert alert-info">
                  Nenhuma licença cadastrada para esta empresa.
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
