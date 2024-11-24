import supabase from "@/lib/supabase";
import Transaction from "@/types/Transaction";
import moment from "moment";

export const transactionService = {

  getTransactions: async (limit?: number) => {
    const { data, error } = await supabase
      .from('expenses')
      .select('*')
      .order('date', { ascending: false })
      .limit(limit || Infinity);

    if (error) {
      throw new Error(error.message);
    }

    return data as Transaction[];
  },


  getMonthlyExpenses: async (monthYear = moment().format('YYYY-MM')) => {

    const { data, error } = await supabase
      .rpc('get_daily_expenses', { month : monthYear });
    if (error) {
      throw new Error(error.message);
    }

    return data;
  },

  addTransaction: async (transaction: Transaction) => {
    const {  error } = await supabase
      .from('expenses')
      .insert([transaction]);

    if (error) {
      throw new Error(error.message);
    }
    
  },


}
