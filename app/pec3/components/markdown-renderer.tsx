"use client"

import { useEffect, useState } from "react"
import { Skeleton } from "@/components/ui/skeleton"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { AlertCircle } from "lucide-react"

interface MarkdownRendererProps {
  filePath: string
}

export default function MarkdownRenderer({ filePath }: MarkdownRendererProps) {
  const [content, setContent] = useState<string>("")
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchMarkdown = async () => {
      try {
        setIsLoading(true)
        const response = await fetch(filePath)

        if (!response.ok) {
          throw new Error(`Error ${response.status}: ${response.statusText}`)
        }

        const text = await response.text()
        setContent(text)
        setError(null)
      } catch (err) {
        console.error("Error fetching markdown:", err)
        setError(err instanceof Error ? err.message : "Error desconocido")
      } finally {
        setIsLoading(false)
      }
    }

    fetchMarkdown()
  }, [filePath])

  if (isLoading) {
    return (
      <div className="space-y-4">
        <Skeleton className="w-full h-8" />
        <Skeleton className="w-full h-4" />
        <Skeleton className="w-full h-4" />
        <Skeleton className="w-full h-4" />
        <Skeleton className="w-3/4 h-4" />
      </div>
    )
  }

  if (error) {
    return (
      <Alert variant="destructive">
        <AlertCircle className="w-4 h-4" />
        <AlertTitle>Error</AlertTitle>
        <AlertDescription>No se pudo cargar el documento: {error}</AlertDescription>
      </Alert>
    )
  }

  // Convertir el Markdown a HTML (implementación básica)
  const htmlContent = content
    // Convertir encabezados
    .replace(/^# (.*$)/gm, '<h1 class="text-3xl font-bold mb-4 mt-6">$1</h1>')
    .replace(/^## (.*$)/gm, '<h2 class="text-2xl font-bold mb-3 mt-5">$1</h2>')
    .replace(/^### (.*$)/gm, '<h3 class="text-xl font-bold mb-2 mt-4">$1</h3>')
    // Convertir listas
    .replace(/^\* (.*$)/gm, '<li class="ml-6 list-disc">$1</li>')
    .replace(/^- (.*$)/gm, '<li class="ml-6 list-disc">$1</li>')
    // Convertir negritas e itálicas
    .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")
    .replace(/\*(.*?)\*/g, "<em>$1</em>")
    // Convertir párrafos (líneas que no son encabezados o listas)
    .replace(/^(?!<h|<li|<ul|<ol|<p)(.*$)/gm, '<p class="mb-4">$1</p>')
    // Agrupar elementos de lista
    .replace(
      /<li class="ml-6 list-disc">(.*?)<\/li>(?:\n<li class="ml-6 list-disc">)/g,
      '<li class="ml-6 list-disc">$1</li><li class="ml-6 list-disc">',
    )
    .replace(
      /<li class="ml-6 list-disc">(.*?)<\/li>(?:\n<li class="ml-6 list-disc">)/g,
      '<li class="ml-6 list-disc">$1</li><li class="ml-6 list-disc">',
    )
    .replace(
      /<li class="ml-6 list-disc">(.*?)<\/li>(?:\n<li class="ml-6 list-disc">)/g,
      '<li class="ml-6 list-disc">$1</li><li class="ml-6 list-disc">',
    )
    .replace(/(<li class="ml-6 list-disc">.*?<\/li>)+/g, '<ul class="mb-4">$&</ul>')
    // Eliminar líneas vacías
    .replace(/<p class="mb-4"><\/p>/g, "")

  return (
    <div className="prose prose-slate dark:prose-invert max-w-none" dangerouslySetInnerHTML={{ __html: htmlContent }} />
  )
}
