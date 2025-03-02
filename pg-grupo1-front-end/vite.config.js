
import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
    root: 'src',
    publicDir: '../public',
    //Esto hace que habra de primeras el admin panel cuando este montado quitar (
    server: {
        open: '/index.html',
      },
    //  hasta aqui  )
    build: {
      outDir: '../dist',
      rollupOptions: {
        input: {
            admin: resolve(__dirname, 'src/admin.html'),   // Página adicional
            login: resolve(__dirname, 'src/index.html'),  // Página principal que se abrirá primero
        }
      }
    }
  });
  