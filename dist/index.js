var __defProp = Object.defineProperty;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __esm = (fn, res) => function __init() {
  return fn && (res = (0, fn[__getOwnPropNames(fn)[0]])(fn = 0)), res;
};
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};

// vite.config.ts
var vite_config_exports = {};
__export(vite_config_exports, {
  default: () => vite_config_default
});
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import runtimeErrorOverlay from "@replit/vite-plugin-runtime-error-modal";
var vite_config_default;
var init_vite_config = __esm({
  async "vite.config.ts"() {
    "use strict";
    vite_config_default = defineConfig({
      plugins: [
        react(),
        runtimeErrorOverlay(),
        ...process.env.NODE_ENV !== "production" && process.env.REPL_ID !== void 0 ? [
          await import("@replit/vite-plugin-cartographer").then(
            (m) => m.cartographer()
          ),
          await import("@replit/vite-plugin-dev-banner").then(
            (m) => m.devBanner()
          )
        ] : []
      ],
      resolve: {
        alias: {
          "@": path.resolve(import.meta.dirname, "client", "src"),
          "@shared": path.resolve(import.meta.dirname, "shared"),
          "@assets": path.resolve(import.meta.dirname, "attached_assets")
        }
      },
      root: path.resolve(import.meta.dirname, "client"),
      build: {
        outDir: path.resolve(import.meta.dirname, "dist/public"),
        emptyOutDir: true
      },
      server: {
        host: "0.0.0.0",
        port: 5173,
        strictPort: false,
        fs: {
          strict: true,
          deny: ["**/.*"]
        }
      }
    });
  }
});

// server/index.ts
import express2 from "express";

// server/routes.ts
import { createServer } from "http";

// server/storage.ts
import { randomUUID } from "crypto";
var MemStorage = class {
  contactMessages;
  galleryItems;
  constructor() {
    this.contactMessages = /* @__PURE__ */ new Map();
    this.galleryItems = /* @__PURE__ */ new Map();
    this.seedGalleryData();
  }
  seedGalleryData() {
    const defaultGalleryItems = [
      {
        title: "Comunidade Kariri Xoc\xF3",
        imageUrl: "/attached_assets/galeria_1.jpg",
        alt: "Membros da comunidade Kariri Xoc\xF3",
        category: "comunidade"
      },
      {
        title: "Artesanato Tradicional",
        imageUrl: "/attached_assets/galeria_2.jpg",
        alt: "Artesanato tradicional ind\xEDgena",
        category: "cultura"
      },
      {
        title: "Celebra\xE7\xE3o Cultural",
        imageUrl: "/attached_assets/galeria_3.jpg",
        alt: "Celebra\xE7\xE3o cultural da aldeia",
        category: "eventos"
      },
      {
        title: "Sabedoria Ancestral",
        imageUrl: "/attached_assets/galeria_4.jpg",
        alt: "Transmiss\xE3o de sabedoria ancestral",
        category: "cultura"
      },
      {
        title: "Vida na Aldeia",
        imageUrl: "/attached_assets/galeria_5.jpg",
        alt: "Cotidiano da aldeia Kariri Xoc\xF3",
        category: "comunidade"
      },
      {
        title: "Natureza e Tradi\xE7\xE3o",
        imageUrl: "/attached_assets/galeria_6.jpg",
        alt: "Conex\xE3o com a natureza",
        category: "natureza"
      },
      {
        title: "Uni\xE3o da Comunidade",
        imageUrl: "/attached_assets/galeria_7.jpg",
        alt: "Encontro comunit\xE1rio",
        category: "comunidade"
      },
      {
        title: "Cultura Viva",
        imageUrl: "/attached_assets/galeria_8.jpg",
        alt: "Express\xE3o cultural Kariri Xoc\xF3",
        category: "cultura"
      }
    ];
    defaultGalleryItems.forEach((item) => {
      const id = randomUUID();
      const galleryItem = {
        ...item,
        id,
        createdAt: /* @__PURE__ */ new Date()
      };
      this.galleryItems.set(id, galleryItem);
    });
  }
  async createContactMessage(insertMessage) {
    const id = randomUUID();
    const message = {
      ...insertMessage,
      id,
      createdAt: /* @__PURE__ */ new Date()
    };
    this.contactMessages.set(id, message);
    return message;
  }
  async getAllContactMessages() {
    return Array.from(this.contactMessages.values()).sort(
      (a, b) => b.createdAt.getTime() - a.createdAt.getTime()
    );
  }
  async createGalleryItem(insertItem) {
    const id = randomUUID();
    const item = {
      ...insertItem,
      id,
      createdAt: /* @__PURE__ */ new Date()
    };
    this.galleryItems.set(id, item);
    return item;
  }
  async getAllGalleryItems() {
    return Array.from(this.galleryItems.values()).sort(
      (a, b) => b.createdAt.getTime() - a.createdAt.getTime()
    );
  }
  async getGalleryItemsByCategory(category) {
    return Array.from(this.galleryItems.values()).filter((item) => item.category === category).sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
  }
};
var storage = new MemStorage();

// shared/schema.ts
import { sql } from "drizzle-orm";
import { pgTable, text, varchar, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
var contactMessages = pgTable("contact_messages", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  name: text("name").notNull(),
  email: text("email").notNull(),
  message: text("message").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull()
});
var insertContactMessageSchema = createInsertSchema(contactMessages).omit({
  id: true,
  createdAt: true
});
var galleryItems = pgTable("gallery_items", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  title: text("title").notNull(),
  imageUrl: text("image_url").notNull(),
  alt: text("alt").notNull(),
  category: text("category").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull()
});
var insertGalleryItemSchema = createInsertSchema(galleryItems).omit({
  id: true,
  createdAt: true
});

// server/routes.ts
async function registerRoutes(app2) {
  app2.get("/health", (_req, res) => {
    res.status(200).send("ok");
  });
  app2.head("/", (_req, res) => {
    res.status(200).end();
  });
  app2.post("/api/contact", async (req, res) => {
    try {
      const validatedData = insertContactMessageSchema.parse(req.body);
      const message = await storage.createContactMessage(validatedData);
      res.status(201).json(message);
    } catch (error) {
      res.status(400).json({
        error: "Dados inv\xE1lidos",
        details: error.message
      });
    }
  });
  app2.get("/api/contact", async (req, res) => {
    try {
      const messages = await storage.getAllContactMessages();
      res.json(messages);
    } catch (error) {
      res.status(500).json({
        error: "Erro ao buscar mensagens",
        details: error.message
      });
    }
  });
  app2.get("/api/gallery", async (req, res) => {
    try {
      const { category } = req.query;
      const items = category ? await storage.getGalleryItemsByCategory(category) : await storage.getAllGalleryItems();
      res.json(items);
    } catch (error) {
      res.status(500).json({
        error: "Erro ao buscar itens da galeria",
        details: error.message
      });
    }
  });
  app2.post("/api/gallery", async (req, res) => {
    try {
      const validatedData = insertGalleryItemSchema.parse(req.body);
      const item = await storage.createGalleryItem(validatedData);
      res.status(201).json(item);
    } catch (error) {
      res.status(400).json({
        error: "Dados inv\xE1lidos",
        details: error.message
      });
    }
  });
  const httpServer = createServer(app2);
  return httpServer;
}

// server/vite.ts
import express from "express";
import fs from "fs";
import path2 from "path";
function log(message, source = "express") {
  const formattedTime = (/* @__PURE__ */ new Date()).toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    second: "2-digit",
    hour12: true
  });
  console.log(`${formattedTime} [${source}] ${message}`);
}
async function setupVite(app2, server) {
  const { createServer: createViteServer, createLogger } = await import("vite");
  const viteConfig = (await init_vite_config().then(() => vite_config_exports)).default;
  const { nanoid } = await import("nanoid");
  const viteLogger = createLogger();
  const serverOptions = {
    middlewareMode: true,
    hmr: { server },
    allowedHosts: true
  };
  const vite = await createViteServer({
    ...viteConfig,
    configFile: false,
    customLogger: {
      ...viteLogger,
      error: (msg, options) => {
        viteLogger.error(msg, options);
        process.exit(1);
      }
    },
    server: serverOptions,
    appType: "custom"
  });
  app2.use(vite.middlewares);
  app2.use("*", async (req, res, next) => {
    const url = req.originalUrl;
    try {
      const clientTemplate = path2.resolve(
        import.meta.dirname,
        "..",
        "client",
        "index.html"
      );
      let template = await fs.promises.readFile(clientTemplate, "utf-8");
      template = template.replace(
        `src="/src/main.tsx"`,
        `src="/src/main.tsx?v=${nanoid()}"`
      );
      const page = await vite.transformIndexHtml(url, template);
      res.status(200).set({ "Content-Type": "text/html" }).end(page);
    } catch (e) {
      vite.ssrFixStacktrace(e);
      next(e);
    }
  });
}
function serveStatic(app2) {
  const distPath = path2.resolve(import.meta.dirname, "public");
  if (!fs.existsSync(distPath)) {
    throw new Error(
      `Could not find the build directory: ${distPath}, make sure to build the client first`
    );
  }
  app2.use(express.static(distPath));
  app2.use("*", (_req, res) => {
    res.sendFile(path2.resolve(distPath, "index.html"));
  });
}

// server/index.ts
var app = express2();
app.use(express2.json());
app.use(express2.urlencoded({ extended: false }));
app.use("/attached_assets", express2.static("attached_assets"));
app.use((req, res, next) => {
  const start = Date.now();
  const path3 = req.path;
  let capturedJsonResponse = void 0;
  const originalResJson = res.json;
  res.json = function(bodyJson, ...args) {
    capturedJsonResponse = bodyJson;
    return originalResJson.apply(res, [bodyJson, ...args]);
  };
  res.on("finish", () => {
    const duration = Date.now() - start;
    if (path3.startsWith("/api")) {
      let logLine = `${req.method} ${path3} ${res.statusCode} in ${duration}ms`;
      if (capturedJsonResponse) {
        logLine += ` :: ${JSON.stringify(capturedJsonResponse)}`;
      }
      if (logLine.length > 80) {
        logLine = logLine.slice(0, 79) + "\u2026";
      }
      log(logLine);
    }
  });
  next();
});
(async () => {
  const server = await registerRoutes(app);
  app.use((err, _req, res, _next) => {
    const status = err.status || err.statusCode || 500;
    const message = err.message || "Internal Server Error";
    res.status(status).json({ message });
    throw err;
  });
  if (process.env.NODE_ENV === "development") {
    await setupVite(app, server);
  } else {
    serveStatic(app);
  }
  const port = parseInt(process.env.PORT || "5000", 10);
  const host = process.env.HOST || "0.0.0.0";
  server.listen({
    port,
    host,
    reusePort: true
  }, () => {
    log(`serving on ${host}:${port}`);
  });
})();
