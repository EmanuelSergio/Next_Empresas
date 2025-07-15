"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import EditLicencaModal from "./components/EditLicencaModal";
import DeleteLicencaModal from "./components/DeleteLicencaModal";
import { AddLicencaModal } from "./components/NewLicencaModal";
import { licencaService } from "../services/licencaService";
import { empresaService } from "../services/empresaService";
import type { Licenca } from "../types/Licenca";

interface EmpresaOption {
  id: number;
  razaoSocial: string;
}

export default function LicencasPage() {
  const [licencas, setLicencas] = useState<Licenca[]>([]);
  const [empresasOptions, setEmpresasOptions] = useState<EmpresaOption[]>([]);
  const [loading, setLoading] = useState({
    licencas: true,
    empresas: true,
  });
  const [error, setError] = useState("");

  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showNewModal, setShowNewModal] = useState(false);
  const [currentLicenca, setCurrentLicenca] = useState<Licenca | null>(null);

  const loadData = async () => {
    try {
      // Carrega licenças
      const licencasData = await licencaService.getAll();
      setLicencas(licencasData);

      // Carrega empresas para as opções
      const empresasData = await empresaService.getAll();
      setEmpresasOptions(
        empresasData.map((e: Empresa) => ({
          id: e.id,
          razaoSocial: e.razao_social,
        }))
      );
    } catch (err) {
      setError("Falha ao carregar dados");
      console.error(err);
    } finally {
      setLoading({ licencas: false, empresas: false });
    }
  };

  const handleCreateLicenca = async (novaLicenca: Omit<Licenca, "id">) => {
    try {
      await licencaService.create(novaLicenca);
      await loadData(); // Atualiza a lista após adicionar
      setShowNewModal(false); // Fecha o modal
    } catch (err) {
      setError("Erro ao criar nova licença");
      console.error(err);
    }
  };

  // Carrega dados iniciais
  useEffect(() => {
    loadData();
  }, []);

  const handleEditClick = (licenca: Licenca) => {
    // Formata as datas para o formato que o input date espera (YYYY-MM-DD)
    const formatDate = (dateString: string) => {
      if (!dateString) return "";

      // Se já está no formato YYYY-MM-DD, retorna sem mudanças
      if (/^\d{4}-\d{2}-\d{2}$/.test(dateString)) {
        return dateString;
      }

      // Se for uma data ISO (com 'T'), extrai a parte da data
      if (dateString.includes("T")) {
        return dateString.split("T")[0];
      }

      // Se for um objeto Date ou string de data local, converte
      const date = new Date(dateString);
      if (isNaN(date.getTime())) {
        return ""; // Retorna vazio se a data for inválida
      }

      // Formata para YYYY-MM-DD
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, "0");
      const day = String(date.getDate()).padStart(2, "0");

      return `${year}-${month}-${day}`;
    };

    const formattedLicenca = {
      ...licenca,
      emissao: formatDate(licenca.emissao),
      validade: formatDate(licenca.validade),
    };

    setCurrentLicenca(formattedLicenca);
    setShowEditModal(true);
  };

  const handleDeleteClick = (licenca: Licenca) => {
    setCurrentLicenca(licenca);
    setShowDeleteModal(true);
  };

  const handleSaveLicenca = async (updatedData: Licenca) => {
    try {
      // Converte as datas de volta para o formato ISO antes de enviar
      const dataToSave = {
        ...updatedData,
        emissao: new Date(updatedData.emissao).toISOString(),
        validade: new Date(updatedData.validade).toISOString(),
      };

      await licencaService.update(updatedData.id, {
        numero: dataToSave.numero,
        orgao: dataToSave.orgao,
        emissao: dataToSave.emissao,
        validade: dataToSave.validade,
        empresaId: dataToSave.empresaId,
      });

      // Atualiza a lista com os dados formatados corretamente
      setLicencas((prev) =>
        prev.map((lic) =>
          lic.id === updatedData.id
            ? {
                ...updatedData,
                emissao: dataToSave.emissao,
                validade: dataToSave.validade,
              }
            : lic
        )
      );
      setShowEditModal(false);
    } catch (err) {
      setError("Falha ao atualizar licença");
      console.error(err);
    }
  };

  const handleDeleteLicenca = async () => {
    if (!currentLicenca) return;

    try {
      await licencaService.delete(currentLicenca.id);
      setLicencas((prev) => prev.filter((lic) => lic.id !== currentLicenca.id));
      setShowDeleteModal(false);
    } catch (err) {
      setError("Falha ao excluir licença");
    }
  };

  if (loading.licencas || loading.empresas) {
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

  if (error) {
    return (
      <main className="container mt-4">
        <div className="alert alert-danger">{error}</div>
      </main>
    );
  }

  return (
    <main className="container mt-4">
      {/* Modal de Nova Licença */}
      <AddLicencaModal
        isOpen={showNewModal}
        onClose={() => setShowNewModal(false)}
        empresas={empresasOptions}
        onCreate={handleCreateLicenca}
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
                      <td>{licenca.orgao}</td>
                      <td>
                        <Link href={`/empresas/${licenca.empresaId}`}>
                          {empresasOptions.find(
                            (e) => e.id === licenca.empresaId
                          )?.razaoSocial || "Empresa não encontrada"}
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
