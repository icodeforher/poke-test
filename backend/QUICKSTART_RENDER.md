# ⚡ Quick Start: Deploy to Render in 5 Minutes

## 🎯 Lo que necesitas

- ✅ Cuenta en GitHub (gratis)
- ✅ Cuenta en Render (gratis)
- ✅ 5 minutos de tu tiempo

---

## 📋 Paso a Paso

### 1️⃣ Sube tu código a GitHub

```bash
# En la terminal, dentro del proyecto:
cd /Users/diego.monroy/Documents/poke-test

# Inicializa git (si no lo has hecho)
git init

# Agrega todos los archivos
git add .

# Haz commit
git commit -m "Pokemon API Backend - Ready for Render"

# Crea el repositorio en GitHub:
# 1. Ve a https://github.com/new
# 2. Nombre: pokemon-api-backend
# 3. Click "Create repository"

# Conecta y sube (reemplaza TU-USUARIO con tu username)
git remote add origin https://github.com/TU-USUARIO/pokemon-api-backend.git
git branch -M main
git push -u origin main
```

---

### 2️⃣ Despliega en Render

1. **Ingresa a Render**

   - Ve a: https://dashboard.render.com
   - Haz login con tu cuenta de GitHub

2. **Crea el servicio**

   - Click en **"New +"** (arriba a la derecha)
   - Selecciona **"Blueprint"**

3. **Conecta tu repositorio**

   - Click en **"Connect a repository"**
   - Busca: `pokemon-api-backend`
   - Click en **"Connect"**

4. **Deploy automático**
   - Render detectará el archivo `render.yaml`
   - Verás toda la configuración ya lista
   - Click en **"Apply"**
   - ¡Espera 2-3 minutos! ☕

---

### 3️⃣ ¡Listo! Prueba tu API

Render te dará una URL como:

```
https://pokemon-api-xxxx.onrender.com
```

**Pruébala:**

1. **Documentación:**

   ```
   https://pokemon-api-xxxx.onrender.com/docs
   ```

2. **Health Check:**

   ```
   https://pokemon-api-xxxx.onrender.com/health
   ```

3. **Login (en la terminal):**

   ```bash
   curl -X POST "https://pokemon-api-xxxx.onrender.com/login" \
     -H "Content-Type: application/json" \
     -d '{"username":"admin","password":"admin"}'
   ```

4. **Get Pokemons (copia el token del paso anterior):**
   ```bash
   curl -X GET "https://pokemon-api-xxxx.onrender.com/pokemons?limit=5" \
     -H "Authorization: Bearer TU_TOKEN_AQUI"
   ```

---

## 🎉 ¡Felicidades!

Tu Pokemon API está en producción y lista para usar.

**Características incluidas:**

- ✅ HTTPS automático
- ✅ Variables de entorno seguras
- ✅ Auto-deploy cuando haces `git push`
- ✅ Logs en tiempo real
- ✅ Documentación interactiva
- ✅ Gratis (750 horas/mes)

---

## 🔄 Actualizar tu API

Cada vez que quieras actualizar:

```bash
# Haz cambios en tu código
git add .
git commit -m "Mejora feature X"
git push

# Render automáticamente detecta el push y redespliega 🎉
```

---

## 📚 Más información

- **Guía detallada:** [RENDER_DEPLOYMENT.md](RENDER_DEPLOYMENT.md)
- **Todas las opciones:** [DEPLOYMENT.md](DEPLOYMENT.md)
- **Arquitectura:** [ARCHITECTURE.md](ARCHITECTURE.md)

---

## 🆘 ¿Problemas?

### Build falla

- Verifica que `requirements.txt` esté completo
- Revisa los logs en Render

### 503 Error

- Primera request toma ~30 seg (plan free entra en "sleep")
- Esto es normal, espera un momento y vuelve a intentar

### No encuentras tu repo

- Asegúrate de haber autorizado Render en GitHub
- Ve a: GitHub Settings → Applications → Render

---

**¿Necesitas ayuda?** Revisa [RENDER_DEPLOYMENT.md](RENDER_DEPLOYMENT.md) para troubleshooting completo.
