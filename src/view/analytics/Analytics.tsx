import Page from "@/components/shared/Page"
import { PieChartX } from "@/view/analytics/PieChartCategoryWise"
import { MonthlyTransactionTable } from "./MonthlyTransactionTable"
import moment from "moment"
import { useAppDispatch, useAppSelector } from "@/store/hooks"
import { utilityActions } from "@/store/context/utilitySlice"
import { ChevronLeft, ChevronRightIcon } from "lucide-react"
import React from "react"
import { MonthlyCategoryWiseTable } from "./MonthlyCategoryWiseTable"

// Code Generated with love
type Props = {}

const Analytics = (_: Props) => {

  const [activeTab, setActiveTab] = React.useState('Monthly')

  const TabContent = () => {
    switch (activeTab) {
      case 'Monthly':
        return <>
        {/* Monthly Transactions */}
        <div className="flex justify-between items-center p-2 mt-2">
          <h3 className="text-lg font-semibold">Monthly Transactions</h3>
          <span className="text-gray-500">{moment().format('MMM YYYY')}</span>
        </div>

        <MonthlyTransactionTable />
        </>
      case 'Category Wise':
        return <>
        {/* Category Wise Transactions */}
        <div className="flex justify-between items-center p-2 mt-2">
          <h3 className="text-lg font-semibold">Category Wise Transactions</h3>
          <span className="text-gray-500">{moment().format('MMM YYYY')}</span>
        </div>
        <MonthlyCategoryWiseTable />
        </>
      default:
        return <MonthlyTransactionTable />
    }
  }

  return (
    <Page goBack title="Analytics">
      <div className="p-4">

        <PieChartX />

        <MonthYearFilter />


        {/* Tabs */}   
        <div className="flex justify-start gap-10 items-center pt-2 mt-2">
          {["Monthly", "Category Wise"].map((tab) => (
            <div key={tab} className="gap-2 cursor-pointer" onClick={() => setActiveTab(tab)}>
              <span className={activeTab === tab ? 'text-blue-500 font-bold text-lg' : ''}>{tab}</span>
            </div>
          ))}
        </div>

        <hr className="my-2 bg-blue-50" />
        
        {/* Tab Content */}
        <TabContent />

      </div>
    </Page>
  )
}

export default Analytics


function MonthYearFilter() {
  const dispatch = useAppDispatch()
  const monthYear = useAppSelector((state) => state.utility.filter.monthYear)

  function handleNextMonth() {
    if (moment() < moment(monthYear)) return
    dispatch(utilityActions.setMonthYearFilter(moment(monthYear).add(1, "month").format("YYYY-MM")))
  }

  function handlePreviousMonth() {
    dispatch(utilityActions.setMonthYearFilter(moment(monthYear).subtract(1, "month").format("YYYY-MM")))
  }

  return (
    <div className="flex items-center justify-evenly gap-2 mt-2">
      {/* {
        getMonthYear().map(({ month, value }) => (
          <div className={
            clsx("rounded-md border px-2.5 py-0.5 text-xs font-semibold cursor-pointer bg-secondary", value === monthYear && '!bg-gray-600')
          }  key={value} onClick={() => {
            dispatch(utilityActions.setMonthYearFilter(value))
          }}>{month}</div>
        ))
      } */}

      <ChevronLeft className="cursor-pointer" onClick={handlePreviousMonth} />
      <span className="bg-secondary rounded-md px-5 py-0.5 font-semibold">
        {moment(monthYear).format("MMMM YYYY")}
      </span>
      <ChevronRightIcon className="cursor-pointer" onClick={handleNextMonth} />
    </div>
  )
}


// function getMonthYear(n = 18) {
//   const months = []
//   for (let i = 0; i < n; i++) {
//     const month = moment().subtract(i, 'months').format('MMM YYYY')
//     const value = moment().subtract(i, 'months').format('YYYY-MM')
//     months.push({ month, value })
//   }
//   return months
// }