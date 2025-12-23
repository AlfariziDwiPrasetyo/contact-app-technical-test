import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  User,
  Phone,
  Mail,
  Camera,
  MapPin,
  ArrowLeft,
  Save,
  AlertCircle,
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import type { ContactFormData } from "../../features/contacts/contacts";
import { contactSchema } from "../../features/contacts/contacts.schema";
import { ImageUpload } from "../../components/ImageUpload";
import { LocationPicker } from "../../components/MapPicker";
import { Button } from "../../components/ui/button";
import { useContacts } from "../../features/contacts/contacts.context";
import { toast } from "sonner";

export default function CreateContactPage() {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
  });

  const navigate = useNavigate();
  const { createContact } = useContacts();

  const onSubmit = async (data: ContactFormData) => {
    // Simulate API call
    await createContact(data);

    console.log("Form data:", data);

    toast.success("Kontak berhasil disimpan!", {
      description: `${data.nama} telah ditambahkan ke daftar kontak.`,
    });

    reset();

    navigate("/", { replace: true });
  };

  return (
    <div className="min-h-screen bg-background py-8 px-4">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="mb-8 animate-fade-in">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-4"
          >
            <ArrowLeft className="h-4 w-4" />
            Kembali
          </Link>
          <h1 className="text-3xl font-bold text-foreground">
            Buat Kontak Baru
          </h1>
          <p className="text-muted-foreground mt-2">
            Isi formulir di bawah untuk menambahkan kontak baru
          </p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Personal Info Section */}
          <div
            className="form-section animate-fade-in"
            style={{ animationDelay: "0.1s" }}
          >
            <h2 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
              <User className="h-5 w-5 text-primary" />
              Informasi Pribadi
            </h2>

            <div className="space-y-4">
              {/* Nama */}
              <div>
                <label className="form-label">
                  Nama Lengkap <span className="text-destructive">*</span>
                </label>
                <input
                  type="text"
                  {...register("nama")}
                  className="form-input"
                  placeholder="Masukkan nama lengkap"
                />
                {errors.nama && (
                  <p className="form-error">
                    <AlertCircle className="h-3.5 w-3.5" />
                    {errors.nama.message}
                  </p>
                )}
              </div>

              {/* Telepon */}
              <div>
                <label className="form-label">
                  <Phone className="h-4 w-4 inline mr-1" />
                  Nomor Telepon <span className="text-destructive">*</span>
                </label>
                <input
                  type="tel"
                  {...register("telepon")}
                  className="form-input"
                  placeholder="Contoh: 081234567890"
                />
                {errors.telepon && (
                  <p className="form-error">
                    <AlertCircle className="h-3.5 w-3.5" />
                    {errors.telepon.message}
                  </p>
                )}
              </div>

              {/* Email */}
              <div>
                <label className="form-label">
                  <Mail className="h-4 w-4 inline mr-1" />
                  Email <span className="text-destructive">*</span>
                </label>
                <input
                  type="email"
                  {...register("email")}
                  className="form-input"
                  placeholder="contoh@email.com"
                />
                {errors.email && (
                  <p className="form-error">
                    <AlertCircle className="h-3.5 w-3.5" />
                    {errors.email.message}
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Photo Section */}
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

          {/* Location Section */}
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

          {/* Submit Button */}
          <div
            className="flex gap-4 pt-4 animate-fade-in"
            style={{ animationDelay: "0.4s" }}
          >
            <Button variant={"ghost"} type="button" onClick={() => reset()}>
              Reset
            </Button>
            <Button
              type="submit"
              className="flex-1 gap-2"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <div className="h-4 w-4 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
                  Menyimpan...
                </>
              ) : (
                <>
                  <Save className="h-4 w-4" />
                  Simpan Kontak
                </>
              )}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
