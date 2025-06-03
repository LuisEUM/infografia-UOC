import type React from "react";
import type { Metadata } from "next/types";
import DocNavigation from "@/app/pec3/components/doc-navigation";

export const metadata: Metadata = {
  title: "PEC3 Infografía y Visualización",
  description: "Selección y rediseño de una mala práctica de visualización",
  generator: "v0.dev",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <DocNavigation />
      <main className='container py-6 mx-auto'>{children}</main>
    </>
  );
}
