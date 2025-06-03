"use client"

import { useState, useEffect, type ReactNode } from "react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { AlertCircle } from "lucide-react"

interface DataLoaderProps {
  url: string
  children: (data: any, isLoading: boolean, isError: boolean) => ReactNode
}

export default function DataLoader({ url, children }: DataLoaderProps) {
  const [data, setData] = useState<any>(null)
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [isError, setIsError] = useState<boolean>(false)
  const [errorMessage, setErrorMessage] = useState<string>("")

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true)
        const response = await fetch(url)

        if (!response.ok) {
          throw new Error(`Error ${response.status}: ${response.statusText}`)
        }

        const result = await response.json()
        setData(result)
        setIsError(false)
      } catch (error) {
        console.error("Error fetching data:", error)
        setIsError(true)
        setErrorMessage(error instanceof Error ? error.message : "Error desconocido")
      } finally {
        setIsLoading(false)
      }
    }

    fetchData()
  }, [url])

  if (isError) {
    return (
      <Alert variant="destructive">
        <AlertCircle className="w-4 h-4" />
        <AlertTitle>Error</AlertTitle>
        <AlertDescription>{errorMessage || "Ha ocurrido un error al cargar los datos."}</AlertDescription>
      </Alert>
    )
  }

  return children(data, isLoading, isError)
}
