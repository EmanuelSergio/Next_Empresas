"use server";
import { db } from "@/app/api/db";
import { empresa, licenca } from "@/app/api/db/schema";
import { eq } from "drizzle-orm";

export async function getEmpresas() {
  console.log("Fetching empresas from the database");
  return db.select().from(empresa);
}
export async function createEmpresa(data: any) {
  return db.insert(empresa).values(data);
}
export async function updateEmpresa(id: number, data: any) {
  return db.update(empresa).set(data).where(eq(empresa.id, id));
}
export async function deleteEmpresa(id: number) {
  return db.delete(empresa).where(eq(empresa.id, id));
}

// export async function getLicencasByEmpresa(empId: number) {
//   return db.select().from(licenca).where(licenca.empresaId.eq(empId));
// }
export async function createLicenca(data: any) {
  return db.insert(licenca).values(data);
}
// export async function updateLicenca(id: number, data: any) {
//   return db.update(licenca).set(data).where(licenca.id.eq(id));
// }
// export async function deleteLicenca(id: number) {
//   return db.delete(licenca).where(licenca.id.eq(id));
// }
