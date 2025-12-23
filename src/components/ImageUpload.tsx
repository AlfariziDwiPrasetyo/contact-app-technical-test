import { useCallback, useState } from "react";
import { Upload, X, Image as ImageIcon } from "lucide-react";
import { cn } from "../lib/utils";

interface ImageUploadProps {
  value?: File;
  onChange: (file: File | undefined) => void;
  error?: string;
}

export function ImageUpload({ value, onChange, error }: ImageUploadProps) {
  const [preview, setPreview] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);

  //   Callback file
  const handleFile = useCallback(
    (file: File | undefined) => {
      if (file) {
        const reader = new FileReader();
        reader.onloadend = () => {
          setPreview(reader.result as string);
        };
        reader.readAsDataURL(file);
        onChange(file);
      } else {
        setPreview(null);
        onChange(undefined);
      }
    },
    [onChange]
  );

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setIsDragging(false);
      const file = e.dataTransfer.files[0];
      if (file && file.type.startsWith("image/")) {
        handleFile(file);
      }
    },
    [handleFile]
  );

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      handleFile(file);
    },
    [handleFile]
  );

  const handleRemove = useCallback(() => {
    handleFile(undefined);
  }, [handleFile]);

  return (
    <div className="space-y-2">
      {preview ? (
        <div className="relative inline-block animate-fade-in">
          <div className="relative w-32 h-32 rounded-xl overflow-hidden border-2 border-primary shadow-lg">
            <img
              src={preview}
              alt="Preview"
              className="w-full h-full object-cover"
            />
            <button
              type="button"
              onClick={handleRemove}
              className="absolute top-2 right-2 p-1 bg-destructive text-destructive-foreground rounded-full hover:bg-destructive/90 transition-colors shadow-md"
            >
              <X className="h-3 w-3 text-white" />
            </button>
          </div>
          <p className="text-sm text-muted-foreground mt-2 text-center">
            {value?.name}
          </p>
        </div>
      ) : (
        <label
          className={cn(
            "upload-zone flex flex-col items-center gap-3 cursor-pointer",
            isDragging && "upload-zone-active",
            error && "border-destructive"
          )}
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
        >
          <input
            type="file"
            accept="image/*"
            onChange={handleChange}
            className="hidden"
          />
          <div className="w-14 h-14 rounded-full bg-accent flex items-center justify-center">
            {isDragging ? (
              <ImageIcon className="h-6 w-6 text-primary animate-pulse-soft" />
            ) : (
              <Upload className="h-6 w-6 text-primary" />
            )}
          </div>
          <div className="text-center">
            <p className="text-sm font-medium text-foreground">
              Klik atau seret gambar ke sini
            </p>
            <p className="text-xs text-muted-foreground mt-1">
              PNG, JPG, atau JPEG (Maks. 1MB)
            </p>
          </div>
        </label>
      )}
    </div>
  );
}
