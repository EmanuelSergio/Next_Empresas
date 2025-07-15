"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { EditEmpresaModal } from "../components/EditEmpresaModal";
import { AddLicencaModal } from "@/app/licencas/components/NewLicencaModal";
import { empresaService } from "@/app/services/empresaService";
import { licencaService } from "@/app/services/licencaService";
import { Licenca } from "@/app/types/Licenca";
import DeleteLicencaModal from "@/app/licencas/components/DeleteLicencaModal";
import { DeleteConfirmationModal } from "../components/DeleteEmpresaModal";
import EditLicencaModal from "@/app/licencas/components/EditLicencaModal";

export default function EmpresaDetalhesPage() {
  const params = useParams<{ id: string }>();
  const id = params.id;
  const [empresa, setEmpresa] = useState<Empresa | null>(null);
  const [licencas, setLicencas] = useState<Licenca[]>([]);
  const [loading, setLoading] = useState({
    empresa: true,
    licencas: true,
  });
  const [licencaToDelete, setLicencaToDelete] = useState<Licenca | null>(null);
  const [licencaToEdit, setLicencaToEdit] = useState<Licenca | null>(null);
  const [error, setError] = useState("");
  const router = useRouter();

  // Estados dos modais separados
  const [showEditEmpresaModal, setShowEditEmpresaModal] = useState(false);
  const [showEditLicencaModal, setShowEditLicencaModal] = useState(false);
  const [showDeleteEmpresaModal, setShowDeleteEmpresaModal] = useState(false);
  const [showDeleteLicencaModal, setShowDeleteLicencaModal] = useState(false);
  const [showAddLicencaModal, setShowAddLicencaModal] = useState(false);

  const loadEmpresa = async () => {
    try {
      const data = await empresaService.getById(Number(id));
      if (!data) throw new Error("Empresa não encontrada");
      setEmpresa(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : String(err));
    } finally {
      setLoading((prev) => ({ ...prev, empresa: false }));
    }
  };

  const loadLicencas = async () => {
    try {
      const data = await licencaService.getByEmpresaId(Number(id));
      setLicencas(data);
    } catch (err) {
      console.error("Erro ao carregar licenças:", err);
    } finally {
      setLoading((prev) => ({ ...prev, licencas: false }));
    }
  };

  useEffect(() => {
    loadEmpresa();
    loadLicencas();
  }, [id]);

  const handleCreateLicenca = async (novaLicenca: Omit<Licenca, "id">) => {
    try {
      await licencaService.create(novaLicenca);
      await loadLicencas();
      setShowAddLicencaModal(false);
    } catch (err) {
      setError("Erro ao criar nova licença");
      console.error(err);
    }
  };

  const handleDeleteLicenca = async () => {
    if (!licencaToDelete) return;

    try {
      await licencaService.delete(licencaToDelete.id);
      setLicencas((prev) =>
        prev.filter((lic) => lic.id !== licencaToDelete.id)
      );
      setShowDeleteLicencaModal(false);
      setLicencaToDelete(null);
    } catch (err) {
      setError("Falha ao excluir licença");
      console.error(err);
    }
  };

  const handleEditLicencaClick = (licenca: Licenca) => {
    // Formatar as datas para o formato YYYY-MM-DD que o input date espera
    const formattedLicenca = {
      ...licenca,
      emissao: licenca.emissao.split("T")[0], // Remove a parte do tempo se existir
      validade: licenca.validade.split("T")[0],
    };
    setLicencaToEdit(formattedLicenca);
    setShowEditLicencaModal(true);
  };

  const handleSaveLicenca = async (updatedData: Licenca) => {
    try {
      await licencaService.update(updatedData.id, {
        numero: updatedData.numero,
        orgao: updatedData.orgao,
        emissao: updatedData.emissao,
        validade: updatedData.validade,
        empresaId: updatedData.empresaId,
      });

      setLicencas((prev) =>
        prev.map((lic) => (lic.id === updatedData.id ? updatedData : lic))
      );
      setShowEditLicencaModal(false);
    } catch (err) {
      setError("Falha ao atualizar licença");
      console.error(err);
    }
  };

  if (loading.empresa) {
    return (
      <main className="container mt-4">
        <div className="d-flex justify-content-center">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Carregando...</span>
          </div>
        </div>
      </main>
    );
  }

  if (error || !empresa) {
    return (
      <main className="container mt-4">
        <div className="alert alert-danger">
          {error || "Empresa não encontrada"}
        </div>
        <Link href="/empresas" className="btn btn-outline-secondary">
          Voltar para lista
        </Link>
      </main>
    );
  }

  return (
    <main className="container mt-4">
      {/* Modais */}
      {licencaToEdit && (
        <EditLicencaModal
          isOpen={showEditLicencaModal}
          onClose={() => setShowEditLicencaModal(false)}
          licenca={licencaToEdit}
          empresas={[
            {
              id: empresa.id,
              razaoSocial: empresa.razao_social,
            },
          ]}
          onSave={handleSaveLicenca}
        />
      )}

      <DeleteLicencaModal
        isOpen={showDeleteLicencaModal}
        onClose={() => {
          setShowDeleteLicencaModal(false);
          setLicencaToDelete(null);
        }}
        onConfirm={handleDeleteLicenca}
        licencaNumero={licencaToDelete?.numero || ""}
      />

      <DeleteConfirmationModal
        isOpen={showDeleteEmpresaModal}
        onClose={() => setShowDeleteEmpresaModal(false)}
        onConfirm={() => router.push("/empresas")}
        empresaId={empresa.id}
      />

      <AddLicencaModal
        isOpen={showAddLicencaModal}
        onClose={() => setShowAddLicencaModal(false)}
        empresas={[
          {
            id: empresa.id,
            razaoSocial: empresa.razao_social,
          },
        ]}
        onCreate={handleCreateLicenca}
      />

      {/* Cabeçalho */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1 className="text-dark">Detalhes da Empresa</h1>
        <Link href="/empresas" className="btn btn-outline-secondary">
          Voltar
        </Link>
      </div>

      {/* Dados da empresa */}
      <div className="row justify-content-center">
        <div className="col-md-8">
          <div className="card">
            <div className="card-header bg-primary text-white">
              <h5 className="mb-0">{empresa.razao_social}</h5>
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

              {/* Botões de ação */}
              <div className="d-flex justify-content-end mb-3 gap-2">
                <button
                  onClick={() => setShowEditEmpresaModal(true)}
                  className="btn btn-primary"
                >
                  Editar Empresa
                </button>
                <button
                  onClick={() => setShowDeleteEmpresaModal(true)}
                  className="btn btn-danger"
                >
                  Excluir Empresa
                </button>
                <button
                  onClick={() => setShowAddLicencaModal(true)}
                  className="btn btn-success"
                >
                  Adicionar Licença
                </button>
              </div>

              {/* Seção de licenças */}
              <h5 className="mt-4 mb-3">Licenças Ambientais</h5>

              {loading.licencas ? (
                <div className="d-flex justify-content-center">
                  <div className="spinner-border text-primary" role="status">
                    <span className="visually-hidden">Carregando...</span>
                  </div>
                </div>
              ) : licencas.length > 0 ? (
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
                          <td>{licenca.orgao}</td>
                          <td>
                            {new Date(licenca.emissao).toLocaleDateString()}
                          </td>
                          <td>
                            {new Date(licenca.validade).toLocaleDateString()}
                          </td>
                          <td>
                            <button
                              className="btn btn-sm btn-outline-primary me-2"
                              onClick={() => handleEditLicencaClick(licenca)}
                            >
                              Editar
                            </button>
                            <button
                              className="btn btn-sm btn-outline-danger"
                              onClick={() => {
                                setLicencaToDelete(licenca);
                                setShowDeleteLicencaModal(true);
                              }}
                            >
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
