import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertContactMessageSchema, insertGalleryItemSchema } from "@shared/schema";

export async function registerRoutes(app: Express): Promise<Server> {
  // Health check endpoint para UptimeRobot
  app.get("/health", (_req, res) => {
    res.status(200).json({ 
      status: "ok", 
      timestamp: new Date().toISOString() 
    });
  });

  app.post("/api/contact", async (req, res) => {
    try {
      const validatedData = insertContactMessageSchema.parse(req.body);
      const message = await storage.createContactMessage(validatedData);
      res.status(201).json(message);
    } catch (error: any) {
      res.status(400).json({ 
        error: "Dados inválidos", 
        details: error.message 
      });
    }
  });

  app.get("/api/contact", async (req, res) => {
    try {
      const messages = await storage.getAllContactMessages();
      res.json(messages);
    } catch (error: any) {
      res.status(500).json({ 
        error: "Erro ao buscar mensagens", 
        details: error.message 
      });
    }
  });

  app.get("/api/gallery", async (req, res) => {
    try {
      const { category } = req.query;
      const items = category 
        ? await storage.getGalleryItemsByCategory(category as string)
        : await storage.getAllGalleryItems();
      res.json(items);
    } catch (error: any) {
      res.status(500).json({ 
        error: "Erro ao buscar itens da galeria", 
        details: error.message 
      });
    }
  });

  app.post("/api/gallery", async (req, res) => {
    try {
      const validatedData = insertGalleryItemSchema.parse(req.body);
      const item = await storage.createGalleryItem(validatedData);
      res.status(201).json(item);
    } catch (error: any) {
      res.status(400).json({ 
        error: "Dados inválidos", 
        details: error.message 
      });
    }
  });

  const httpServer = createServer(app);

  return httpServer;
}
