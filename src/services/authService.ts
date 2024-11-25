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
    localStorage.setItem('user', JSON.stringify(data.user));


    return data.session;
  },

  logout : async () => {
    const { error } = await supabase.auth.signOut()

    if (error) {
      throw new Error(error.message);
    }
  },

  signup : async (email: string, password: string) => {
    const { data, error } = await supabase.auth.signUp({
      email,
      password
    })

    if (error) {
      throw new Error(error.message);
    }

    let accessToken = data?.session?.access_token;
    let refreshToken = data?.session?.refresh_token;
    let user = data?.user;

    accessToken && localStorage.setItem('accessToken', accessToken);
    refreshToken && localStorage.setItem('refreshToken', refreshToken);
    user && localStorage.setItem('user', JSON.stringify(user));

    return data;
  },

  resetPassword : async (email: string) => {
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${import.meta.env.VITE_APP_URL}/reset-password`
    })

    if (error) {
      throw new Error(error.message);
    }
  },
};