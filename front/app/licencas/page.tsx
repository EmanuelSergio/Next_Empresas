import Link from "next/link";

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

export default function LicencasPage() {
  const licencas: Licenca[] = [
    {
      id: 1,
      numero: "LIC-2023-001",
      orgaoAmbiental: "CETESB",
      emissao: "10/01/2023",
      validade: "10/01/2026",
      empresa: {
        id: 1,
        razaoSocial: "Empresa Exemplo Ltda",
      },
    },
    {
      id: 2,
      numero: "LIC-2023-002",
      orgaoAmbiental: "IBAMA",
      emissao: "15/03/2023",
      validade: "15/03/2025",
      empresa: {
        id: 2,
        razaoSocial: "Outra Empresa SA",
      },
    },
  ];

  return (
    <main className="container mt-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1 className="text-dark">Licenças Ambientais</h1>
        <Link href="/licencas/nova" className="btn btn-success">
          Nova Licença
        </Link>
      </div>

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
                      <td>{licenca.emissao}</td>
                      <td>{licenca.validade}</td>
                      <td>
                        <div className="d-flex gap-2">
                          <Link
                            href={`/licencas/${licenca.id}/editar`}
                            className="btn btn-sm btn-outline-primary"
                          >
                            Editar
                          </Link>
                          <button className="btn btn-sm btn-outline-danger">
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
