import { Phone, Mail, MapPin, Pencil, Trash2 } from "lucide-react";
import { Button } from "./ui/button";
import { Card, CardContent } from "./ui/card";
import { Avatar } from "@radix-ui/react-avatar";
import { AvatarFallback, AvatarImage } from "./ui/avatar";
import type { ContactEntity } from "../features/contacts/contacts";

interface ContactCardProps {
  contact: ContactEntity;
  onEdit?: (contact: ContactEntity) => void;
  onDelete?: (contact: ContactEntity) => void;
}

export function ContactCard({ contact, onEdit, onDelete }: ContactCardProps) {
  const initials = contact.nama
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);

  const openMap = () => {
    window.open(
      `https://www.google.com/maps?q=${contact.lokasi.lat},${contact.lokasi.lng}`,
      "_blank"
    );
  };

  return (
    <Card className="group overflow-hidden transition-all duration-300 hover:shadow-lg hover:shadow-primary/10 hover:-translate-y-1">
      <CardContent className="p-6">
        {/* Action Buttons */}
        <div className="flex justify-end gap-1 mb-2 transition-opacity">
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 text-muted-foreground hover:text-primary"
            onClick={() => onEdit?.(contact)}
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

        <div className="flex flex-col items-center text-center">
          <Avatar className="h-20 w-20 mb-4 ring-4 ring-accent">
            <AvatarImage
              src={contact.fotoProfil}
              alt={contact.nama}
              className="object-cover"
            />
            <AvatarFallback className="bg-primary text-primary-foreground text-xl font-semibold">
              {initials}
            </AvatarFallback>
          </Avatar>

          <h3 className="font-semibold text-lg text-foreground mb-1 line-clamp-1">
            {contact.nama}
          </h3>

          <div className="space-y-2 mt-3 w-full">
            <a
              href={`tel:${contact.telepon}`}
              className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors justify-center"
            >
              <Phone className="h-4 w-4" />
              <span>{contact.telepon}</span>
            </a>

            <a
              href={`mailto:${contact.email}`}
              className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors justify-center"
            >
              <Mail className="h-4 w-4" />
              <span className="truncate max-w-45">{contact.email}</span>
            </a>
          </div>

          <Button
            variant="outline"
            size="sm"
            className="mt-4 gap-2 w-full"
            onClick={openMap}
          >
            <MapPin className="h-4 w-4" />
            Lihat Lokasi
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
