# Love Coupons - Sistema de Cupones con MongoDB Atlas

Sistema web para gestionar cupones de amor con integración a MongoDB Atlas.

## Características

- Interfaz moderna y responsiva
- Filtros por estado (Disponible, Usado, Expirado, Especial)
- Modal de confirmación de canje
- Notificaciones por WhatsApp al canjear
- Integración completa con MongoDB Atlas
- API REST para gestión de cupones

## Prerrequisitos

- Node.js (versión 16 o superior)
- Cuenta de MongoDB Atlas
- Cluster de MongoDB Atlas configurado

## Instalación y Configuración

### 1. Clona o descarga el proyecto

```bash
cd "c:\Users\rguzm\Desktop\Nueva carpeta"
```

### 2. Instala las dependencias del backend

```bash
cd server
npm install
```

### 3. Configura las variables de entorno

Edita el archivo `server/.env` con tus credenciales de MongoDB Atlas:

```env
# MongoDB Atlas Configuration
MONGODB_URI=mongodb+srv://TU_USUARIO:TU_PASSWORD@TU_CLUSTER.mongodb.net/TU_BASE_DE_DATOS?retryWrites=true&w=majority
DATABASE_NAME=tu_base_de_datos
COLLECTION_NAME=coupons

# Server Configuration
PORT=3000
```

**Importante:** Reemplaza los valores con tus credenciales reales de MongoDB Atlas.

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