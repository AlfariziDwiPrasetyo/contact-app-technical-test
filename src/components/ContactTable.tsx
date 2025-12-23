import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Button } from "./ui/button";
import { Phone, Mail, MapPin, Pencil, Trash2 } from "lucide-react";
import type { ContactEntity } from "../features/contacts/contacts";
import { useNavigate } from "react-router-dom";

interface ContactTableProps {
  contacts: ContactEntity[];
  onEdit?: (contact: ContactEntity) => void;
  onDelete?: (contact: ContactEntity) => void;
}

export function ContactTable({ contacts, onDelete }: ContactTableProps) {
  const navigate = useNavigate();

  const openMap = (latitude: number, longitude: number) => {
    window.open(
      `https://www.google.com/maps?q=${latitude},${longitude}`,
      "_blank"
    );
  };

  return (
    <div className="rounded-xl border border-border overflow-hidden bg-card">
      <Table>
        <TableHeader>
          <TableRow className="bg-muted/50 hover:bg-muted/50">
            <TableHead className="w-20">Foto</TableHead>
            <TableHead>Nama</TableHead>
            <TableHead>Telepon</TableHead>
            <TableHead>Email</TableHead>
            <TableHead className="w-25 text-center">Lokasi</TableHead>
            <TableHead className="w-25 text-center">Aksi</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {contacts.map((contact) => {
            const initials = contact.nama
              .split(" ")
              .map((n) => n[0])
              .join("")
              .toUpperCase()
              .slice(0, 2);

            return (
              <TableRow key={contact.id} className="group">
                <TableCell>
                  <Avatar className="h-10 w-10">
                    <AvatarImage
                      src={contact.fotoProfil}
                      alt={contact.nama}
                      className="object-cover"
                    />
                    <AvatarFallback className="bg-primary text-primary-foreground text-sm font-medium">
                      {initials}
                    </AvatarFallback>
                  </Avatar>
                </TableCell>
                <TableCell className="font-medium text-foreground">
                  {contact.nama}
                </TableCell>
                <TableCell>
                  <a
                    href={`tel:${contact.telepon}`}
                    className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors"
                  >
                    <Phone className="h-4 w-4" />
                    {contact.telepon}
                  </a>
                </TableCell>
                <TableCell>
                  <a
                    href={`mailto:${contact.email}`}
                    className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors"
                  >
                    <Mail className="h-4 w-4" />
                    <span className="truncate max-w-50">{contact.email}</span>
                  </a>
                </TableCell>
                <TableCell className="text-center">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="gap-1.5 text-muted-foreground hover:text-primary"
                    onClick={() =>
                      openMap(contact.lokasi.lat, contact.lokasi.lng)
                    }
                  >
                    <MapPin className="h-4 w-4" />
                    Peta
                  </Button>
                </TableCell>
                <TableCell>
                  <div className="flex items-center justify-center gap-1">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 text-muted-foreground hover:text-primary"
                      onClick={() => navigate(`/update/${contact.id}`)}
                    >
                      <Pencil className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 text-muted-foreground hover:text-destructive"
                      onClick={() => onDelete?.(contact)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
}
