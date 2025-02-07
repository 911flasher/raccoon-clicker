import react from '@vitejs/plugin-react';
import path from 'path';
import { defineConfig } from 'vite';
// import checker from 'vite-plugin-checker'; 
// https://vitejs.dev/config/
const isProduction = process.env.NODE_ENV === "production";
const profiling = isProduction &&  {
  "react-dom/client": "react-dom/profiling",
  'react-dom$': 'react-dom/profiling',
  'react-dom': path.resolve(
    __dirname,
    'node_modules/react-dom/profiling'
),
'scheduler/tracing': path.resolve(
    __dirname,
    'node_modules/scheduler/tracing-profiling'
),
};
export default defineConfig({
  resolve: {
    alias: {
      core: path.resolve(__dirname, './src/core'),
      features: path.resolve(__dirname, './src/features'),
      pages: path.resolve(__dirname, './src/pages'),
      ...profiling,
    },
  },
  
  plugins: [/* checker({ typescript: false }), */react()],
})
