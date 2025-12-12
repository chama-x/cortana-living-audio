import path from 'path';
import { defineConfig, loadEnv } from 'vite';


export default defineConfig(({ mode }) => {
    const env = loadEnv(mode, '.', '');
    return {
      base: '/cortana-living-audio/',
      server: {
        port: 3000,
        host: '0.0.0.0',
      },
      plugins: [],
      define: {
        'process.env.API_KEY': JSON.stringify(env.GEMINI_API_KEY),
        'process.env.GEMINI_API_KEY': JSON.stringify(env.GEMINI_API_KEY)
      },
      resolve: {
        alias: {
          '@': path.resolve(__dirname, 'src'),
          '@core': path.resolve(__dirname, 'src/core'),
          '@audio': path.resolve(__dirname, 'src/audio'),
          '@visuals': path.resolve(__dirname, 'src/visuals'),
          '@ai': path.resolve(__dirname, 'src/ai'),
          '@shared': path.resolve(__dirname, 'src/shared'),
        }
      }
    };
});
