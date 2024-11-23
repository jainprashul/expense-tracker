import supabase from "@/lib/supabase";
import Expense from "@/types/Expense";

export const expenseService = {

  getTransactions: async (limit?: number) => {
    const { data, error } = await supabase
      .from('expenses')
      .select('*')
      .order('date', { ascending: false })
      .limit(limit || Infinity);

    if (error) {
      throw new Error(error.message);
    }

    return data as Expense[];
  },


}
