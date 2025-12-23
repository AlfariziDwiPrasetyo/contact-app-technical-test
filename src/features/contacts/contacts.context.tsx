import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import type {
  ContactEntity,
  ContactContextType,
  ContactFormData,
} from "./contacts";
import { contactsService } from "./contacts.service";

// Context

const ContactContext = createContext<ContactContextType | null>(null);

// Provider

export const ContactProvider = ({ children }: { children: ReactNode }) => {
  const [contacts, setContact] = useState<ContactEntity[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const loadContacts = () => {
    setLoading(true);
    const data = contactsService.findAll();
    setContact(data);
    setLoading(false);
  };

  useEffect(() => {
    loadContacts();
  }, []);

  const createContact = async (data: ContactFormData) => {
    await contactsService.create(data);
    loadContacts();
  };

  const updateContact = async (
    id: string,
    data: ContactFormData,
    oldPhoto?: string
  ) => {
    await contactsService.update(id, data, oldPhoto);
    loadContacts();
  };

  const deleteContact = (id: string) => {
    contactsService.delete(id);
    loadContacts();
  };

  const getContactById = (id: string) => {
    return contacts.find((c) => c.id === id);
  };

  return (
    <ContactContext.Provider
      value={{
        contacts,
        loading,
        loadContacts,
        createContact,
        updateContact,
        deleteContact,
        getContactById,
      }}
    >
      {children}
    </ContactContext.Provider>
  );
};

// Hook
export const useContacts = () => {
  const context = useContext(ContactContext);
  if (!context) {
    throw new Error("useContacts harus digunakan di dalam ContactProvider");
  }
  return context;
};
