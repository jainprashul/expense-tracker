import supabase from "@/lib/supabase";
import { UserMeta } from "@/types/UserMeta";

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

    localStorage.clear();

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

    return data;
  },

  resetPassword : async (email: string) => {
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${import.meta.env.VITE_APP_URL}/auth/verify`
    })

    if (error) {
      throw new Error(error.message);
    }
  },

  updateUserData : async (data: UserMeta) => {
    const { data : res , error } = await supabase.auth.updateUser({
      data
    })

    if (error) {
      throw new Error(error.message);
    }
    return res;
  },

  updateUserPassword : async (password: string) => {
    const { error } = await supabase.auth.updateUser({
      password
    })

    if (error) {
      throw new Error(error.message);
    };
  }
};