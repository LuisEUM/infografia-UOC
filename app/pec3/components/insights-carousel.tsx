"use client";

import { useMemo } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import {
  AlertCircle,
  TrendingUp,
  TrendingDown,
  Minus,
  BarChart3,
  PieChart,
} from "lucide-react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

interface InsightsCarouselProps {
  data: any[];
  isLoading: boolean;
  isError: boolean;
}

export default function InsightsCarousel({
  data,
  isLoading,
  isError,
}: InsightsCarouselProps) {
  // Generar insights basados en los datos
  const insights = useMemo(() => {
    if (!data || data.length === 0) return [];

    // Calcular el crecimiento para cada tipo de vaso
    const growthData = data.map((item) => {
      const growth = item["2022"] - item["2015"];
      const percentGrowth =
        ((item["2022"] - item["2015"]) / item["2015"]) * 100;

      return {
        tipo: item.tipo,
        growth,
        percentGrowth: Math.round(percentGrowth * 10) / 10,
        valor2015: item["2015"],
        valor2022: item["2022"],
      };
    });

    // Ordenar por crecimiento absoluto
    const sortedByGrowth = [...growthData].sort((a, b) => b.growth - a.growth);

    // Encontrar el tipo con mayor crecimiento
    const maxGrowth = sortedByGrowth[0];

    // Encontrar tipos con crecimiento plano (menos del 10%)
    const flatGrowth = growthData.filter(
      (item) => Math.abs(item.percentGrowth) < 10
    );

    // Encontrar tipos con comportamiento irregular (picos y valles)
    const irregularTypes = data.filter((item) => {
      const years = [
        "2015",
        "2016",
        "2017",
        "2018",
        "2019",
        "2020",
        "2021",
        "2022",
      ];
      let hasValley = false;

      for (let i = 1; i < years.length - 1; i++) {
        if (
          item[years[i]] < item[years[i - 1]] &&
          item[years[i]] < item[years[i + 1]]
        ) {
          hasValley = true;
          break;
        }
      }

      return hasValley;
    });

    // Calcular la composición total por año
    const totalByYear: { [key: string]: number } = {};
    const years = ["2015", "2022"];

    years.forEach((year) => {
      totalByYear[year] = data.reduce((sum, item) => sum + item[year], 0);
    });

    // Calcular el porcentaje de cada tipo en 2015 y 2022
    const compositionChange = data
      .map((item) => {
        const percent2015 = (item["2015"] / totalByYear["2015"]) * 100;
        const percent2022 = (item["2022"] / totalByYear["2022"]) * 100;

        return {
          tipo: item.tipo,
          percent2015: Math.round(percent2015 * 10) / 10,
          percent2022: Math.round(percent2022 * 10) / 10,
          percentChange: Math.round((percent2022 - percent2015) * 10) / 10,
        };
      })
      .sort((a, b) => Math.abs(b.percentChange) - Math.abs(a.percentChange));

    // Verificar si hay caídas en 2020 (año de pandemia)
    const pandemic2020 =
      data.filter((item) => item["2020"] < item["2019"]).length === 0
        ? "Ningún tipo de vaso disminuyó en 2020 a pesar de la pandemia"
        : `${
            data.filter((item) => item["2020"] < item["2019"]).length
          } tipos de vasos disminuyeron en 2020 durante la pandemia`;

    return [
      {
        title: "Mayor crecimiento absoluto",
        text: `${maxGrowth.tipo} con +${maxGrowth.growth} unidades (${maxGrowth.percentGrowth}%)`,
        icon: <TrendingUp className='w-10 h-10 text-green-500' />,
      },
      {
        title: "Tendencias planas",
        text:
          flatGrowth.length > 0
            ? `${flatGrowth
                .map((i) => i.tipo)
                .join(", ")} con variación menor al 10%`
            : "Todos los tipos muestran cambios significativos",
        icon: <Minus className='w-10 h-10 text-gray-500' />,
      },
      {
        title: "Picos y valles",
        text:
          irregularTypes.length > 0
            ? `${irregularTypes
                .map((i) => i.tipo)
                .join(", ")} muestran comportamiento irregular`
            : "Todos los tipos muestran tendencias consistentes",
        icon: <TrendingDown className='w-10 h-10 text-orange-500' />,
      },
      {
        title: "Cambio en composición",
        text: `${compositionChange[0].tipo} pasó de ${compositionChange[0].percent2015}% a ${compositionChange[0].percent2022}% del total`,
        icon: <PieChart className='w-10 h-10 text-blue-500' />,
      },
      {
        title: "Impacto pandemia 2020",
        text: pandemic2020,
        icon: <BarChart3 className='w-10 h-10 text-purple-500' />,
      },
    ];
  }, [data]);

  if (isLoading) {
    return <Skeleton className='w-full h-[200px]' />;
  }

  if (isError || !data) {
    return (
      <Alert variant='destructive'>
        <AlertCircle className='w-4 h-4' />
        <AlertTitle>Error</AlertTitle>
        <AlertDescription>
          No se pudieron cargar los datos para la visualización.
        </AlertDescription>
      </Alert>
    );
  }

  return (
    <div className='w-full py-6'>
      <Carousel className='w-full'>
        <CarouselContent>
          {insights.map((insight, index) => (
            <CarouselItem key={index}>
              <Card>
                <CardContent className='flex flex-col items-center justify-center p-6 text-center'>
                  <div className='mb-4'>{insight.icon}</div>
                  <h3 className='mb-2 text-xl font-bold'>{insight.title}</h3>
                  <p className='text-muted-foreground'>{insight.text}</p>
                </CardContent>
              </Card>
            </CarouselItem>
          ))}
        </CarouselContent>
        <div className='flex items-center justify-center mt-4'>
          <CarouselPrevious className='relative mr-2' />
          <CarouselNext className='relative ml-2' />
        </div>
      </Carousel>
    </div>
  );
}
