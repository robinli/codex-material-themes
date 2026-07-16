import { copyFile, mkdir, writeFile } from "node:fs/promises";

await mkdir("dist/server", { recursive: true });
await mkdir("dist/.openai", { recursive: true });
await copyFile(".openai/hosting.json", "dist/.openai/hosting.json");

// The site itself is entirely static. This tiny entry point only lets the
// existing Sites project hand each request to its static-asset binding.
await writeFile(
  "dist/server/index.js",
  `export default {\n  fetch(request, env) {\n    return env.ASSETS.fetch(request);\n  },\n};\n`,
);
