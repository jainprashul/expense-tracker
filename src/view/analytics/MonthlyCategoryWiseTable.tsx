import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { fetchMonthlyExpenses } from "@/store/context/expenseSlice";
import { useAppDispatch, useAppSelector } from "@/store/hooks"
import { NumberToCurrencyINR } from "@/utils/colors";
import moment from "moment";
import { useEffect, useMemo } from "react";


export function MonthlyCategoryWiseTable() {
  const dispatch = useAppDispatch();
  const monthYear = useAppSelector(s => s.utility.filter.monthYear);
  const mExpenses = useAppSelector(s => s.expense.categoryWise);

  useEffect(() => {
    // Fetch Monthly Expenses
    dispatch(fetchMonthlyExpenses(monthYear))
  }, [dispatch, monthYear])

  const total = useMemo(()=> {
    return mExpenses.reduce((acc, curr) => {
      return {
        paid: acc.paid + (curr.total_paid ?? 0),
        received: acc.received + (curr.total_received ?? 0),
      }
    }, {
      paid: 0,
      received: 0,
    })
  }, [mExpenses])

  return (
    <Table>
      <TableCaption>
        Category wise transaction for {moment(monthYear).format("MMMM YYYY")}
      </TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className=''>Category</TableHead>
          <TableHead>Paid</TableHead>
          <TableHead>Received</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {mExpenses.map((t) => (
          <TableRow key={t.category_name}>
            <TableCell className="font-medium">{t.category_name}</TableCell>
            <TableCell>{NumberToCurrencyINR(t.total_paid ?? 0)}</TableCell>
            <TableCell>{NumberToCurrencyINR(t.total_received ?? 0)}</TableCell>
          </TableRow>
        ))}
      </TableBody>
      <TableFooter>
        <TableRow>
          <TableCell>Total</TableCell>
          <TableCell>{NumberToCurrencyINR(total.paid)}</TableCell>
          <TableCell>{NumberToCurrencyINR(total.received)}</TableCell>
        </TableRow>
      </TableFooter>
    </Table>
  )
}
