import supabase from "@/lib/supabase";

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

    return data;
  },

}
