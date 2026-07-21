import { defineConfig } from "vite";

const staticPageRoutes = new Map([
  ["/privacy", "/privacy/index.html"],
  ["/privacy/", "/privacy/index.html"],
  ["/terms", "/terms/index.html"],
  ["/terms/", "/terms/index.html"],
  ["/support", "/support/index.html"],
  ["/support/", "/support/index.html"],
]);

export default defineConfig({
  plugins: [
    {
      name: "serve-static-pages-with-clean-paths",
      configureServer(server) {
        server.middlewares.use((request, _response, next) => {
          if (request.url) {
            const [pathname, query] = request.url.split("?", 2);
            const target = staticPageRoutes.get(pathname);
            if (target) request.url = query ? `${target}?${query}` : target;
          }
          next();
        });
      },
    },
  ],
  build: {
    outDir: "dist/client",
    emptyOutDir: true,
  },
});
