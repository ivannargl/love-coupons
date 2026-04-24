const express = require('express');
const { MongoClient, ObjectId } = require('mongodb');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB connection
let db;
async function connectToMongoDB() {
  try {
    const client = new MongoClient(process.env.MONGODB_URI);
    await client.connect();
    db = client.db(process.env.DATABASE_NAME);
    console.log('Conectado a MongoDB Atlas');
  } catch (error) {
    console.error('Error conectando a MongoDB:', error);
    process.exit(1);
  }
}

// Función para mapear estado a campos de UI
function mapEstadoToUI(estado) {
  const mappings = {
    disponible: {
      categoria: 'disponible',
      etiqueta: 'Disponible',
      imagen: 'img/1.jpeg' // Puedes cambiar esto por imágenes específicas
    },
    usado: {
      categoria: 'usado',
      etiqueta: 'Usado',
      imagen: 'img/2.jpeg'
    },
    expirado: {
      categoria: 'expirado',
      etiqueta: 'Expirado',
      imagen: 'img/3.jpeg'
    },
    especial: {
      categoria: 'especial',
      etiqueta: 'Especial',
      imagen: 'img/4.jpeg'
    }
  };
  return mappings[estado] || mappings.disponible;
}

// Routes
app.get('/api/coupons', async (req, res) => {
  try {
    const collection = db.collection(process.env.COLLECTION_NAME);
    const coupons = await collection.find({}).toArray();

    // Transformar datos para incluir campos de UI
    const transformedCoupons = coupons.map(coupon => {
      const uiFields = mapEstadoToUI(coupon.estado);
      return {
        _id: coupon._id.toString(), // Convertir ObjectId a string
        titulo: coupon.titulo,
        descripcion: coupon.descripcion,
        codigo: coupon.codigo,
        expiracion: coupon.expiracion,
        estado: coupon.estado,
        fechaCanje: coupon.fechaCanje,
        ...uiFields
      };
    });

    res.json(transformedCoupons);
  } catch (error) {
    console.error('Error obteniendo cupones:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
});

app.post('/api/coupons/redeem', async (req, res) => {
  try {
    const { _id, fechaCanje } = req.body;

    if (!_id) {
      return res.status(400).json({ error: 'ID del cupón requerido' });
    }

    const collection = db.collection(process.env.COLLECTION_NAME);
    const result = await collection.updateOne(
      { _id: new ObjectId(_id) },
      {
        $set: {
          estado: 'usado',
          fechaCanje: fechaCanje || new Date().toISOString().split('T')[0]
        }
      }
    );

    if (result.matchedCount === 0) {
      return res.status(404).json({ error: 'Cupón no encontrado' });
    }

    res.json({ success: true, message: 'Cupón canjeado exitosamente' });
  } catch (error) {
    console.error('Error canjeando cupón:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
});

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', timestamp: new Date().toISOString() });
});

// Start server
async function startServer() {
  await connectToMongoDB();
  app.listen(PORT, () => {
    console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
  });
}

startServer().catch(console.error);