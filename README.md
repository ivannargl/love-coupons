# 💝 Love Coupons

Una aplicación web para gestionar cupones románticos con integración a WhatsApp y MongoDB Atlas.

## ✨ Características

- 🎫 Gestión completa de cupones (disponibles, usados, expirados, especiales)
- 📱 Notificaciones automáticas por WhatsApp al canjear cupones
- 🗄️ Base de datos en MongoDB Atlas
- 🎨 Interfaz responsiva con Bootstrap 5
- ⏰ Cuenta regresiva para cupones especiales
- 🔄 Renovación automática de fechas
- 📊 Filtros por estado de cupón

## 🏗️ Arquitectura

### Frontend (GitHub Pages)
- HTML5/CSS3/JavaScript ES6+
- Bootstrap 5 para UI responsiva
- Fetch API para comunicación con backend

### Backend (Railway)
- Node.js + Express.js
- MongoDB Atlas para persistencia
- API REST para operaciones CRUD
- Variables de entorno para configuración segura

## 🚀 Despliegue

### Requisitos
- Cuenta de GitHub
- Cuenta de Railway
- Cluster de MongoDB Atlas

### Pasos rápidos

1. **Configura MongoDB Atlas**
   - Crea un cluster gratuito
   - Obtén la URI de conexión

2. **Despliega el backend**
   ```bash
   # Railway detectará automáticamente el proyecto
   # Configura estas variables de entorno:
   MONGODB_URI=tu_uri_de_atlas
   DATABASE_NAME=Couponsdb
   COLLECTION_NAME=coupon
   PORT=$PORT
   ```

3. **Actualiza la URL del backend**
   - En `js/coupons.js`, cambia `API_BASE` con tu URL de Railway

4. **Despliega el frontend**
   - Sube el código a GitHub
   - Activa GitHub Pages en Settings → Pages

### Instrucciones detalladas

Lee [`DEPLOYMENT.md`](DEPLOYMENT.md) para instrucciones completas.

## 📁 Estructura del proyecto

```
love-coupons/
├── index.html          # Página principal
├── tyc.html           # Términos y condiciones
├── css/
│   └── styles.css     # Estilos personalizados
├── js/
│   ├── coupons.js     # Lógica principal del frontend
│   └── data.js        # Datos de respaldo
├── img/               # Imágenes de cupones
├── server/            # Backend Node.js
│   ├── server.js      # API Express
│   ├── package.json   # Dependencias
│   └── .env.example   # Variables de entorno
├── .gitignore         # Archivos ignorados
├── DEPLOYMENT.md      # Guía de despliegue
└── deploy.bat         # Script de despliegue (Windows)
```

## 🔧 Desarrollo local

### Backend
```bash
cd server
npm install
# Crea server/.env con tus credenciales
npm start
```

### Frontend
Abre `index.html` en tu navegador o usa un servidor local.

## 🛡️ Seguridad

- ✅ Credenciales de MongoDB solo en Railway (no expuestas)
- ✅ Variables de entorno para configuración
- ✅ CORS configurado correctamente
- ✅ No hay llaves sensibles en código público

## 📝 API Endpoints

- `GET /api/coupons` - Obtener todos los cupones
- `POST /api/coupons/redeem` - Canjear un cupón
- `GET /api/health` - Health check

## 🤝 Contribuir

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 📄 Licencia

Este proyecto está bajo la Licencia MIT.

---

Hecho con ❤️ para momentos especiales

### 4. Crea la colección en MongoDB Atlas

En tu cluster de MongoDB Atlas, crea una colección llamada `Couponsdb` en tu base de datos y agrega algunos documentos de prueba con este formato:

```json
{
  "_id": {
    "$oid": "69eaea5f95d0ec32118a8264"
  },
  "titulo": "Cupón Prueba",
  "descripcion": "Cupón de cortesía para probar el sistema.",
  "codigo": "TEST2026",
  "expiracion": "2026-12-31",
  "estado": "disponible",
  "fechaCanje": null
}
```

### 5. Ejecuta el servidor backend

```bash
cd server
npm start
```

El servidor se ejecutará en `http://localhost:3000`

### 6. Abre la aplicación frontend

Abre el archivo `index.html` en tu navegador web. La aplicación automáticamente cargará los cupones desde MongoDB Atlas.

## API Endpoints

### GET /api/coupons
Obtiene todos los cupones de la colección.

**Respuesta:**
```json
[
  {
    "_id": "69eaea5f95d0ec32118a8264",
    "titulo": "Cupón Prueba",
    "descripcion": "Cupón de cortesía para probar el sistema.",
    "codigo": "TEST2026",
    "expiracion": "2026-12-31",
    "estado": "disponible",
    "fechaCanje": null,
    "categoria": "disponible",
    "etiqueta": "Disponible",
    "imagen": "img/1.jpeg"
  }
]
```

### POST /api/coupons/redeem
Marca un cupón como usado.

**Body:**
```json
{
  "_id": "69eaea5f95d0ec32118a8264",
  "fechaCanje": "2026-04-24"
}
```

### GET /api/health
Verifica que el servidor esté funcionando.

## Estructura del Proyecto

```
love-coupons/
├── index.html          # Página principal
├── tyc.html           # Términos y condiciones
├── css/
│   └── styles.css     # Estilos de la aplicación
├── js/
│   ├── coupons.js     # Lógica principal del frontend
│   └── data.js        # Datos de respaldo (fallback)
├── img/               # Imágenes de los cupones
└── server/            # Backend API
    ├── server.js      # Servidor Express
    ├── package.json   # Dependencias
    └── .env          # Variables de entorno
```

## Desarrollo

Para desarrollo con recarga automática:

```bash
cd server
npm run dev
```

## Notas Importantes

- El servidor backend debe estar ejecutándose para que la aplicación funcione completamente
- Si el servidor no está disponible, la aplicación usará datos locales como fallback
- Las notificaciones de WhatsApp se envían al número configurado en el código
- Los cambios se persisten tanto localmente (para mejor UX) como en MongoDB Atlas

## Solución de Problemas

### Error de conexión a MongoDB
- Verifica que la URI de MongoDB Atlas sea correcta
- Asegúrate de que tu IP esté en la lista de acceso de MongoDB Atlas
- Revisa que el usuario tenga permisos de lectura/escritura

### La aplicación no carga cupones
- Verifica que el servidor backend esté ejecutándose en el puerto 3000
- Revisa la consola del navegador para errores de red
- Asegúrate de que la colección `coupons` exista y tenga documentos

## Licencia

Este proyecto es privado y está hecho con amor 