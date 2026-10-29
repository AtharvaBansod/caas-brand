import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// Local-only marketing site: `npm run dev` (127.0.0.1:5180). Not part of Docker / compose.
export default defineConfig({
  plugins: [react()],
  build: { chunkSizeWarningLimit: 1200, sourcemap: false },
});
