# Mini Dashboard Admin

Dashboard admin yang dibuat menggunakan React, TypeScript, Vite, dan Tailwind CSS. Ada beberapa fitur dengan autentikasi, tabel data, dan validasi form.

## Cara Menjalankan Aplikasi

### Prasyarat
- Node.js 16+ 
- pnpm (direkomendasikan) atau npm

### Instalasi & Menjalankan Aplikasi

```bash
# Instal dependencies
pnpm install

# Mulai development server
pnpm run dev

# Build untuk production
pnpm run build

# Format dan lint code
pnpm biome check --write

# Type checking
npx tsc --noEmit
```

Aplikasi akan running di `http://localhost:5173` (atau port yang tersedia di sistem).

**Kredensial Default untuk Testing:**
- Email: `admin@admin.com`
- Password: `admin123` (minimal 8 karakter)

---

## 📁 Arsitektur & Struktur Folder

```
src/
├── features/                   # Modul fitur (auth, employees)
│   ├── auth/
│   │   ├── components/         # Komponen LoginForm
│   │   ├── hooks/              # Hook useAuth untuk state autentikasi
│   │   ├── interface/          # Interface TypeScript terkait auth
│   │   ├── pages/              # Halaman LoginPage, DashboardPage
│   │   ├── schemas/            # Schema validasi Zod
│   │   └── services/           # authService dengan mock API
│   │
│   └── employees/
│       ├── components/         # Komponen EmployeeDataTable
│       ├── hooks/              # Hook useEmployeesDataTable custom
│       ├── interface/          # Interface Employee
│       ├── services/           # Service API employees
│       └── type/               # Definisi tipe Employee
│
├── routes/
│   ├── ProtectedRoute.tsx      # Middleware route untuk akses authenticated
│   └── PublicRoute.tsx         # Middleware route untuk akses public
│
├── shared/
│   ├── components/
│   │   ├── DataTable.tsx       # Komponen table generic yang reusable
│   │   ├── FormField.tsx       # Wrapper form field yang reusable
│   │   └── ui/                 # Komponen UI dasar (button, input, table)
│   ├── hooks/
│   │   └── useDebounce.ts      # Hook debounce untuk optimasi search
│   ├── interface/              # Interface global (API, DataTable, dll)
│   ├── lib/
│   │   └── apiService.ts       # Konfigurasi base API service
│   └── utils/
│
├── styles/
│   ├── globals.css             # Style global & Tailwind
│   └── index.css               # Direktif Tailwind
│
├── App.tsx                     # Aplikasi utama dengan routing
├── main.tsx                    # Entry point
└── lib/
    └── utils.ts                # Fungsi utility (cn, dll bawaan untuk shadcn dan juga tailwind)
```

### Penjelasan Folder Structure
- **features/**: Fitur-fitur bisnis dikelompokkan berdasarkan domain (auth, employees), bukan berdasarkan tipe file. Semua kode untuk satu fitur ada dalam satu folder.
- **shared/**: Komponen dan utilitas yang digunakan oleh banyak fitur disimpan di sini untuk menghindari duplikasi.
- **routes/**: Middleware routing untuk proteksi halaman berdasarkan status autentikasi.

---

## Alasan Pemilihan Arsitektur & Implementasi

**Struktur Berdasarkan Fitur (Feature-Based Architecture)**

**Yang Dipilih:** Folder dikelompokkan berdasarkan fitur (auth/, employees/) bukan berdasarkan tipe file (components/, hooks/, services/)

**Alasan:**
- **Mudah Dipahami**: Semua kode untuk satu fitur berada di satu tempat. Lebih mudah jika ingin mencari dan mengubah fitur tertentu.
- **Mudah Dikembangkan**: Menambah fitur baru hanya perlu membuat folder baru. Tidak perlu modifikasi di banyak folder.
- **Kolaborasi Dengan Tim**: Developers yang berbeda bisa bekerja pada fitur yang berbeda tanpa konflik.
- **Skalabilitas**: Saat aplikasi dikembangkan, struktur ini tetap terorganisir. Tidak ada folder yang terlalu besar.
- **Mempelajari**: Lebih mudah untuk memahami konteks kode ketika semua terkait dengan satu fitur berada bersama.
- **Konsistensi**: Memudahkan untuk menjaga konsistensi dalam penamaan dan struktur kode di seluruh fitur.
- **Pengujian**: Memudahkan untuk menulis tes unit dan integrasi karena semua kode terkait fitur berada di satu tempat.
- **Pemeliharaan**: Memudahkan untuk memelihara kode karena semua terkait dengan satu fitur berada bersama. Jika ada bug atau perubahan, cukup fokus pada folder fitur tersebut.
- **Penggunaan Kembali**: Komponen yang digunakan di banyak fitur tetap bisa ditempatkan di shared/components untuk menghindari duplikasi, tetapi fitur utama tetap terorganisir berdasarkan domain bisnisnya.
- **Fleksibilitas**: Struktur ini memungkinkan untuk fleksibilitas dalam pengembangan. Jika suatu saat ingin memisahkan kode berdasarkan tipe file, masih bisa dilakukan tanpa mengubah struktur utama berdasarkan fitur.
- **Keterbacaan**: Memudahkan untuk membaca kode karena semua terkait dengan satu fitur berada bersama. Tidak perlu mencari di banyak folder untuk memahami bagaimana suatu fitur bekerja.
---
