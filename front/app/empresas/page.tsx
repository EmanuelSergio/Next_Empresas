import Link from "next/link";

function EmpresaCard({ empresa }: { empresa: Empresa }) {
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
            <button className="btn btn-outline-secondary me-2">Editar</button>
            <button className="btn btn-outline-danger">Excluir</button>
          </div>
        </div>
      </div>
    </div>
  );
}
export default function EmpresasPage() {
  const empresas: Empresa[] = [
    {
      id: "1",
      razaoSocial: "Empresa Exemplo 1",
      cnpj: "00.000.000/0001-00",
      cidade: "São Paulo",
      estado: "SP",
    },
    {
      id: "2",
      razaoSocial: "Empresa Exemplo 2",
      cnpj: "00.000.000/0001-01",
      cidade: "Rio de Janeiro",
      estado: "RJ",
    },
  ];

  return (
    <main>
      <h1 className="text-dark">Empresas</h1>
      <div className="card-container">
        {empresas.length === 0 ? (
          <p className="text-dark">Nenhuma empresa cadastrada.</p>
        ) : (
          empresas.map((empresa) => (
            <EmpresaCard key={empresa.id} empresa={empresa} />
          ))
        )}
      </div>
    </main>
  );
}
