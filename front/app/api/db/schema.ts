import { mysqlTable, varchar, serial, int, date } from "drizzle-orm/mysql-core";

export const empresa = mysqlTable("empresa", {
  id: serial("id").primaryKey(),
  razao_social: varchar("razao_social", { length: 255 }).notNull(),
  cnpj: varchar("cnpj", { length: 20 }).notNull(),
  cep: varchar("cep", { length: 10 }).notNull(),
  cidade: varchar("cidade", { length: 100 }).notNull(),
  estado: varchar("estado", { length: 50 }).notNull(),
  bairro: varchar("bairro", { length: 100 }).notNull(),
  complemento: varchar("complemento", { length: 255 }).notNull(),
});

export const licenca = mysqlTable("licenca", {
  id: serial("id").primaryKey(),
  empresaId: int("empresa_id")
    .notNull()
    .references(() => empresa.id),
  numero: varchar("numero", { length: 100 }).notNull(),
  orgao: varchar("orgao", { length: 100 }).notNull(),
  emissao: date("emissao").notNull(),
  validade: date("validade").notNull(),
});
