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
import { ChevronLeft, ChevronRightIcon, MoveDownLeft, MoveUpRight } from "lucide-react"
import { utilityActions } from "@/store/context/utilitySlice"

const chartConfig = {

  paid: {
    label: "Paid",
    color: "hsl(var(--chart-1))",
    icon : ()=> <MoveUpRight className="text-red-600 h-4 w-4" />
  },
  received: {
    label: "Received",
    color: "hsl(var(--chart-2))",
    icon : ()=> <MoveDownLeft className="text-green-600 h-4 w-4"/>
  },
} satisfies ChartConfig

/**
 * Bar Chart for Monthly Expenses
 */
export function BarChartMonthlyExpense() {

  const dispatch = useAppDispatch()

  const monthYear = useAppSelector((state) => state.utility.filter.monthYear)

  function handleNextMonth() {
    if(moment() < moment(monthYear)) return
    dispatch(utilityActions.setMonthYearFilter(moment(monthYear).add(1, "month").format("YYYY-MM")))
  }

  function handlePreviousMonth() {
    dispatch(utilityActions.setMonthYearFilter(moment(monthYear).subtract(1, "month").format("YYYY-MM")))
  }

  // Fetch Monthly Expenses
  React.useEffect(() => {
    dispatch(fetchMonthlyExpenses(monthYear))
  }, [dispatch, monthYear])

  const chartData = useAppSelector((state) => state.expense.monthlyExpenses)

  const total = React.useMemo(
    () => chartData.reduce((acc, curr) => {
      return {
        paid: acc.paid + (curr.total_paid ?? 0),
        received: acc.received + (curr.total_received ?? 0),
      }
    }, {
      paid: 0,
      received: 0,
    }),
    [ chartData ]
  )

  return (
    <Card>
      <CardHeader className="flex flex-col items-stretch space-y-0 border-b p-0 sm:flex-row">
        <div className="flex flex-1 flex-col justify-center gap-1 px-6 py-5 sm:py-6">
          <CardTitle className="flex items-center justify-between gap-2 text-lg font-semibold">
            <ChevronLeft className="cursor-pointer" onClick={handlePreviousMonth} />
            {moment(monthYear).format("MMMM YYYY")}
            <ChevronRightIcon className="cursor-pointer" onClick={handleNextMonth} />
            </CardTitle>
          <CardDescription className="text-center">
            Here are the monthly expenses
          </CardDescription>
        </div>
        <div className="flex">
          {["paid", "received"].map((key) => {
            const chart = key as keyof typeof chartConfig
            return (
              <span
                key={chart}
                className="relative z-30 flex flex-1 flex-col justify-center gap-1 border-t px-6 py-4 text-left even:border-l sm:border-l sm:border-t-0 sm:px-8 sm:py-6"
              >
                <span className="text-xs text-muted-foreground inline-flex gap-1">
                 {chartConfig[chart].icon()} {chartConfig[chart].label}
                </span>
                <span className="text-lg font-bold leading-none sm:text-3xl">
                 ₹{total[key as keyof typeof total].toLocaleString()}
                </span>
              </span>
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
            <Bar dataKey={"total_paid"} fill={`hsl(var(--chart-1))`} />
            <Bar dataKey={"total_received"} fill={`hsl(var(--chart-2))`} />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
