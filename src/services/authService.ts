import supabase from "@/lib/supabase";

export const authService = {
  login : async (email: string, password: string) => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password
    })

    if (error) {
      throw new Error(error.message);
    }

    localStorage.setItem('accessToken', data.session.access_token);
    localStorage.setItem('refreshToken', data.session.refresh_token);
    localStorage.setItem('user', JSON.stringify(data.session.user));


    return data.session;
  },

  logout : async () => {
    const { error } = await supabase.auth.signOut()

    if (error) {
      throw new Error(error.message);
    }
  }
};