import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserPlus, LayoutGrid, List, Users, Search } from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "../../components/ui/alert-dialog";
import type { ContactEntity } from "../../features/contacts/contacts";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { ContactTable } from "../../components/ContactTable";
import { ContactCard } from "../../components/ContactCard";
import { useContacts } from "../../features/contacts/contacts.context";

const HomePage = () => {
  const [viewMode, setViewMode] = useState<"grid" | "table">("grid");
  const [searchQuery, setSearchQuery] = useState("");
  const [deleteTarget, setDeleteTarget] = useState<ContactEntity | null>(null);

  const navigate = useNavigate();
  const { contacts, deleteContact } = useContacts();

  const filteredContacts = contacts.filter(
    (contact) =>
      contact.nama.toLowerCase().includes(searchQuery.toLowerCase()) ||
      contact.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      contact.telepon.includes(searchQuery)
  );

  const handleDeleteClick = (contact: ContactEntity) => {
    setDeleteTarget(contact);
  };

  const handleDeleteConfirm = () => {
    if (!deleteTarget) return;

    deleteContact(deleteTarget.id);

    setDeleteTarget(null);
  };

  return (
    <>
      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        {/* Controls */}
        <div className="flex flex-col sm:flex-row gap-4 mb-8">
          {/* Search */}
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Cari nama, email, atau telepon..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>

          {/* View Toggle */}
          <div className="flex items-center gap-1 bg-muted p-1 rounded-lg">
            <Button
              variant={viewMode === "grid" ? "default" : "ghost"}
              size="sm"
              className="gap-2"
              onClick={() => setViewMode("grid")}
            >
              <LayoutGrid className="h-4 w-4" />
              <span className="hidden sm:inline">Grid</span>
            </Button>
            <Button
              variant={viewMode === "table" ? "default" : "ghost"}
              size="sm"
              className="gap-2"
              onClick={() => setViewMode("table")}
            >
              <List className="h-4 w-4" />
              <span className="hidden sm:inline">Tabel</span>
            </Button>
          </div>
        </div>

        {/* Contact Count */}
        <p className="text-sm text-muted-foreground mb-6">
          Menampilkan {filteredContacts.length} dari {contacts.length} kontak
        </p>

        {/* Contact List */}
        {filteredContacts.length === 0 ? (
          <div className="text-center py-16">
            <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
              <Users className="h-8 w-8 text-muted-foreground" />
            </div>
            <h3 className="text-lg font-medium text-foreground mb-2">
              Tidak ada kontak ditemukan
            </h3>
            <p className="text-muted-foreground mb-6">
              Coba ubah kata kunci pencarian atau tambah kontak baru
            </p>
            <Link to="/create">
              <Button className="gap-2">
                <UserPlus className="h-4 w-4" />
                Tambah Kontak Baru
              </Button>
            </Link>
          </div>
        ) : viewMode === "grid" ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 animate-fade-in">
            {filteredContacts.map((contact) => (
              <ContactCard
                key={contact.id}
                contact={contact}
                onEdit={() => navigate(`/update/${contact.id}`)}
                onDelete={handleDeleteClick}
              />
            ))}
          </div>
        ) : (
          <div className="animate-fade-in">
            <ContactTable
              contacts={filteredContacts}
              onDelete={handleDeleteClick}
            />
          </div>
        )}
      </div>

      {/* Delete Confirmation Dialog */}
      <AlertDialog
        open={!!deleteTarget}
        onOpenChange={() => setDeleteTarget(null)}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Hapus Kontak?</AlertDialogTitle>
            <AlertDialogDescription>
              Apakah Anda yakin ingin menghapus{" "}
              <strong>{deleteTarget?.nama}</strong>? Tindakan ini tidak dapat
              dibatalkan.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Batal</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDeleteConfirm}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              Hapus
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

export default HomePage;
