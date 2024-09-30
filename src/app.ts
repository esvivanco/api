// src/app.ts
import express from 'express';
import userRoutes from './routes/userRoutes';

const app = express();
const PORT = 3000;

// Middleware para parsear JSON
app.use(express.json());

// Rutas
app.use('/api/users', userRoutes);

// Iniciar el servidor
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});