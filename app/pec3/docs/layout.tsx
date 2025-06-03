import type React from "react"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Documentación - PEC3 Infografía y Visualización",
  description: "Documentación del proyecto de infografía y visualización",
}

export default function DocsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <div className="min-h-screen">{children}</div>
}
