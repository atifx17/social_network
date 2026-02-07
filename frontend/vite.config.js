    // vite.config.js
    import { defineConfig } from 'vite';
    import react from '@vitejs/plugin-react'; // or other framework plugins
    import tailwindcss from '@tailwindcss/vite'; // Import the plugin

    export default defineConfig({
      plugins: [
        react(), // Your framework plugin
        tailwindcss(), // Add Tailwind CSS plugin
      ],
    });
