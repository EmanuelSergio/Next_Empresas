import Link from "next/link";

export default function Home() {
  return (
    <main className="flex min-h-screen items-center justify-center p-4">
      <div className="text-center space-y-4">
        <h1 className="text-3xl text-dark font-bold">Bem-vindo</h1>
        <Link
          href="/empresas"
          className="p-3 bg-black text-white rounded hover:bg-blue-700 transition-colors duration-300 text-decoration-none"
        >
          Ir para lista de Empresas
        </Link>
      </div>
    </main>
  );
}
