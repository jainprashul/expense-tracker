import * as React from "react"
import { MoveDownLeft, MoveUpRight, TrendingUp } from "lucide-react"
import { Label, Pie, PieChart } from "recharts"

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
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
import moment from "moment"
import { fetchCategoryWiseExpenses } from "@/store/context/expenseSlice"
import colors, { NumberToCurrencyINR } from "@/utils/colors"



export function PieChartX() {
  const dispatch = useAppDispatch()

  const yearMonth = useAppSelector((state) => state.utility.filter.monthYear);

  // fetch Category wise expenses
  React.useEffect(() => {
    dispatch(fetchCategoryWiseExpenses(yearMonth))
  }, [yearMonth])
  const categories = useAppSelector((state) => state.expense.categories)

  const chartData = useAppSelector((state) => state.expense.categoryWise).map((data, i) => ({
    ...data,
    fill : colors[i]
  }));

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
    [chartData]
  )


  const chartConfig = React.useMemo(() => {
    const config: ChartConfig = {}
    categories.forEach((category, index) => {
      config[category.name] = {
        label: category.name,
        color: `hsl(${(index * 360) / categories.length}, 70%, 50%)`,
      }
    })
    return config
  }, [categories])

  return (
    <Card className="flex flex-col">
      <CardHeader className="items-center pb-0">
        <CardTitle>
          Category Wise Expenses
        </CardTitle>
        <CardDescription>
          {moment(yearMonth).format("MMMM YYYY")}
        </CardDescription>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-[250px]"
        >
          <PieChart>
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Pie
              data={chartData}
              dataKey="total_paid"
              nameKey="category_name"
              innerRadius={90}
              outerRadius={110}
              strokeWidth={5}
            >
              <Label
                content={({ viewBox }) => {
                  if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                    return (
                      <text
                        x={viewBox.cx}
                        y={viewBox.cy}
                        textAnchor="middle"
                        dominantBaseline="middle"
                      >
                        <tspan
                          x={viewBox.cx}
                          y={viewBox.cy}
                          className="fill-foreground text-3xl font-bold"
                        >
                          {NumberToCurrencyINR(total.paid)}
                        </tspan>
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) + 24}
                          className="fill-muted-foreground"
                        >
                          Expense Total
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
      <CardFooter className="flex-col gap-2 text-sm">
        <div className="flex items-center gap-1">
          <MoveUpRight className="text-red-500" />
          <span>Spent - {NumberToCurrencyINR(total.paid)} </span>
        </div>
        <div className="flex items-center gap-1">
          <MoveDownLeft className="text-green-500" />
          <span>Received - {NumberToCurrencyINR(total.received)}</span>
        </div>
      </CardFooter>
    </Card>
  )
}
