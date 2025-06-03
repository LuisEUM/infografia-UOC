"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { BarChart, PencilRuler, Palette, Plus, ArrowLeft } from "lucide-react";

export default function DocNavigation() {
  const pathname = usePathname();

  const docs = [
    {
      path: "/pec3/docs/analisis",
      title: "Análisis",
      icon: <BarChart className='w-4 h-4 mr-2' />,
    },
    {
      path: "/pec3/docs/bocetos",
      title: "Bocetos",
      icon: <PencilRuler className='w-4 h-4 mr-2' />,
    },
    {
      path: "/pec3/docs/theme",
      title: "Tema",
      icon: <Palette className='w-4 h-4 mr-2' />,
    },
    {
      path: "/pec3/docs/final",
      title: "Final",
      icon: <BarChart className='w-4 h-4 mr-2' />,
    },
    { path: "/pec3", title: "Extras", icon: <Plus className='w-4 h-4 mr-2' /> },
  ];

  return (
    <div className='sticky top-0 z-50 bg-background border-b'>
      <div className='container mx-auto py-2'>
        <div className='flex flex-col md:flex-row md:items-center justify-between gap-2'>
          <div>
            <h1 className='text-xl font-bold'>
              PEC3 Infografía y Visualización
            </h1>
            <p className='text-sm text-muted-foreground'>
              Selección y rediseño de una mala práctica
            </p>
          </div>
          <div className='flex flex-wrap gap-2'>
            <Link href='/'>
              <Button
                variant='secondary'
                size='sm'
                className='flex items-center border-primary/20 hover:bg-primary/10'
              >
                <ArrowLeft className='w-4 h-4 mr-2' />
                Volver a Portfolio
              </Button>
            </Link>
            <div className='hidden md:block w-px h-6 bg-border self-center'></div>
            {docs.map((doc) => (
              <Link key={doc.path} href={doc.path}>
                <Button
                  variant={pathname === doc.path ? "default" : "outline"}
                  size='sm'
                  className='flex items-center'
                >
                  {doc.icon}
                  {doc.title}
                </Button>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
