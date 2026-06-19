import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// Akili — sovereign Swahili AI console.
export default defineConfig({
  plugins: [react()],
  server: { port: 5202, strictPort: true },
  test: {
    environment: 'node',
  },
});
