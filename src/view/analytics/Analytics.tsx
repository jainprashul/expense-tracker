import Page from "@/components/shared/Page"
import { PieChartX } from "@/view/analytics/PieChartCategoryWise"
import { MonthlyTransactionTable } from "./MonthlyTransactionTable"
import moment from "moment"
import { Badge } from "@/components/ui/badge"
import { useAppDispatch, useAppSelector } from "@/store/hooks"
import { utilityActions } from "@/store/context/utilitySlice"
import clsx from "clsx"

// Code Generated with love
type Props = {}

const Analytics = (_: Props) => {
  return (
    <Page goBack title="Analytics">
      <div className="p-4">

        <PieChartX />

        <MonthYearFilter />

        {/* Monthly Transactions */}
        
        <div className="flex justify-between items-center p-2 mt-2">
          <h3 className="text-lg font-semibold">Monthly Transactions</h3>
          <span className="text-gray-500">{moment().format('MMM YYYY')}</span>
        </div>

        <MonthlyTransactionTable />

      </div>
    </Page>
  )
}

export default Analytics


function MonthYearFilter() {
  const dispatch = useAppDispatch()
  const monthYear = useAppSelector((state) => state.utility.filter.monthYear)
  return (
    <div className="flex items-center gap-2 mt-2 overflow-auto">
      {
        getMonthYear().map(({ month, value }) => (
          <Badge className={
            clsx("cursor-pointer", value === monthYear && 'bg-gray-600')
          } variant={'secondary'} key={value} onClick={() => {
            dispatch(utilityActions.setMonthYearFilter(value))
          }}>{month}</Badge>
        ))
      }
    </div>
  )
}


function getMonthYear(n = 18) {
  const months = []
  for (let i = 0; i < n; i++) {
    const month = moment().subtract(i, 'months').format('MMM YYYY')
    const value = moment().subtract(i, 'months').format('YYYY-MM')
    months.push({ month, value })
  }
  return months
}