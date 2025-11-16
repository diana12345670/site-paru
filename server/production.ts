
import express from "express";
import { fileURLToPath } from "url";
import { dirname, join } from "path";
import { registerRoutes } from "./routes.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Servir arquivos estáticos
const distPath = join(__dirname, "..", "dist", "public");
const assetsPath = join(__dirname, "..", "attached_assets");

app.use("/attached_assets", express.static(assetsPath));
app.use(express.static(distPath));

// Registrar rotas da API
await registerRoutes(app);

// SPA fallback - servir index.html para todas as outras rotas
app.get("*", (_req, res) => {
  res.sendFile(join(distPath, "index.html"));
});

app.listen(port, "0.0.0.0", () => {
  console.log(`🚀 Servidor rodando em http://0.0.0.0:${port}`);
});
