"use client"

import { Button } from "@/components/ui/button"
import { useEffect } from "react"

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <div className="flex flex-col items-center justify-center min-h-screen gap-4 p-4">
      <h2 className="text-2xl font-bold">Ha ocurrido un error</h2>
      <p className="text-muted-foreground">{error.message}</p>
      <Button onClick={() => reset()}>Intentar de nuevo</Button>
    </div>
  )
}
