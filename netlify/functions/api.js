import express from "express";
import serverless from "serverless-http";
import { randomUUID } from "crypto";

// In-memory storage implementation
class MemStorage {
  constructor() {
    this.contactMessages = new Map();
    this.galleryItems = new Map();
    this.seedGalleryData();
  }

  seedGalleryData() {
    const defaultGalleryItems = [
      {
        title: "Comunidade Kariri Xocó",
        imageUrl: "/attached_assets/galeria_1.jpg",
        alt: "Membros da comunidade Kariri Xocó",
        category: "comunidade"
      },
      {
        title: "Artesanato Tradicional",
        imageUrl: "/attached_assets/galeria_2.jpg",
        alt: "Artesanato tradicional indígena",
        category: "cultura"
      },
      {
        title: "Celebração Cultural",
        imageUrl: "/attached_assets/galeria_3.jpg",
        alt: "Celebração cultural da aldeia",
        category: "eventos"
      },
      {
        title: "Sabedoria Ancestral",
        imageUrl: "/attached_assets/galeria_4.jpg",
        alt: "Transmissão de sabedoria ancestral",
        category: "cultura"
      },
      {
        title: "Vida na Aldeia",
        imageUrl: "/attached_assets/galeria_5.jpg",
        alt: "Cotidiano da aldeia Kariri Xocó",
        category: "comunidade"
      },
      {
        title: "Natureza e Tradição",
        imageUrl: "/attached_assets/galeria_6.jpg",
        alt: "Conexão com a natureza",
        category: "natureza"
      },
      {
        title: "União da Comunidade",
        imageUrl: "/attached_assets/galeria_7.jpg",
        alt: "Encontro comunitário",
        category: "comunidade"
      },
      {
        title: "Cultura Viva",
        imageUrl: "/attached_assets/galeria_8.jpg",
        alt: "Expressão cultural Kariri Xocó",
        category: "cultura"
      }
    ];

    defaultGalleryItems.forEach((item) => {
      const id = randomUUID();
      const galleryItem = {
        ...item,
        id,
        createdAt: new Date(),
      };
      this.galleryItems.set(id, galleryItem);
    });
  }

  async createContactMessage(insertMessage) {
    const id = randomUUID();
    const message = {
      ...insertMessage,
      id,
      createdAt: new Date(),
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
      createdAt: new Date(),
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
    return Array.from(this.galleryItems.values())
      .filter((item) => item.category === category)
      .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
  }
}

const storage = new MemStorage();

// Express app
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Health check endpoint
app.get('/health', (_req, res) => {
  res.status(200).send('ok');
});

// Silent health check
app.head('/', (_req, res) => {
  res.status(200).end();
});

// Contact API
app.post("/api/contact", async (req, res) => {
  try {
    const { name, email, message } = req.body;
    
    if (!name || !email || !message) {
      return res.status(400).json({
        error: "Dados inválidos",
        details: "Nome, email e mensagem são obrigatórios"
      });
    }
    
    const contactMessage = await storage.createContactMessage({ name, email, message });
    res.status(201).json(contactMessage);
  } catch (error) {
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
  } catch (error) {
    res.status(500).json({
      error: "Erro ao buscar mensagens",
      details: error.message
    });
  }
});

// Gallery API
app.get("/api/gallery", async (req, res) => {
  try {
    const { category } = req.query;
    const items = category
      ? await storage.getGalleryItemsByCategory(category)
      : await storage.getAllGalleryItems();
    res.json(items);
  } catch (error) {
    res.status(500).json({
      error: "Erro ao buscar itens da galeria",
      details: error.message
    });
  }
});

app.post("/api/gallery", async (req, res) => {
  try {
    const { title, imageUrl, alt, category } = req.body;
    
    if (!title || !imageUrl || !alt || !category) {
      return res.status(400).json({
        error: "Dados inválidos",
        details: "Título, imageUrl, alt e categoria são obrigatórios"
      });
    }
    
    const item = await storage.createGalleryItem({ title, imageUrl, alt, category });
    res.status(201).json(item);
  } catch (error) {
    res.status(400).json({
      error: "Dados inválidos",
      details: error.message
    });
  }
});

// Error handler
app.use((err, _req, res, _next) => {
  const status = err.status || err.statusCode || 500;
  const message = err.message || "Internal Server Error";
  res.status(status).json({ message });
});

export const handler = serverless(app);
