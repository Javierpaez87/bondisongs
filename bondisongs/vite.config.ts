import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
  define: {
    'import.meta.env.VITE_SUPABASE_URL': JSON.stringify(
      process.env.VITE_SUPABASE_URL ?? 'https://cvboudtgrjzpcekodebi.supabase.co'
    ),
    'import.meta.env.VITE_SUPABASE_ANON_KEY': JSON.stringify(
      process.env.VITE_SUPABASE_ANON_KEY ?? 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImN2Ym91ZHRncmp6cGNla29kZWJpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzYzODQyMTEsImV4cCI6MjA5MTk2MDIxMX0.99TbR4gEt34Y_vgMXV8cXZW4BwutGp_MFL94ULf9qPE'
    ),
  },
});
