import { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  User,
  Camera,
  MapPin,
  ArrowLeft,
  Save,
  AlertCircle,
} from "lucide-react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { toast } from "sonner";

import type { ContactFormData } from "../../features/contacts/contacts";
import { updateContactSchema } from "../../features/contacts/contacts.schema";
import { useContacts } from "../../features/contacts/contacts.context";
import { ImageUpload } from "../../components/ImageUpload";
import { LocationPicker } from "../../components/MapPicker";
import { Button } from "../../components/ui/button";

export default function UpdateContactPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { getContactById, updateContact } = useContacts();
  const [initialImagePreview, setInitialImagePreview] = useState<string | null>(
    null
  );

  const contact = id ? getContactById(id) : undefined;

  const {
    register,
    handleSubmit,
    control,
    reset,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<ContactFormData>({
    resolver: zodResolver(updateContactSchema),
  });

  useEffect(() => {
    if (!contact) return;

    setInitialImagePreview(contact.fotoProfil);

    setValue("nama", contact.nama);
    setValue("telepon", contact.telepon);
    setValue("email", contact.email);
    setValue("lokasi", {
      lat: contact.lokasi.lat,
      lng: contact.lokasi.lng,
    });
  }, [contact, setValue, navigate]);

  const onSubmit = async (data: ContactFormData) => {
    if (!id) return;

    await updateContact(id, data);

    toast.success("Kontak berhasil diperbarui", {
      description: `${data.nama} telah diperbarui.`,
    });

    navigate("/", { replace: true });
  };

  if (!contact) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-muted-foreground">Kontak tidak ditemukan</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background py-8 px-4">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-4"
          >
            <ArrowLeft className="h-4 w-4" />
            Kembali
          </Link>

          <h1 className="text-3xl font-bold text-foreground">Edit Kontak</h1>
          <p className="text-muted-foreground mt-2">
            Perbarui informasi kontak
          </p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Informasi Pribadi */}
          <div className="form-section">
            <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <User className="h-5 w-5 text-primary" />
              Informasi Pribadi
            </h2>

            {/* Nama */}
            <div>
              <label className="form-label">Nama Lengkap *</label>
              <input {...register("nama")} className="form-input" />
              {errors.nama && (
                <p className="form-error">
                  <AlertCircle className="h-3.5 w-3.5" />
                  {errors.nama.message}
                </p>
              )}
            </div>

            {/* Telepon */}
            <div>
              <label className="form-label">Nomor Telepon *</label>
              <input {...register("telepon")} className="form-input" />
              {errors.telepon && (
                <p className="form-error">
                  <AlertCircle className="h-3.5 w-3.5" />
                  {errors.telepon.message}
                </p>
              )}
            </div>

            {/* Email */}
            <div>
              <label className="form-label">Email *</label>
              <input {...register("email")} className="form-input" />
              {errors.email && (
                <p className="form-error">
                  <AlertCircle className="h-3.5 w-3.5" />
                  {errors.email.message}
                </p>
              )}
            </div>
          </div>

          {/* Foto */}
          <div
            className="form-section animate-fade-in"
            style={{ animationDelay: "0.2s" }}
          >
            <h2 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
              <Camera className="h-5 w-5 text-primary" />
              Foto Profil <span className="text-destructive">*</span>
            </h2>

            <Controller
              name="fotoProfil"
              control={control}
              render={({ field }) => (
                <ImageUpload
                  value={field.value}
                  onChange={field.onChange}
                  error={errors.fotoProfil?.message}
                  initialPreview={initialImagePreview}
                />
              )}
            />
            {errors.fotoProfil && (
              <p className="form-error mt-2">
                <AlertCircle className="h-3.5 w-3.5" />
                {errors.fotoProfil.message}
              </p>
            )}
          </div>

          {/* Lokasi */}
          <div
            className="form-section animate-fade-in"
            style={{ animationDelay: "0.3s" }}
          >
            <h2 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
              <MapPin className="h-5 w-5 text-primary" />
              Lokasi <span className="text-destructive">*</span>
            </h2>

            <Controller
              name="lokasi"
              control={control}
              render={({ field }) => (
                <LocationPicker value={field.value} onChange={field.onChange} />
              )}
            />
            {errors.lokasi && (
              <p className="form-error mt-2">
                <AlertCircle className="h-3.5 w-3.5" />
                {errors.lokasi.message}
              </p>
            )}
          </div>

          {/* Actions */}
          <div className="flex gap-4 pt-4">
            <Button variant="ghost" type="button" onClick={() => reset()}>
              Reset
            </Button>

            <Button
              type="submit"
              className="flex-1 gap-2"
              disabled={isSubmitting}
            >
              <Save className="h-4 w-4" />
              Simpan Perubahan
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
