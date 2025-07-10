import Link from "next/link";

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

interface Licenca {
  id: number;
  numero: string;
  orgaoAmbiental: string;
  emissao: string;
  validade: string;
}

export default function EmpresaDetalhesPage() {
  // Dados de exemplo - substitua pelos dados reais do seu banco de dados
  const empresa: Empresa = {
    id: 1,
    razaoSocial: "Empresa Exemplo Ltda",
    cnpj: "00.000.000/0001-00",
    cep: "00000-000",
    cidade: "São Paulo",
    estado: "SP",
    bairro: "Centro",
    complemento: "Sala 1001",
  };

  const licencas: Licenca[] = [
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
  ];

  return (
    <main className="container mt-4">
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

              <div className="d-flex justify-content-end mb-3">
                <Link
                  href={`/empresas/${empresa.id}/editar`}
                  className="btn btn-primary me-2"
                >
                  Editar Empresa
                </Link>
                <Link
                  href={`/empresas/${empresa.id}/licencas/nova`}
                  className="btn btn-success"
                >
                  Adicionar Licença
                </Link>
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
