import Link from "next/link";

export default function Home() {
  return (
    <main className="flex min-h-screen items-center justify-center p-4">
      <div className="text-center space-y-4">
        <h1 className="text-3xl font-bold">Sistema de Licenças Ambientais</h1>
        <Link
          href="/empresas"
          className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Ir para lista de Empresas
        </Link>
      </div>
    </main>
  );
}
