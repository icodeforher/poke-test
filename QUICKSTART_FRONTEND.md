# 🚀 Quick Start - Frontend

Guía rápida para poner en marcha el frontend de Pokemon App.

## 📋 Prerequisitos

- Node.js 18+ instalado
- Backend corriendo en http://localhost:8000

## ⚡ Inicio Rápido (3 pasos)

### 1. Instalar dependencias

```bash
cd frontend
npm install
```

### 2. Configurar variables de entorno

Crear archivo `.env.local`:

```bash
echo "NEXT_PUBLIC_API_URL=http://localhost:8000" > .env.local
```

### 3. Iniciar servidor de desarrollo

```bash
npm run dev
```

🎉 **¡Listo!** Abre http://localhost:3000

## 🔐 Credenciales de prueba

- **Username**: `admin`
- **Password**: `admin`

## 🏗️ Estructura del proyecto

```
frontend/
├── app/              # Páginas (Next.js App Router)
├── components/       # Componentes reutilizables
├── lib/             # Lógica de negocio
│   ├── api/         # Cliente API
│   ├── hooks/       # Custom hooks
│   ├── store/       # Estado global (Zustand)
│   └── utils/       # Utilidades
└── types/           # Tipos TypeScript
```

## 📱 Características Implementadas

✅ **Autenticación**
- Login con validación
- JWT tokens en localStorage
- Rutas protegidas
- Auto-logout en token expirado

✅ **Lista de Pokemon**
- Paginación (20 por página)
- Búsqueda en tiempo real
- Ordenamiento múltiple
- Grid responsive

✅ **Detalle de Pokemon**
- Imagen de alta calidad
- Stats con barras de progreso
- Abilities completas
- Moves (primeros 50)
- Forms disponibles

## 🎨 Tecnologías

- **Next.js 14**: Framework React con App Router
- **TypeScript**: Tipado estático
- **Tailwind CSS**: Estilos utility-first
- **Zustand**: Manejo de estado
- **Axios**: Cliente HTTP
- **React Hook Form + Zod**: Validación de formularios

## 🚀 Comandos Disponibles

```bash
# Desarrollo
npm run dev

# Build producción
npm run build

# Iniciar producción
npm start

# Linting
npm run lint
```

## 🔄 Flujo de trabajo

1. **Usuario no autenticado** → Redirige a `/login`
2. **Login exitoso** → Guarda token → Redirige a `/pokemon`
3. **Usuario autenticado en `/login`** → Redirige a `/pokemon`
4. **Click en Pokemon** → Navega a `/pokemon/{id}` con detalles

## 🌐 Despliegue en Vercel (GRATIS)

### Opción 1: Desde GitHub

1. Push a GitHub
2. Conecta repo en [vercel.com](https://vercel.com)
3. Configura variable: `NEXT_PUBLIC_API_URL=https://tu-backend.onrender.com`
4. ¡Deploy!

### Opción 2: CLI

```bash
npm install -g vercel
vercel login
vercel --prod
```

## 🐛 Troubleshooting

### Error: Cannot find module 'next'
```bash
rm -rf node_modules package-lock.json
npm install
```

### Error: CORS en API
Verifica que el backend tenga configurado CORS para tu dominio:

```python
# app/main.py
origins = [
    "http://localhost:3000",
    "https://tu-app.vercel.app"
]
```

### Página en blanco
1. Verifica que el backend esté corriendo
2. Revisa la consola del navegador (F12)
3. Verifica que `NEXT_PUBLIC_API_URL` esté correcta

## 📚 Documentación Adicional

- [Next.js Docs](https://nextjs.org/docs)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [Zustand](https://github.com/pmndrs/zustand)

## ✨ Próximos pasos (Mejoras)

- [ ] Mejorar diseño con sistema de diseño personalizado
- [ ] Agregar modo oscuro
- [ ] Implementar favoritos
- [ ] Infinite scroll
- [ ] Tests unitarios
- [ ] PWA capabilities

---

¿Problemas? Revisa el README completo en `frontend/README.md`

