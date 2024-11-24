"use client"

import * as React from "react"
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts"

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"
import { useAppDispatch, useAppSelector } from "@/store/hooks"
import { fetchMonthlyExpenses } from "@/store/context/expenseSlice"
import moment from "moment"

const chartConfig = {

  paid: {
    label: "Paid",
    color: "hsl(var(--chart-1))",
  },
  received: {
    label: "Received",
    color: "hsl(var(--chart-2))",
  },
} satisfies ChartConfig

export function Chart() {

  const dispatch = useAppDispatch()

  // Fetch Monthly Expenses
  React.useEffect(() => {
    dispatch(fetchMonthlyExpenses())
  }, [dispatch])

  const chartData = useAppSelector((state) => state.expense.monlthyExpenses)




  const total = React.useMemo(
    () => ({
      paid: chartData.reduce((acc, curr) => acc + (curr.total_paid ?? 0), 0),
      received: chartData.reduce((acc, curr) => acc + (curr.total_received ?? 0), 0),
    }),
    [ chartData ]
  )

  return (
    <Card>
      <CardHeader className="flex flex-col items-stretch space-y-0 border-b p-0 sm:flex-row">
        <div className="flex flex-1 flex-col justify-center gap-1 px-6 py-5 sm:py-6">
          <CardTitle> {moment().format("MMM Y")}</CardTitle>
          <CardDescription>
            Here are the monthly expenses
          </CardDescription>
        </div>
        <div className="flex">
          {["paid", "received"].map((key) => {
            const chart = key as keyof typeof chartConfig
            return (
              <button
                key={chart}
                data-active={''}
                className="relative z-30 flex flex-1 flex-col justify-center gap-1 border-t px-6 py-4 text-left even:border-l data-[active=true]:bg-muted/50 sm:border-l sm:border-t-0 sm:px-8 sm:py-6"
              >
                <span className="text-xs text-muted-foreground">
                  {chartConfig[chart].label}
                </span>
                <span className="text-lg font-bold leading-none sm:text-3xl">
                 ₹ {total[key as keyof typeof total].toLocaleString()}
                </span>
              </button>
            )
          })}
        </div>
      </CardHeader>
      <CardContent className="px-2 sm:p-6">
        <ChartContainer
          config={chartConfig}
          className="aspect-auto h-[180px] w-full"
        >
          <BarChart
            accessibilityLayer
            data={chartData}
            margin={{
              left: 12,
              right: 12,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="day"
              type='category'
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              minTickGap={32}
              tickFormatter={(value) => {
                console.log(value)
                const date = moment(value).format("MMM DD")
                return date
              }}
            />
            <ChartTooltip
              content={
                <ChartTooltipContent
                  className="w-[150px]"
                  nameKey="views"
                  labelFormatter={(value) => {
                    return moment(value).format("MMM DD")
                  }}
                />
              }
            />
            <Bar dataKey={"total_paid"} label="Paid" fill={`hsl(var(--chart-1))`} />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
