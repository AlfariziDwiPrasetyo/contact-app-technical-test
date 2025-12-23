# Contact App

Project ini menggunakan **Vite + React + TypeScript** untuk membuat aplikasi contact management.

## Prasyarat

Pastikan sudah terinstall:

- Node.js >= 18
- npm >= 9

---

## 1. Clone Repository

```bash
git clone https://github.com/username/contact-app.git
cd contact-app
```

## 2. Install Dependencies

```bash
pnpm install
```

Pastikan semua dependency terinstall tanpa error.

## 3. Jalankan Mode Development

```bash
pnpm run dev
```

## 4. Build untuk Production

```bash
pnpm run build
```

## 5. Preview Hasil Build Lokal

```bash
pnpm run preview
```

## 6. Structure Project

```
├─ public/ # File statis
├─ src/
│ ├─ components/ # Reusable React components
│ ├─ features/ # Features / domain logic
│ ├─ App.tsx # Entry point React app
│ └─ main.tsx # Bootstrapping React
├─ vite.config.ts # Vite configuration
├─ package.json
└─ tsconfig.json
```
