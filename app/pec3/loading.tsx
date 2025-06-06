import { Spinner } from "@/components/ui/spinner"

export default function Loading() {
  return (
    <div className="flex items-center justify-center h-full min-h-screen">
      <Spinner size="lg" />
    </div>
  )
}
