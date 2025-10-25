import { 
  type ContactMessage, 
  type InsertContactMessage,
  type GalleryItem,
  type InsertGalleryItem
} from "@shared/schema";
import { randomUUID } from "crypto";

export interface IStorage {
  createContactMessage(message: InsertContactMessage): Promise<ContactMessage>;
  getAllContactMessages(): Promise<ContactMessage[]>;
  createGalleryItem(item: InsertGalleryItem): Promise<GalleryItem>;
  getAllGalleryItems(): Promise<GalleryItem[]>;
  getGalleryItemsByCategory(category: string): Promise<GalleryItem[]>;
}

export class MemStorage implements IStorage {
  private contactMessages: Map<string, ContactMessage>;
  private galleryItems: Map<string, GalleryItem>;

  constructor() {
    this.contactMessages = new Map();
    this.galleryItems = new Map();
    this.seedGalleryData();
  }

  private seedGalleryData() {
    const defaultGalleryItems: InsertGalleryItem[] = [
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
      const galleryItem: GalleryItem = {
        ...item,
        id,
        createdAt: new Date(),
      };
      this.galleryItems.set(id, galleryItem);
    });
  }

  async createContactMessage(insertMessage: InsertContactMessage): Promise<ContactMessage> {
    const id = randomUUID();
    const message: ContactMessage = {
      ...insertMessage,
      id,
      createdAt: new Date(),
    };
    this.contactMessages.set(id, message);
    return message;
  }

  async getAllContactMessages(): Promise<ContactMessage[]> {
    return Array.from(this.contactMessages.values()).sort(
      (a, b) => b.createdAt.getTime() - a.createdAt.getTime()
    );
  }

  async createGalleryItem(insertItem: InsertGalleryItem): Promise<GalleryItem> {
    const id = randomUUID();
    const item: GalleryItem = {
      ...insertItem,
      id,
      createdAt: new Date(),
    };
    this.galleryItems.set(id, item);
    return item;
  }

  async getAllGalleryItems(): Promise<GalleryItem[]> {
    return Array.from(this.galleryItems.values()).sort(
      (a, b) => b.createdAt.getTime() - a.createdAt.getTime()
    );
  }

  async getGalleryItemsByCategory(category: string): Promise<GalleryItem[]> {
    return Array.from(this.galleryItems.values())
      .filter((item) => item.category === category)
      .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
  }
}

export const storage = new MemStorage();