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

const invoices = [
  {
    invoice: "INV001",
    paymentStatus: "Paid",
    totalAmount: "$250.00",
    paymentMethod: "Credit Card",
  },
  {
    invoice: "INV002",
    paymentStatus: "Pending",
    totalAmount: "$150.00",
    paymentMethod: "PayPal",
  },
  {
    invoice: "INV003",
    paymentStatus: "Unpaid",
    totalAmount: "$350.00",
    paymentMethod: "Bank Transfer",
  },
  {
    invoice: "INV004",
    paymentStatus: "Paid",
    totalAmount: "$450.00",
    paymentMethod: "Credit Card",
  },
  {
    invoice: "INV005",
    paymentStatus: "Paid",
    totalAmount: "$550.00",
    paymentMethod: "PayPal",
  },
  {
    invoice: "INV006",
    paymentStatus: "Pending",
    totalAmount: "$200.00",
    paymentMethod: "Bank Transfer",
  },
  {
    invoice: "INV007",
    paymentStatus: "Unpaid",
    totalAmount: "$300.00",
    paymentMethod: "Credit Card",
  },
]

export function MonthlyTransactionTable() {
  const dispatch = useAppDispatch();
  const monthYear = useAppSelector(s => s.utility.filter.monthYear);
  const mExpenses = useAppSelector(s => s.expense.monthlyExpenses);

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
        Day wise transaction for {moment(monthYear).format("MMMM YYYY")}
      </TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className=''>Date</TableHead>
          <TableHead>Paid</TableHead>
          <TableHead>Received</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {mExpenses.map((t) => (
          <TableRow key={t.day}>
            <TableCell className="font-medium">{t.day}</TableCell>
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
