import { z } from "zod";

const MAX_FILE_SIZE = 1 * 1024 * 1024;
const ACCEPTED_IMAGE_TYPES = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
];

export const contactSchema = z.object({
  nama: z
    .string()
    .min(1, { message: "Nama wajib diisi" })
    .max(100, { message: "Nama maksimal 100 karakter" }),

  telepon: z
    .string()
    .min(1, { message: "Nomor telepon wajib diisi" })
    .regex(/^[0-9]+$/, { message: "Nomor telepon hanya boleh berisi angka" })
    .min(10, { message: "Nomor telepon minimal 10 digit" })
    .max(15, { message: "Nomor telepon maksimal 15 digit" }),

  email: z.email().min(1, { message: "Email wajib diisi" }),

  fotoProfil: z
    .instanceof(File, { message: "Foto profil wajib diupload" })
    .refine((file) => file.size <= MAX_FILE_SIZE, {
      message: "Ukuran file maksimal 1MB",
    })
    .refine((file) => ACCEPTED_IMAGE_TYPES.includes(file.type), {
      message: "Format file harus PNG, JPG, atau JPEG",
    }),

  lokasi: z.object({
    lat: z.number(),
    lng: z.number(),
  }),
});

export const updateContactSchema = z.object({
  nama: z.string().min(1).max(100),

  telepon: z
    .string()
    .regex(/^[0-9]+$/)
    .min(10)
    .max(15),

  email: z.email(),

  fotoProfil: z
    .instanceof(File)
    .optional()
    .refine((file) => !file || file.size <= MAX_FILE_SIZE, {
      message: "Ukuran file maksimal 1MB",
    })
    .refine((file) => !file || ACCEPTED_IMAGE_TYPES.includes(file.type), {
      message: "Format file harus PNG, JPG, atau JPEG",
    }),

  lokasi: z.object({
    lat: z.number(),
    lng: z.number(),
  }),
});
