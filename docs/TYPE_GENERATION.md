# 🔧 Type Generation from OpenAPI

Este frontend utiliza **generación automática de tipos** desde el schema OpenAPI del backend FastAPI.

## 🎯 ¿Qué es esto?

En lugar de mantener manualmente los tipos TypeScript sincronizados con el backend, los generamos automáticamente desde el esquema OpenAPI que FastAPI expone.

### Ventajas

✅ **Type Safety Total**: Frontend y backend siempre sincronizados
✅ **Autocomplete Perfecto**: VS Code sugiere endpoints, parámetros, y respuestas
✅ **Detección de Errores**: Si cambias el backend, TypeScript te avisa
✅ **Menos Código Manual**: No escribes tipos a mano
✅ **Documentación Viva**: Los tipos son la fuente de verdad

## 🚀 Cómo Generar los Tipos

### Opción 1: Generación Manual

```bash
# Asegúrate de que el backend esté corriendo
cd backend
source venv/bin/activate
uvicorn app.main:app --reload

# En otra terminal, genera los tipos
cd frontend
npm run generate:types
```

Esto descarga `/openapi.json` del backend y genera `types/api.ts`.

### Opción 2: Generación Automática al Iniciar

```bash
npm run dev:with-types
```

Este comando genera tipos y luego inicia el servidor de desarrollo.

### Opción 3: Build con Tipos

```bash
npm run build
```

El build automáticamente genera los tipos antes de compilar.

## 📁 Archivos Generados

```
frontend/
└── types/
    └── api.ts          # ← Auto-generado desde OpenAPI
```

**⚠️ NO EDITES `types/api.ts` MANUALMENTE**

Este archivo se regenera cada vez que ejecutas `npm run generate:types`.

## 🔍 Ejemplo de Tipos Generados

```typescript
// types/api.ts (fragmento generado)
export interface paths {
  "/login": {
    post: {
      requestBody: {
        content: {
          "application/json": {
            username: string;
            password: string;
          };
        };
      };
      responses: {
        200: {
          content: {
            "application/json": {
              access_token: string;
              token_type: string;
            };
          };
        };
      };
    };
  };
  "/pokemons": {
    get: {
      parameters: {
        query?: {
          offset?: number;
          limit?: number;
        };
      };
      responses: {
        200: {
          content: {
            "application/json": {
              count: number;
              next: string | null;
              previous: string | null;
              results: Array<{
                name: string;
                url: string;
              }>;
            };
          };
        };
      };
    };
  };
}
```

## 🎨 Uso en el Código

### Cliente API Type-Safe

```typescript
import createClient from "openapi-fetch";
import type { paths } from "@/types/api";

const client = createClient<paths>({
  baseUrl: "http://localhost:8000",
});

// Ahora tienes autocomplete completo!
const { data, error } = await client.GET("/pokemons", {
  params: {
    query: {
      offset: 0,
      limit: 20,
    },
  },
});

// `data` está completamente tipado
// TypeScript sabe que tiene: count, next, previous, results
```

### Hooks de React Query Tipados

```typescript
export function usePokemonList(offset: number, limit: number) {
  return useQuery({
    queryKey: ["pokemons", offset, limit],
    queryFn: async () => {
      const { data, error } = await client.GET("/pokemons", {
        params: { query: { offset, limit } },
      });

      if (error) throw new Error("Failed to fetch");

      return data; // ← TypeScript sabe el tipo exacto
    },
  });
}
```

## 🔄 Flujo de Trabajo

1. **Backend**: Haces cambios en FastAPI
2. **OpenAPI**: FastAPI actualiza automáticamente el schema
3. **Generar**: Ejecutas `npm run generate:types`
4. **TypeScript**: Te avisa si algo rompió el contrato
5. **Frontend**: Actualizas el código según sea necesario

## 🛠️ Configuración

### package.json

```json
{
  "scripts": {
    "generate:types": "openapi-typescript http://localhost:8000/openapi.json -o ./types/api.ts",
    "dev:with-types": "npm run generate:types && next dev",
    "build": "npm run generate:types && next build"
  }
}
```

### Dependencias

```json
{
  "dependencies": {
    "openapi-fetch": "^0.11.1"
  },
  "devDependencies": {
    "openapi-typescript": "^7.4.0"
  }
}
```

## 🐛 Troubleshooting

### Error: Backend no responde

```bash
# Asegúrate de que el backend esté corriendo
cd backend
source venv/bin/activate
uvicorn app.main:app --reload
```

### Error: Cannot find module '@/types/api'

```bash
# Genera los tipos primero
npm run generate:types
```

### Tipos no se actualizan

```bash
# Borra el archivo y regenera
rm types/api.ts
npm run generate:types
```

### Backend en URL diferente

```bash
# Cambia la URL en el script
npx openapi-typescript https://tu-backend.com/openapi.json -o ./types/api.ts
```

## 📚 Documentación Adicional

- [openapi-typescript](https://github.com/drwpow/openapi-typescript)
- [openapi-fetch](https://github.com/drwpow/openapi-typescript/tree/main/packages/openapi-fetch)
- [FastAPI OpenAPI](https://fastapi.tiangolo.com/advanced/extending-openapi/)

## ✨ Mejores Prácticas

1. **Genera tipos frecuentemente**: Cada vez que cambies el backend
2. **Commit los tipos**: Incluye `types/api.ts` en Git para que el equipo los tenga
3. **CI/CD**: Agrega `npm run generate:types` en tu pipeline
4. **Type imports**: Usa `import type` para imports solo de tipos
5. **Validación**: Usa Zod adicional si necesitas validación en runtime

## 🎯 Resultado Final

Con este setup tienes:

- ✅ Tipos 100% sincronizados con el backend
- ✅ Autocomplete en todos los endpoints
- ✅ Errores de compilación si algo no coincide
- ✅ Refactorización segura
- ✅ Documentación automática
- ✅ Developer experience increíble

---

**¿Listo para usar?**

```bash
# 1. Inicia el backend
cd backend && uvicorn app.main:app --reload

# 2. Genera los tipos
cd frontend && npm run generate:types

# 3. Inicia el frontend
npm run dev
```

¡Disfruta de la magia del type-safety! 🎉
