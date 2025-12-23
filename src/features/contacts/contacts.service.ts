import { fileToBase64 } from "../../lib/upload";
import type { ContactEntity, ContactFormData } from "./contacts";

const STORAGE_KEY = "contacts";

const getStoredContacts = (): ContactEntity[] => {
  const raw = localStorage.getItem(STORAGE_KEY);
  return raw ? JSON.parse(raw) : [];
};

const saveContacts = (contacts: ContactEntity[]) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(contacts));
};

// Service nya
export const contactsService = {
  create: async (data: ContactFormData): Promise<ContactEntity> => {
    const base64Image = await fileToBase64(data.fotoProfil);

    const newContact: ContactFormData = {
      id: crypto.randomUUID(),
      nama: data.nama,
      telepon: data.telepon,
      email: data.email,
      fotoProfil: base64Image,
      lokasi: data.lokasi,
      createdAt: new Date().toISOString(),
    };

    const contacts = getStoredContacts();
    contacts.push(newContact);
    saveContacts(contacts);

    return newContact;
  },

  async update(
    id: string,
    data: ContactFormData,
    oldPhoto?: string
  ): Promise<ContactEntity> {
    const contacts = getStoredContacts();
    const index = contacts.findIndex((c) => c.id === id);

    if (index === -1) {
      throw new Error("Kontak tidak ditemukan");
    }

    const fotoProfil =
      data.fotoProfil instanceof File
        ? await fileToBase64(data.fotoProfil)
        : oldPhoto ?? contacts[index].fotoProfil;

    const updated: ContactFormData = {
      ...contacts[index],
      nama: data.nama,
      telepon: data.telepon,
      email: data.email,
      lokasi: data.lokasi,
      fotoProfil,
      updatedAt: new Date().toISOString(),
    };

    contacts[index] = updated;
    saveContacts(contacts);

    return updated;
  },

  findAll: (): ContactEntity[] => {
    return getStoredContacts();
  },

  findById: (id: string): ContactEntity | undefined => {
    return getStoredContacts().find((c) => c.id === id);
  },

  delete: (id: string) => {
    const contacts = getStoredContacts().filter((c) => c.id !== id);
    saveContacts(contacts);
  },
};
