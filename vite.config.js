import path from 'path';

import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import laravel from 'laravel-vite-plugin';
import { VitePWA } from 'vite-plugin-pwa'

export default defineConfig({
  plugins: [
    laravel({
      input: ['resources/js/app.jsx'], 
      refresh: true,
    }),
    
    react(),
  ,
  
    VitePWA({
      registerType: 'autoUpdate',
      manifest: {
        name: 'WandaMarket',
        short_name: 'WandaMarket',
        start_url: '/',
        display: 'standalone',
        background_color: '#ffffff',
        theme_color: '#ec8d0c',
        icons: [
          {
            src: '/icones/cmr.png',
            sizes: '192x192',
            type: 'image/png',
          },
          {
            src: '/icones/cmr.png',
            sizes: '512x512',
            type: 'image/png',
          },
        ],
      },
    })
  ],
   
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'resources/js'),
    },
  },
 
})
;

