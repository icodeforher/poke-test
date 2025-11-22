# Pokemon Frontend App

Modern Pokemon browsing application built with Next.js 14, TypeScript, and Tailwind CSS.

## 🚀 Features

- ✅ **Authentication**: JWT-based login with protected routes
- 🔍 **Search & Sort**: Real-time search and multiple sorting options
- 📱 **Responsive Design**: Mobile-first design that works on all devices
- 📄 **Pagination**: Efficient data loading with pagination
- 🎨 **Modern UI**: Clean interface with Tailwind CSS
- ⚡ **Performance**: Optimized with Next.js 14 App Router
- 🔐 **Route Protection**: Automatic redirect for authenticated/unauthenticated users
- 📊 **Pokemon Details**: Comprehensive info including abilities, moves, forms, and stats

## 🛠️ Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **State Management**: Zustand
- **HTTP Client**: Axios
- **Form Validation**: React Hook Form + Zod
- **Icons**: Lucide React

## 📦 Installation

1. **Install dependencies**:
```bash
npm install
```

2. **Configure environment variables**:
```bash
cp .env.local.example .env.local
```

Edit `.env.local`:
```env
NEXT_PUBLIC_API_URL=http://localhost:8000
```

3. **Run development server**:
```bash
npm run dev
```

4. **Open browser**:
Navigate to [http://localhost:3000](http://localhost:3000)

## 🏗️ Project Structure

```
frontend/
├── app/                        # Next.js App Router
│   ├── layout.tsx             # Root layout
│   ├── page.tsx               # Home (redirect)
│   ├── login/
│   │   └── page.tsx          # Login page
│   └── pokemon/
│       ├── page.tsx          # Pokemon list
│       └── [id]/
│           └── page.tsx      # Pokemon detail
├── components/
│   ├── auth/
│   │   └── LoginForm.tsx     # Login form component
│   ├── pokemon/
│   │   ├── PokemonCard.tsx   # Pokemon card
│   │   ├── PokemonGrid.tsx   # Pokemon grid
│   │   ├── SearchBar.tsx     # Search component
│   │   ├── SortControls.tsx  # Sort controls
│   │   └── LoadingSkeleton.tsx
│   └── layout/
│       └── Navbar.tsx        # Navigation bar
├── lib/
│   ├── api/
│   │   ├── client.ts         # Axios configuration
│   │   ├── auth.ts           # Auth API endpoints
│   │   └── pokemon.ts        # Pokemon API endpoints
│   ├── hooks/
│   │   └── useAuth.ts        # Auth hook
│   ├── store/
│   │   └── authStore.ts      # Zustand auth store
│   └── utils/
│       ├── storage.ts        # localStorage utilities
│       └── pokemon.ts        # Pokemon utilities
├── types/
│   ├── auth.ts               # Auth types
│   └── pokemon.ts            # Pokemon types
└── middleware.ts             # Route protection

```

## 🔑 Features Details

### Authentication
- Login with username/password (admin/admin)
- JWT token stored in localStorage
- Automatic token injection in API requests
- Protected routes with automatic redirect
- Token expiration handling

### Pokemon List
- Paginated list (20 per page)
- Real-time search by name or number
- Sort by:
  - Number (ascending/descending)
  - Name (A-Z / Z-A)
- Responsive grid layout
- Loading skeletons

### Pokemon Detail
- High-quality official artwork
- Type badges with colors
- Physical stats (height, weight, base XP)
- Base stats with progress bars
- Complete list of abilities
- Moves (first 50 shown)
- Available forms
- Smooth navigation

## 🎨 Styling Approach

The app uses **basic functional styling** with Tailwind CSS:
- Clean, minimal design
- Focus on functionality over aesthetics
- Responsive breakpoints
- Consistent spacing and colors
- Ready for custom design system

## 🚀 Deployment

### Vercel (Recommended)

1. Push code to GitHub
2. Import repository to Vercel
3. Configure environment variables:
   - `NEXT_PUBLIC_API_URL`: Your backend API URL
4. Deploy!

### Environment Variables

**Development**:
```env
NEXT_PUBLIC_API_URL=http://localhost:8000
```

**Production**:
```env
NEXT_PUBLIC_API_URL=https://your-backend.onrender.com
```

## 📱 Responsive Design

Breakpoints:
- **Mobile**: < 640px (2 columns)
- **Tablet**: 640px - 1024px (3-4 columns)
- **Desktop**: > 1024px (5 columns)

## 🔐 Security

- JWT tokens stored in localStorage
- Automatic token cleanup on logout
- Protected routes with middleware
- API error handling with auto-logout on 401
- Form validation with Zod

## 📝 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm run lint` - Run ESLint

## 🔄 API Integration

The frontend connects to the FastAPI backend:

- **POST** `/login` - User authentication
- **GET** `/pokemons` - Get paginated Pokemon list
- **GET** `/pokemons/{id}` - Get Pokemon details

All protected endpoints require `Authorization: Bearer <token>` header.

## 🐛 Known Issues / Future Improvements

- [ ] Add loading states for image loading
- [ ] Implement infinite scroll option
- [ ] Add favorites functionality (localStorage)
- [ ] Improve error boundary handling
- [ ] Add unit tests
- [ ] Implement PWA capabilities
- [ ] Add dark mode
- [ ] Enhance mobile experience

## 📄 License

MIT

## 🤝 Contributing

Feel free to submit issues and enhancement requests!

