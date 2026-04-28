import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
  define: {
    'import.meta.env.VITE_SUPABASE_URL': JSON.stringify(
      process.env.VITE_SUPABASE_URL ?? 'https://twrwhcetxqpokuxfmicm.supabase.co'
    ),
    'import.meta.env.VITE_SUPABASE_ANON_KEY': JSON.stringify(
      process.env.VITE_SUPABASE_ANON_KEY ?? 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InR3cndoY2V0eHFwb2t1eGZpbWNtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzcyMzYzODAsImV4cCI6MjA5MjgxMjM4MH0.l-jNagjY968DjECaGdr7ZnDfT2MovLYBVBXvo8v0V_A'
    ),
  },
});
