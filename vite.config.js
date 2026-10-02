import { resolve } from "path";
import { defineConfig } from "vite";

export default defineConfig({
  root: "src/",
      preview: {
          host: true,
          allowedHosts: ['https://surf-search-project.onrender.com/']
    },
  build: {
    outDir: "../dist",
    rollupOptions: {
      input: {
        main: resolve(__dirname, "src/index.html"),
        header: resolve(__dirname, "src/public/partials/header.html"),
        results: resolve(__dirname, "src/results/index.html"
        ),
      },
    },
  },
});
