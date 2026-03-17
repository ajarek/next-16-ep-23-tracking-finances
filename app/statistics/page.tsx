"use client"

import { useTransactionRegister } from "@/store/transactionRegister"
import {
  Bar,
  BarChart,
  CartesianGrid,
  XAxis,
  Label,
  Pie,
  PieChart,
} from "recharts"

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart"
import React from "react"



const StatisticsPage = () => {

  const chartConfig = {
    income: {
      label: "Dochody",
      color: "var(--chart-1)",
    },
    expenses: {
      label: "Wydatki",
      color: "var(--chart-2)",
    },
  } satisfies ChartConfig

const chartConfigPie = {
  Transport: {
    label: "Transport",
    color: "var(--chart-1)",
  },
  Rozrywka: {
    label: "Rozrywka",
    color: "var(--chart-2)",
  },
  Zdrowie: {
    label: "Zdrowie",
    color: "var(--chart-3)",
  },
  Opłaty: {
    label: "Opłaty",
    color: "var(--chart-4)",
  },
  Zakupy: {
    label: "Zakupy",
    color: "var(--chart-5)",
  },
  Restauracja: {
    label: "Restauracja",
    color: "var(--chart-6)",
  },
  Edukacja: {
    label: "Edukacja",
    color: "var(--chart-7)",
  },
  Inne: {
    label: "Inne",
    color: "var(--chart-8)",
  },
} satisfies ChartConfig  

  const { items } = useTransactionRegister()

  const { income, expenses } = React.useMemo(() => {
    return items
      .filter(
        (item) => new Date(item.date).getMonth() === new Date().getMonth(),
      )
      .reduce(
        (acc, curr) => {
          if (curr.type === "income") {
            acc.income += curr.amount
          } else {
            acc.expenses += curr.amount
          }
          return acc
        },
        { income: 0, expenses: 0 },
      )
  }, [items])

  const chartData = [
    {
      month:
        new Intl.DateTimeFormat("pl-PL", { month: "long" }).format(new Date()) +
        " " +
        new Date().getFullYear(),
      income,
      expenses,
    },
  ]
  const chartDataPie = Object.entries(
    items.reduce(
      (acc, curr) => {
        if (curr.type === "expense") {
          acc[curr.category] = (acc[curr.category] || 0) + curr.amount
        }
        return acc
      },
      {} as Record<string, number>,
    ),
  ).map(([category, amount]) => ({
    category,
    amount,
    fill: `var(--color-${category})`,
  }))
  return (
    <div className='min-h-[calc(100vh-4rem)] flex flex-col items-center justify-start gap-4 px-4 md:px-8 pt-4 pb-20'>
      <div className='w-full flex items-center justify-center'>
        <h2 className='text-2xl font-bold'>Statystyki za okres {chartData[0].month}</h2>
      </div>

      <div className='w-full grid grid-cols-1 md:grid-cols-2 gap-4'>
        <Card>
          <CardHeader>
            <CardTitle>Statystyki przychodów i wydatków</CardTitle>
            <CardDescription></CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer config={chartConfig}>
              <BarChart accessibilityLayer data={chartData}>
                <CartesianGrid vertical={false} />
                <XAxis
                  dataKey='month'
                  tickLine={false}
                  tickMargin={10}
                  axisLine={false}
                />
                <ChartTooltip
                  cursor={false}
                  content={<ChartTooltipContent indicator='dashed' />}
                />
                <Bar dataKey='income' fill='var(--color-income)' radius={4} />
                <Bar
                  dataKey='expenses'
                  fill='var(--color-expenses)'
                  radius={4}
                />
              </BarChart>
            </ChartContainer>
          </CardContent>
        </Card>

        <Card className='flex flex-col'>
          <CardHeader className='items-center pb-0'>
            <CardTitle>Statystyki wydatków</CardTitle>
            <CardDescription></CardDescription>
          </CardHeader>
          <CardContent className='flex-1 pb-0'>
            <ChartContainer
              config={chartConfigPie}
              className='mx-auto aspect-square max-h-[250px]'
            >
              <PieChart>
                <ChartTooltip
                  cursor={false}
                  content={<ChartTooltipContent hideLabel />}
                />
                <Pie
                  data={chartDataPie}
                  dataKey='amount'
                  nameKey='category'
                  innerRadius={60}
                  strokeWidth={5}
                >
                  <Label
                    content={({ viewBox }) => {
                      if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                        return (
                          <text
                            x={viewBox.cx}
                            y={viewBox.cy}
                            textAnchor='middle'
                            dominantBaseline='middle'
                          >
                            <tspan
                              x={viewBox.cx}
                              y={viewBox.cy}
                              className='fill-foreground text-3xl font-bold'
                            >
                              {expenses.toFixed(2)}
                            </tspan>
                            <tspan
                              x={viewBox.cx}
                              y={(viewBox.cy || 0) + 24}
                              className='fill-muted-foreground'
                            >
                              Wydatki
                            </tspan>
                          </text>
                        )
                      }
                    }}
                  />
                </Pie>
              </PieChart>
            </ChartContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default StatisticsPage
