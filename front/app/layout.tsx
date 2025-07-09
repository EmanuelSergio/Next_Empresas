// layout.tsx
import "bootstrap/dist/css/bootstrap.min.css";
import "./globals.css";
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Gestor Ambiental",
  description: "Sistema de Empresas e Licenças Ambientais",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR">
      <body>
        <div className="container-fluid">
          <div className="row min-vh-100">
            {/* Sidebar */}
            <nav className="col-12 col-md-2 bg-dark text-white p-3">
              <h4 className="mb-4">Menu</h4>
              <ul className="nav flex-column">
                <li className="nav-item">
                  <Link href="/" className="nav-link text-white">
                    Home
                  </Link>
                </li>
                <li className="nav-item">
                  <Link href="/empresas" className="nav-link text-white">
                    Empresas
                  </Link>
                </li>
              </ul>
            </nav>

            {/* Conteúdo principal */}
            <div className="col-12 col-md-10 p-4 bg-light d-flex flex-column">
              {/* Header */}
              <header className="mb-4 border-bottom pb-2">
                <h1 className="h4">Sistema de Licenças Ambientais</h1>
              </header>

              {/* Conteúdo */}
              <main className="flex-grow-1">{children}</main>

              {/* Footer */}
              <footer className="pt-4 mt-4 border-top text-center text-muted small">
                © {new Date().getFullYear()} - Desenvolvido para processo
                seletivo
              </footer>
            </div>
          </div>
        </div>
      </body>
    </html>
  );
}
