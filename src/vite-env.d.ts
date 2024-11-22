/// <reference types="vite/client" />
/// <reference types="vite-plugin-pwa/react" />


interface ImportMetaEnv {
  readonly VITE_SUPABASE_URL: string;
  readonly VITE_SUPABASE_ANON_KEY: string;
}

interface ImportMeta {
  readonly env : ImportMetaEnv;
}