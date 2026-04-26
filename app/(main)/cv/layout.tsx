import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Cristopher Quiñones | Currículum Vitae",
  description: "Arquitecto Digital & Desarrollador Full-stack - Experiencias Digitales de Lujo",
};

export default function CVLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
