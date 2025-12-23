export type ContactFormData = z.infer<typeof contactSchema>;

export interface ContactEntity {
  id: string;
  nama: string;
  telepon: string;
  email: string;
  fotoProfil: string;
  lokasi: {
    lat: number;
    lng: number;
  };
  createdAt: string;
}

export interface ContactContextType {
  contacts: ContactEntity[];
  loading: boolean;

  loadContacts: () => void;
  createContact: (data: ContactFormData) => Promise<void>;
  updateContact: (
    id: string,
    data: ContactFormData,
    oldPhoto?: string
  ) => Promise<void>;
  deleteContact: (id: string) => void;
  getContactById: (id: string) => ContactEntity | undefined;
}
