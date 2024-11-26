import supabase from "@/lib/supabase";
import Transaction, { Category } from "@/types/Transaction";
import moment from "moment";

export const transactionService = {

  getRecentTransactions: async (limit?: number) => {
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

  getTransactions: async (from = moment().subtract(1, 'M').format('YYYY-MM-DD'), to = moment().format('YYYY-MM-DD')) => {
    const { data, error } = await supabase
      .from('expenses')
      .select("*")
      .gte('date', from)
      .lte('date', to)
      .order('date', { ascending: false })

    if (error) {
      throw new Error(error.message);
    }

    return data as Transaction[];
  },

  getMonthlyExpenses: async (monthYear = moment().format('YYYY-MM')) => {

    const { data, error } = await supabase
      .rpc('get_daily_expenses', { month: monthYear });
    if (error) {
      throw new Error(error.message);
    }

    return data;
  },

  getCategoryExpenses: async (monthYear = moment().format('YYYY-MM')) => {
    const { data, error } = await supabase
      .rpc('get_category_wise_expenses', { month: monthYear });

    if (error) {
      throw new Error(error.message);
    }

    return data;
  },

  addTransaction: async (transaction: Transaction) => {
    const { error } = await supabase
      .from('expenses')
      .insert([transaction]);

    if (error) {
      throw new Error(error.message);
    }
  },

  updateTransaction: async (transaction: Transaction) => {
    const { error } = await supabase
      .from('expenses')
      .update(transaction)
      .match({ id: transaction.id });

    if (error) {
      throw new Error(error.message);
    }
  },

  getCategories: async () => {
    const { data, error } = await supabase
      .from('categories')
      .select("*")

    if (error) {
      throw new Error(error.message)
    }

    return data as Category[]
  },

  deleteTransaction: async (id: string) => {
    const { error } = await supabase
      .from('expenses')
      .delete()
      .match({ id });

    if (error) {
      throw new Error(error.message);
    }
  }



}
