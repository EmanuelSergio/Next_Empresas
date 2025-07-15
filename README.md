🏢 CRUD de Empresas e Licenças Ambientais

Aplicativo construído com **Next.js 13+ App Router**, **TypeScript**, **MySQL** e **Drizzle ORM**, que permite gerenciar empresas e suas licenças ambientais (CRUD completo).

---

## ✅ Requisitos

- **Node.js** (v16+)
- **MySQL** instalado
- Acesso ao terminal

---

## ⚙️ Instalação

1. **Clone este repositório**

```bash
git clone https://github.com/EmanuelSergio/Next_Empresas.git
cd front
```

2. **Banco de dados**

Abra o MySQL e execute:

```sql
CREATE DATABASE Empresas;
```

3. **Crie o arquivo `.env` na raiz**:

```env
DATABASE_URL=mysql://root:root@localhost:3306/Empresas
```

Ajuste se seu usuário/senha forem diferentes.

4. **Instale dependências**

```bash
npm install
```

5. **Crie as tabelas**

```bash
npx drizzle-kit generate
npx drizzle-kit migrate
```

---

## 🚀 Executando o projeto

```bash
npm run dev
```

Acesse [http://localhost:3000](http://localhost:3000) no navegador.

---

## 🧭 Estrutura do projeto

```
.
├─ app/
│  ├─ api/
│  │  ├─ empresa/...
│  │  └─ licencas/...
│  ├─ empresas/
│  │  └─ [id]/page.tsx        # detalhes da empresa + licenças
│  ├─ licencas/
│  └─ page.tsx                # lista de empresas
├─ app/db/
│  ├─ schema.ts               # definição das tabelas via Drizzle
│  └─ index.ts                # conexão com o banco
├─ app/lib/actions.ts        # funções CRUD com Server Actions
├─ app/services/             # serviços de chamada via fetch
│  ├─ empresaService.ts
│  └─ licencaService.ts
├─ app/components/           # UI: Modais e componentes reutilizáveis
└─ drizzle.config.ts         # config do Drizzle ORM
```
